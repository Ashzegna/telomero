'use client';

import React from 'react';
import { Heart, Zap, Shield, Skull, Sparkles, TrendingUp, TrendingDown, Timer, Flame } from 'lucide-react';

interface FoodCardProps {
  name: string;
  telomerePoints: number;
  calories: number;
  weight?: number;
  mechanism: string;
  onAdd: () => void;
  showCompensation?: boolean;
}

const FoodCard: React.FC<FoodCardProps> = ({ 
  name, 
  telomerePoints, 
  calories, 
  weight, 
  mechanism, 
  onAdd,
  showCompensation = false
}) => {
  const isHarmful = telomerePoints < 0;
  const isNeutral = telomerePoints === 0;
  const isProtective = telomerePoints > 0;
  
  // Определяем стиль карточки
  const getCardStyle = () => {
    if (isHarmful) {
      return {
        gradient: 'from-red-600 via-red-500 to-red-400',
        border: 'border-red-500',
        glow: 'shadow-red-500/50',
        icon: <Skull className="w-6 h-6 text-red-100" />,
        badge: '💀 УРОН'
      };
    }
    if (isProtective) {
      return {
        gradient: 'from-green-600 via-green-500 to-green-400',
        border: 'border-green-500', 
        glow: 'shadow-green-500/50',
        icon: <Shield className="w-6 h-6 text-green-100" />,
        badge: '🛡️ ЗАЩИТА'
      };
    }
    return {
      gradient: 'from-gray-600 via-gray-500 to-gray-400',
      border: 'border-gray-500',
      glow: 'shadow-gray-500/50', 
      icon: <Zap className="w-6 h-6 text-gray-100" />,
      badge: '⚖️ НЕЙТРАЛЬНО'
    };
  };

  const cardStyle = getCardStyle();
  
  // Компенсация для вредных продуктов
  const getCompensation = () => {
    if (!isHarmful) return null;
    
    const damage = Math.abs(telomerePoints);
    return [
      { food: '🥗 Салат с лососем', points: 22 },
      { food: '🫐 Черника', points: 18 },
      { food: '🥑 Авокадо', points: 10 }
    ].filter(item => item.points >= damage).slice(0, 2);
  };

  const compensation = getCompensation();
  const displayCalories = weight ? Math.round(calories * weight / 100) : calories;
  const calorieText = weight ? `${displayCalories} ккал (${weight}г)` : `${calories} ккал/100г`;

  return (
    <div 
      onClick={onAdd}
      className={`
        relative cursor-pointer transform transition-all duration-300 hover:scale-105 hover:rotate-1
        bg-gradient-to-br ${cardStyle.gradient} 
        border-2 ${cardStyle.border}
        rounded-xl p-4 shadow-2xl ${cardStyle.glow}
        hover:shadow-3xl animate-pulse-subtle
      `}
    >
      {/* Блики и эффекты */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl pointer-events-none" />
      <div className="absolute top-2 right-2 w-8 h-8 bg-white/10 rounded-full blur-sm" />
      
      {/* Заголовок карточки */}
      <div className="relative z-10">
        {/* Бейдж типа */}
        <div className="flex items-center justify-between mb-3">
          <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
            <span className="text-white font-bold text-xs">{cardStyle.badge}</span>
          </div>
          {cardStyle.icon}
        </div>
        
        {/* Название продукта */}
        <h3 className="text-white font-bold text-lg mb-2 drop-shadow-lg">
          {name}
        </h3>
        
        {/* Основные показатели */}
        <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3 mb-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              {isHarmful ? (
                <TrendingDown className="w-5 h-5 text-red-300" />
              ) : isProtective ? (
                <TrendingUp className="w-5 h-5 text-green-300" />
              ) : (
                <Timer className="w-5 h-5 text-gray-300" />
              )}
              <span className="text-white font-bold text-xl">
                {telomerePoints > 0 ? '+' : ''}{telomerePoints}
              </span>
              <span className="text-white/80 text-sm">дней жизни</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Flame className="w-4 h-4 text-orange-300" />
            <span className="text-white/90 text-sm">{calorieText}</span>
          </div>
        </div>
        
        {/* Механизм воздействия */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 mb-3">
          <p className="text-white/90 text-xs leading-relaxed">
            <strong>Механизм:</strong> {mechanism}
          </p>
        </div>
        
        {/* Компенсация для вредных продуктов */}
        {isHarmful && compensation && compensation.length > 0 && (
          <div className="bg-green-500/20 backdrop-blur-sm rounded-lg p-2 border border-green-400/30">
            <div className="flex items-center space-x-1 mb-1">
              <Sparkles className="w-4 h-4 text-green-300" />
              <span className="text-green-300 font-bold text-xs">⚡ КОМПЕНСАЦИЯ:</span>
            </div>
            {compensation.map((item, index) => (
              <div key={index} className="text-green-200 text-xs">
                {item.food} (+{item.points} дней)
              </div>
            ))}
          </div>
        )}
        
        {/* Призыв к действию */}
        <div className="mt-3 text-center">
          <div className="bg-white/20 hover:bg-white/30 transition-colors rounded-lg py-2 px-4">
            <span className="text-white font-bold text-sm">
              {isHarmful ? '⚠️ ОСТОРОЖНО!' : isProtective ? '✨ ПОЛЕЗНО!' : '📊 ДОБАВИТЬ'}
            </span>
          </div>
        </div>
      </div>
      
      {/* Анимированные частицы для особых эффектов */}
      {isHarmful && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 left-4 w-1 h-1 bg-red-300 rounded-full animate-ping" />
          <div className="absolute bottom-6 right-6 w-1 h-1 bg-red-400 rounded-full animate-ping animation-delay-300" />
        </div>
      )}
      
      {isProtective && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-4 right-4 w-1 h-1 bg-green-300 rounded-full animate-ping" />
          <div className="absolute bottom-6 left-6 w-1 h-1 bg-green-400 rounded-full animate-ping animation-delay-500" />
        </div>
      )}
    </div>
  );
};

export default FoodCard;
