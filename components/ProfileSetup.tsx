'use client';

import React, { useState } from 'react';
import { UserProfile, saveProfile, calculateCalorieGoal } from '@/lib/user-data';
import { User, Scale, Ruler, Calendar, Activity, Target } from 'lucide-react';

interface ProfileSetupProps {
  onComplete: (profile: UserProfile) => void;
  initialProfile?: UserProfile | null;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ onComplete, initialProfile }) => {
  const [profile, setProfile] = useState<UserProfile>({
    height: initialProfile?.height || 170,
    weight: initialProfile?.weight || 70,
    age: initialProfile?.age || 30,
    gender: initialProfile?.gender || 'M',
    activityLevel: initialProfile?.activityLevel || 'medium'
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async () => {
    setSaving(true);
    
    const success = await saveProfile(profile);
    if (success) {
      onComplete(profile);
    } else {
      alert('Ошибка сохранения профиля');
    }
    
    setSaving(false);
  };

  const calorieGoal = calculateCalorieGoal(profile);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-6">
        <User className="w-16 h-16 mx-auto text-blue-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800">
          👤 Создай профиль героя
        </h2>
        <p className="text-gray-600 mt-2">
          Для персональных рекомендаций
        </p>
      </div>

      <div className="space-y-4">
        {/* Рост */}
        <div className="flex items-center space-x-3">
          <Ruler className="w-5 h-5 text-gray-400" />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Рост (см)
            </label>
            <input
              type="number"
              value={profile.height}
              onChange={(e) => setProfile(prev => ({ ...prev, height: Number(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="120"
              max="250"
            />
          </div>
        </div>

        {/* Вес */}
        <div className="flex items-center space-x-3">
          <Scale className="w-5 h-5 text-gray-400" />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Вес (кг)
            </label>
            <input
              type="number"
              value={profile.weight}
              onChange={(e) => setProfile(prev => ({ ...prev, weight: Number(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="30"
              max="300"
            />
          </div>
        </div>

        {/* Возраст */}
        <div className="flex items-center space-x-3">
          <Calendar className="w-5 h-5 text-gray-400" />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Возраст (лет)
            </label>
            <input
              type="number"
              value={profile.age}
              onChange={(e) => setProfile(prev => ({ ...prev, age: Number(e.target.value) }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="16"
              max="120"
            />
          </div>
        </div>

        {/* Пол */}
        <div className="flex items-center space-x-3">
          <User className="w-5 h-5 text-gray-400" />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Пол
            </label>
            <div className="flex space-x-3">
              <button
                onClick={() => setProfile(prev => ({ ...prev, gender: 'M' }))}
                className={`flex-1 py-2 px-4 rounded-lg border ${
                  profile.gender === 'M' 
                    ? 'bg-blue-500 text-white border-blue-500' 
                    : 'bg-gray-100 text-gray-700 border-gray-300'
                }`}
              >
                👨 Мужской
              </button>
              <button
                onClick={() => setProfile(prev => ({ ...prev, gender: 'F' }))}
                className={`flex-1 py-2 px-4 rounded-lg border ${
                  profile.gender === 'F' 
                    ? 'bg-pink-500 text-white border-pink-500' 
                    : 'bg-gray-100 text-gray-700 border-gray-300'
                }`}
              >
                👩 Женский
              </button>
            </div>
          </div>
        </div>

        {/* Активность */}
        <div className="flex items-center space-x-3">
          <Activity className="w-5 h-5 text-gray-400" />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Активность
            </label>
            <select
              value={profile.activityLevel}
              onChange={(e) => setProfile(prev => ({ ...prev, activityLevel: e.target.value as 'low' | 'medium' | 'high' }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="low">🛋️ Низкая (сидячий образ жизни)</option>
              <option value="medium">🚶 Средняя (спорт 1-3 раза в неделю)</option>
              <option value="high">🏃 Высокая (спорт 4+ раз в неделю)</option>
            </select>
          </div>
        </div>

        {/* Результат */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2 mb-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-blue-800">Твоя норма калорий:</span>
          </div>
          <div className="text-2xl font-bold text-blue-600">
            {calorieGoal} ккал/день
          </div>
        </div>

        {/* Кнопка сохранения */}
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="w-full bg-blue-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Сохранение...</span>
            </>
          ) : (
            <>
              <span>🎮 Начать игру!</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProfileSetup;
