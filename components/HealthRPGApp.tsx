'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, User, Activity, Flame, Heart, Shield, TrendingUp, Calendar } from 'lucide-react';
import FoodCard from './FoodCard';
import ProfileSetup from './ProfileSetup';
import { telomereFoodsDatabase, Food } from '@/data/foods';
import { initTelegramWebApp, shareResults, showHapticFeedback } from '@/lib/telegram';
import { 
  UserProfile, 
  FoodEntry, 
  saveProfile, 
  getProfile, 
  saveFoodEntry, 
  getTodayFoods,
  calculateCalorieGoal 
} from '@/lib/user-data';

const HealthRPGApp = () => {
  // Состояния
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [todayFoods, setTodayFoods] = useState<FoodEntry[]>([]);
  const [showLibrary, setShowLibrary] = useState(false);
  const [currentMealType, setCurrentMealType] = useState<keyof typeof telomereFoodsDatabase>('breakfast');

  // Геймификация
  const [healthPoints, setHealthPoints] = useState(50); // HP из теломер
  const [todayCalories, setTodayCalories] = useState(0);
  const [todayTelomerePoints, setTodayTelomerePoints] = useState(0);

  // Инициализация
  useEffect(() => {
    initTelegramWebApp();
    loadUserData();
  }, []);

  // Загрузка данных пользователя
  const loadUserData = async () => {
    const userProfile = await getProfile();
    if (userProfile) {
      setProfile(userProfile);
      loadTodayData();
    } else {
      setShowProfileSetup(true);
    }
  };

  // Загрузка еды за сегодня
  const loadTodayData = async () => {
    const foods = await getTodayFoods();
    setTodayFoods(foods);
    
    // Подсчет статистики
    const calories = foods.reduce((sum, food) => sum + (food.calories || 0), 0);
    const telomerePoints = foods.reduce((sum, food) => sum + (food.telomerePoints || 0), 0);
    
    setTodayCalories(calories);
    setTodayTelomerePoints(telomerePoints);
    setHealthPoints(Math.max(0, Math.min(100, 50 + telomerePoints * 0.8)));
  };

  // Парсинг веса из строки поиска
  const parseSearchTerm = (search: string) => {
    const weightMatch = search.match(/(\\d+)\\s*г/);
    const weight = weightMatch ? parseInt(weightMatch[1]) : undefined;
    const foodName = search.replace(/\\s*\\d+\\s*г\\s*/, '').trim();
    return { foodName, weight };
  };

  // Поиск продукта
  const searchFood = async (query: string): Promise<Food | null> => {
    if (query.length < 2) return null;
    
    setIsLoading(true);
    showHapticFeedback('light');
    
    try {
      const response = await fetch('/api/analyze-food', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ foodName: query }),
      });

      const data = await response.json();
      
      if (response.ok) {
        showHapticFeedback('success');
        return {
          ...data,
          calories: data.calories || 100 // Fallback калории
        };
      } else {
        showHapticFeedback('error');
        return data.fallback || null;
      }
    } catch (error) {
      console.error('Error analyzing food:', error);
      showHapticFeedback('error');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Добавление продукта
  const addFood = async (food: Food, weight?: number) => {
    const actualCalories = weight ? Math.round((food.calories || 100) * weight / 100) : (food.calories || 100);
    
    const foodEntry: FoodEntry = {
      name: weight ? `${food.name} (${weight}г)` : food.name,
      calories: actualCalories,
      telomerePoints: food.telomerePoints,
      weight,
      timestamp: new Date().toISOString()
    };

    const success = await saveFoodEntry(foodEntry);
    if (success) {
      showHapticFeedback('selection');
      loadTodayData(); // Перезагружаем данные
      setSearchTerm('');
    }
  };

  // Обработка поиска
  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    const { foodName, weight } = parseSearchTerm(searchTerm);
    const food = await searchFood(foodName);
    
    if (food) {
      addFood(food, weight);
    }
  };

  // Завершение настройки профиля
  const handleProfileComplete = (newProfile: UserProfile) => {
    setProfile(newProfile);
    setShowProfileSetup(false);
    loadTodayData();
  };

  // Получение статуса здоровья
  const getHealthStatus = () => {
    if (healthPoints >= 80) return { emoji: '😊', text: 'Отличное здоровье!', color: 'text-green-400' };
    if (healthPoints >= 60) return { emoji: '🙂', text: 'Хорошее состояние', color: 'text-blue-400' };
    if (healthPoints >= 40) return { emoji: '😐', text: 'Среднее здоровье', color: 'text-yellow-400' };
    if (healthPoints >= 20) return { emoji: '😟', text: 'Нужна помощь', color: 'text-orange-400' };
    return { emoji: '😵', text: 'Критично!', color: 'text-red-400' };
  };

  const healthStatus = getHealthStatus();
  const calorieGoal = profile ? calculateCalorieGoal(profile) : 2000;

  // Если нужна настройка профиля
  if (showProfileSetup) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <ProfileSetup onComplete={handleProfileComplete} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Заголовок */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-white mb-2 text-glow">
          ⚡ HEALTH RPG ⚡
        </h1>
        <p className="text-purple-200 text-sm">
          🧬 Каждый продукт влияет на длину ваших теломер - "биологических часов" клеток
        </p>
      </div>

      {/* Главное поле поиска */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
          <div className="flex gap-2">
            <div className="flex-1 relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-300" />
              <input
                type="text"
                placeholder="Введите продукт (например: 'черника 100г')"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full bg-white/10 border border-purple-400/30 rounded-lg pl-10 pr-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                disabled={isLoading}
              />
            </div>
            <button
              onClick={handleSearch}
              disabled={!searchTerm.trim() || isLoading}
              className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Plus className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Результаты дня */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Калории сегодня */}
          <div className="bg-orange-500/20 backdrop-blur-sm rounded-xl p-4 border border-orange-400/30">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Flame className="w-5 h-5 text-orange-300" />
                <span className="text-orange-100 font-semibold">Калории сегодня</span>
              </div>
              <span className="text-orange-200 text-sm">{Math.round((todayCalories / calorieGoal) * 100)}%</span>
            </div>
            <div className="text-2xl font-bold text-orange-100 mb-1">
              {todayCalories} / {calorieGoal} ккал
            </div>
            <div className="w-full bg-orange-900/30 rounded-full h-2">
              <div 
                className="bg-orange-400 h-2 rounded-full transition-all"
                style={{ width: `${Math.min((todayCalories / calorieGoal) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Влияние на теломеры */}
          <div className={`backdrop-blur-sm rounded-xl p-4 border ${
            todayTelomerePoints >= 0 
              ? 'bg-green-500/20 border-green-400/30' 
              : 'bg-red-500/20 border-red-400/30'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              {todayTelomerePoints >= 0 ? (
                <TrendingUp className="w-5 h-5 text-green-300" />
              ) : (
                <Shield className="w-5 h-5 text-red-300" />
              )}
              <span className={`font-semibold ${
                todayTelomerePoints >= 0 ? 'text-green-100' : 'text-red-100'
              }`}>
                Влияние на теломеры
              </span>
            </div>
            <div className={`text-2xl font-bold mb-1 ${
              todayTelomerePoints >= 0 ? 'text-green-100' : 'text-red-100'
            }`}>
              {todayTelomerePoints > 0 ? '+' : ''}{todayTelomerePoints} дней к жизни
            </div>
            <div className={`text-sm ${
              todayTelomerePoints >= 0 ? 'text-green-200' : 'text-red-200'
            }`}>
              {todayTelomerePoints >= 0 ? '✨ Хороший выбор!' : '⚠️ Нужна компенсация'}
            </div>
          </div>
        </div>
      </div>

      {/* Аватар здоровья */}
      <div className="max-w-md mx-auto mb-6">
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-4 border border-purple-500/30">
          <div className="text-center">
            <div className="text-6xl mb-2">{healthStatus.emoji}</div>
            <div className={`text-xl font-bold ${healthStatus.color} mb-1`}>
              HP: {Math.round(healthPoints)}/100
            </div>
            <div className={`text-sm ${healthStatus.color}`}>
              {healthStatus.text}
            </div>
            <div className="w-full bg-gray-700 rounded-full h-3 mt-2">
              <div 
                className={`h-3 rounded-full transition-all ${
                  healthPoints >= 70 ? 'bg-green-500' : 
                  healthPoints >= 40 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${healthPoints}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Кнопка библиотеки продуктов */}
      <div className="max-w-2xl mx-auto mb-6">
        <button
          onClick={() => setShowLibrary(!showLibrary)}
          className="w-full bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/30 text-purple-100 py-3 px-4 rounded-xl font-medium transition-colors"
        >
          {showLibrary ? '🔼 Скрыть библиотеку продуктов' : '🔽 Показать библиотеку продуктов'}
        </button>
      </div>

      {/* Библиотека продуктов */}
      {showLibrary && (
        <div className="max-w-6xl mx-auto">
          {/* Переключатель типов еды */}
          <div className="flex flex-wrap gap-2 mb-4 justify-center">
            {Object.keys(telomereFoodsDatabase).map(mealType => (
              <button
                key={mealType}
                onClick={() => setCurrentMealType(mealType as keyof typeof telomereFoodsDatabase)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentMealType === mealType
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-600/20 text-purple-200 hover:bg-purple-600/40'
                }`}
              >
                {mealType === 'breakfast' && '☕ Завтрак'}
                {mealType === 'lunch' && '🍽️ Обед'}
                {mealType === 'dinner' && '🌙 Ужин'}
                {mealType === 'snacks' && '⚡ Перекусы'}
                {mealType === 'alcohol' && '🍷 Алкоголь'}
              </button>
            ))}
          </div>

          {/* Сетка карточек */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {telomereFoodsDatabase[currentMealType].map((food, index) => (
              <FoodCard
                key={index}
                name={food.name}
                telomerePoints={food.telomerePoints}
                calories={food.calories || 100}
                mechanism={food.mechanism}
                onAdd={() => addFood(food)}
                showCompensation={food.telomerePoints < 0}
              />
            ))}
          </div>
        </div>
      )}

      {/* Кнопка поделиться */}
      {todayFoods.length > 0 && (
        <div className="max-w-md mx-auto mt-6">
          <button
            onClick={() => shareResults(todayTelomerePoints, todayTelomerePoints)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors"
          >
            📊 Поделиться результатами
          </button>
        </div>
      )}
    </div>
  );
};

export default HealthRPGApp;
