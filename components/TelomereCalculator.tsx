'use client';

import React, { useState, useEffect } from 'react';
import { Heart, Zap, Shield, TrendingUp, Coffee, Utensils, Moon, Plus, Search, Calendar, Battery, Brain, Sparkles, Activity, Dna } from 'lucide-react';
import { telomereFoodsDatabase, Food } from '@/data/foods';
import { initTelegramWebApp, shareResults, showHapticFeedback } from '@/lib/telegram';
import CellularProcessesCard from './CellularProcessesCard';
import LongTermEffectCard from './LongTermEffectCard';
import { 
  calculateCellularEffects, 
  calculateTelomereHealth, 
  calculateTotalScore,
  formatLifeDays,
  getTelomereHealthStatus,
  getAvatarEmoji,
  getAvatarBgColor,
  getAvatarStatusText,
  getAvatarStatusColor,
  getHealthColor,
  getProcessTextColor
} from '@/lib/calculations';

interface DayMeals {
  breakfast: (Food & { id: number })[];
  lunch: (Food & { id: number })[];
  dinner: (Food & { id: number })[];
  snacks: (Food & { id: number })[];
}

const TelomereCalculator = () => {
  const [currentMeal, setCurrentMeal] = useState<keyof DayMeals | 'alcohol'>('breakfast');
  const [dayMeals, setDayMeals] = useState<DayMeals>({
    breakfast: [],
    lunch: [],
    dinner: [],
    snacks: []
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [telomereScore, setTelomereScore] = useState(0);
  const [lifeDays, setLifeDays] = useState(0);
  const [telomereHealth, setTelomereHealth] = useState(50);
  const [cellularEffects, setCellularEffects] = useState({
    oxidativeStress: 50,
    inflammation: 50,
    telomeraseActivity: 50,
    dnaRepair: 50
  });
  const [isLoading, setIsLoading] = useState(false);

  const mealIcons = {
    breakfast: <Coffee className="w-5 h-5" />,
    lunch: <Utensils className="w-5 h-5" />,
    dinner: <Moon className="w-5 h-5" />,
    snacks: <Zap className="w-5 h-5" />
  };

  const mealNames = {
    breakfast: "Завтрак",
    lunch: "Обед", 
    dinner: "Ужин",
    snacks: "Перекусы"
  };

  const cellularIcons = {
    oxidativeStress: <Shield className="w-4 h-4" />,
    inflammation: <Heart className="w-4 h-4" />,
    telomeraseActivity: <Dna className="w-4 h-4" />,
    dnaRepair: <Sparkles className="w-4 h-4" />
  };

  const cellularNames = {
    oxidativeStress: "Защита от окисления",
    inflammation: "Контроль воспаления", 
    telomeraseActivity: "Активность теломеразы",
    dnaRepair: "Восстановление ДНК"
  };

  const cellularExplanations = {
    oxidativeStress: "(уровень свободных радикалов)",
    inflammation: "(воспалительные процессы в клетках)",
    telomeraseActivity: "(фермент, удлиняющий теломеры)",
    dnaRepair: "(репарация повреждений хромосом)"
  };

  // Initialize Telegram WebApp
  useEffect(() => {
    initTelegramWebApp();
  }, []);

  // Calculate effects when meals change
  useEffect(() => {
    const allFoods = Object.values(dayMeals).flat();
    const totalScore = calculateTotalScore(dayMeals);
    
    setTelomereScore(totalScore);
    setLifeDays(totalScore);
    setTelomereHealth(calculateTelomereHealth(totalScore));
    setCellularEffects(calculateCellularEffects(allFoods));
  }, [dayMeals]);

  const searchFood = async (query: string): Promise<Food | null> => {
    if (query.length < 2) return null;
    
    setIsLoading(true);
    showHapticFeedback('light');
    
    try {
      const response = await fetch('/api/analyze-food', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ foodName: query }),
      });

      const data = await response.json();
      
      if (response.ok) {
        showHapticFeedback('success');
        return data;
      } else {
        showHapticFeedback('error');
        return data.fallback || null;
      }
    } catch (error) {
      console.error('Error analyzing food:', error);
      showHapticFeedback('error');
      
      // Fallback food data
      return {
        name: query,
        telomerePoints: Math.floor(Math.random() * 21) - 10,
        category: "neutral" as const,
        mechanism: "Влияние на теломеры определяется индивидуально",
        effects: {
          oxidativeStress: Math.floor(Math.random() * 21) - 10,
          inflammation: Math.floor(Math.random() * 21) - 10,
          telomeraseActivity: Math.floor(Math.random() * 21) - 10,
          dnaRepair: Math.floor(Math.random() * 21) - 10
        },
        isCustom: true
      };
    } finally {
      setIsLoading(false);
    }
  };

  const addFood = (food: Food, mealType: keyof DayMeals | 'alcohol' = currentMeal) => {
    showHapticFeedback('selection');
    
    if (mealType === 'alcohol') {
      mealType = 'snacks'; // Add alcohol to snacks section
    }
    
    if (mealType in dayMeals) {
      setDayMeals(prev => ({
        ...prev,
        [mealType]: [...prev[mealType as keyof DayMeals], { ...food, id: Date.now() }]
      }));
    }
    setSearchTerm('');
  };

  const removeFood = (mealType: keyof DayMeals, foodId: number) => {
    showHapticFeedback('light');
    setDayMeals(prev => ({
      ...prev,
      [mealType]: prev[mealType].filter(food => food.id !== foodId)
    }));
  };

  const handleCustomFood = async () => {
    if (searchTerm.trim()) {
      const customFood = await searchFood(searchTerm.trim());
      if (customFood) {
        addFood(customFood);
      }
    }
  };

  const handleShare = () => {
    shareResults(telomereScore, lifeDays);
  };

  const getCurrentMealFoods = () => {
    if (currentMeal === 'alcohol') {
      return telomereFoodsDatabase.alcohol;
    }
    return telomereFoodsDatabase[currentMeal] || [];
  };

  const telomereStatus = getTelomereHealthStatus(telomereHealth);

  return (
    <div className="max-w-7xl mx-auto p-4 bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
          🧬 Калькулятор здоровья теломер
        </h1>
        <p className="text-gray-600 mb-4 text-sm md:text-base">
          Каждый продукт влияет на длину ваших теломер - "биологических часов" клеток
        </p>
        <div className="bg-blue-100 border border-blue-300 rounded-lg p-3 text-xs md:text-sm text-blue-800">
          <strong>💡 Научная основа:</strong> Теломеры защищают хромосомы от повреждений. 
          Их длина определяет скорость старения и продолжительность жизни.
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 md:gap-6">
        {/* Results Panel */}
        <div className="xl:col-span-1">
          <div className="sticky top-4 space-y-4">
            {/* Telomere Health Card */}
            <div className="telomere-card border-l-4 border-blue-500">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center text-sm md:text-base">
                <Dna className="w-4 h-4 md:w-5 md:h-5 mr-2 text-blue-600" />
                Состояние теломер
              </h3>
              
              <div className="text-center mb-4">
                <div className={`text-2xl md:text-3xl font-bold ${telomereStatus.color}`}>
                  {Math.round(telomereHealth)}%
                </div>
                <div className={`text-base md:text-lg font-semibold ${telomereStatus.color}`}>
                  {telomereStatus.status}
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">
                  {telomereStatus.desc}
                </div>
              </div>

              <div className="mb-4">
                <div className="text-xs md:text-sm text-gray-600 mb-2">Длина теломер:</div>
                <div className="telomere-progress-bar">
                  <div 
                    className={`h-full transition-all duration-1000 ${getHealthColor(telomereHealth, 'higher-better')}`}
                    style={{ width: `${telomereHealth}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Life Impact Card */}
            <div className="telomere-card border-l-4 border-green-500">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center text-sm md:text-base">
                <Calendar className="w-4 h-4 md:w-5 md:h-5 mr-2 text-green-600" />
                Влияние на жизнь
              </h3>
              
              <div className="text-center mb-4">
                <div className={`text-lg md:text-2xl font-bold ${getProcessTextColor(telomereScore, 'higher-better')}`}>
                  {formatLifeDays(lifeDays)}
                </div>
                <div className="text-xs md:text-sm text-gray-600 mt-1">
                  благодаря состоянию теломер
                </div>
              </div>

              <div className="text-xs text-gray-500 bg-gray-50 p-2 md:p-3 rounded-lg">
                <strong>Как это работает:</strong> Здоровые теломеры замедляют старение клеток, 
                что напрямую влияет на продолжительность жизни.
              </div>
            </div>

            {/* Health Avatar */}
            <div className="telomere-card">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center text-sm md:text-base">
                <Activity className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                Ваш аватар здоровья
              </h3>
              
              <div className="text-center mb-4">
                <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-3 relative">
                  <div className={`w-full h-full rounded-full flex items-center justify-center text-2xl md:text-4xl transition-all duration-1000 ${getAvatarBgColor(telomereHealth)}`}>
                    {getAvatarEmoji(telomereHealth)}
                  </div>
                  
                  {telomereHealth >= 80 && (
                    <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 text-lg md:text-2xl animate-pulse">✨</div>
                  )}
                  {telomereHealth < 30 && (
                    <div className="absolute -bottom-1 -right-1 text-sm md:text-lg">💔</div>
                  )}
                </div>
                
                <div className={`text-xs md:text-sm font-medium ${getAvatarStatusColor(telomereHealth)}`}>
                  {getAvatarStatusText(telomereHealth)}
                </div>
              </div>
            </div>

            {/* Cellular Processes Card */}
            <CellularProcessesCard cellularEffects={cellularEffects} />

            {/* Long Term Effect Card */}
            <LongTermEffectCard telomereScore={telomereScore} lifeDays={lifeDays} />

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="w-full telomere-button-primary text-sm md:text-base"
            >
              📊 Поделиться результатами
            </button>
          </div>
        </div>

        {/* Main Panel */}
        <div className="xl:col-span-3">
          {/* Meal Selector */}
          <div className="telomere-card mb-4 md:mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.keys(mealNames).map(meal => (
                <button
                  key={meal}
                  onClick={() => setCurrentMeal(meal as keyof DayMeals)}
                  className={`flex items-center px-3 py-2 rounded-lg transition-all text-sm ${
                    currentMeal === meal 
                      ? 'bg-blue-500 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {mealIcons[meal as keyof typeof mealIcons]}
                  <span className="ml-2">{mealNames[meal as keyof typeof mealNames]}</span>
                </button>
              ))}
              <button
                onClick={() => setCurrentMeal('alcohol')}
                className={`flex items-center px-3 py-2 rounded-lg transition-all text-sm ${
                  currentMeal === 'alcohol' 
                    ? 'bg-purple-500 text-white shadow-md' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                🍷 <span className="ml-2">Алкоголь</span>
              </button>
            </div>

            {/* Search */}
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="w-4 h-4 md:w-5 md:h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Введите название продукта для анализа..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleCustomFood()}
                  className="telomere-input pl-8 md:pl-10 text-sm md:text-base"
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={handleCustomFood}
                disabled={!searchTerm.trim() || isLoading}
                className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center text-sm md:text-base"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <Plus className="w-4 h-4 mr-1" />
                )}
                <span className="hidden md:inline ml-1">Анализировать</span>
              </button>
            </div>
          </div>

          {/* Food Grid */}
          <div className="telomere-card mb-4 md:mb-6">
            <h3 className="font-semibold text-gray-800 mb-4 text-sm md:text-base">
              Влияние на теломеры: {currentMeal === 'alcohol' ? 'Алкоголь' : mealNames[currentMeal as keyof typeof mealNames]}
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 md:gap-4">
              {getCurrentMealFoods().map((food, index) => (
                <div
                  key={index}
                  onClick={() => addFood(food)}
                  className={`telomere-food-card-${food.category}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex-1">
                      <div className="font-medium text-gray-800 text-sm md:text-base">{food.name}</div>
                    </div>
                    <div className={`font-bold text-lg md:text-xl ml-3 ${
                      food.telomerePoints > 0 ? 'text-green-600' : 
                      food.telomerePoints < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {food.telomerePoints > 0 ? '+' : ''}{food.telomerePoints}
                    </div>
                  </div>
                  
                  <div className={`text-xs mb-2 ${
                    food.telomerePoints > 0 ? 'text-green-700' : 
                    food.telomerePoints < 0 ? 'text-red-700' : 'text-gray-600'
                  }`}>
                    {food.telomerePoints > 0 ? `+${food.telomerePoints} дн. жизни` : 
                     food.telomerePoints < 0 ? `${food.telomerePoints} дн. жизни` : 'Нейтрально'}
                  </div>
                  
                  <div className="text-xs text-gray-600 italic leading-relaxed">
                    <strong>Механизм:</strong> {food.mechanism}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Meals */}
          <div className="telomere-card">
            <h3 className="font-semibold text-gray-800 mb-4 text-sm md:text-base">Влияние на теломеры сегодня</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
              {Object.entries(dayMeals).map(([mealType, foods]) => (
                <div key={mealType} className="bg-gray-50 rounded-lg p-3 md:p-4">
                  <h4 className="font-medium text-gray-700 mb-3 flex items-center text-sm">
                    {mealIcons[mealType as keyof typeof mealIcons]}
                    <span className="ml-2">{mealNames[mealType as keyof typeof mealNames]}</span>
                  </h4>
                  <div className="space-y-2">
                    {foods.length === 0 ? (
                      <div className="text-gray-400 text-xs italic">Нет данных</div>
                    ) : (
                      foods.map((food) => (
                        <div
                          key={food.id}
                          className="bg-white p-2 md:p-3 rounded flex justify-between items-center group hover:bg-gray-50"
                        >
                          <div className="flex-1">
                            <div className="text-xs md:text-sm text-gray-700 font-medium">{food.name}</div>
                            <div className={`text-xs ${
                              food.telomerePoints > 0 ? 'text-green-600' : 
                              food.telomerePoints < 0 ? 'text-red-600' : 'text-gray-500'
                            }`}>
                              Теломеры: {food.telomerePoints > 0 ? '+' : ''}{food.telomerePoints}
                            </div>
                          </div>
                          <button
                            onClick={() => removeFood(mealType as keyof DayMeals, food.id)}
                            className="text-red-400 hover:text-red-600 opacity-0 group-hover:opacity-100 transition-opacity ml-2 text-lg"
                          >
                            ×
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TelomereCalculator;
