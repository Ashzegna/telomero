// Health calculation utilities

export const getHealthColor = (value: number, type: 'higher-better' | 'lower-better' = 'higher-better') => {
  if (type === 'lower-better') {
    // For oxidative stress and inflammation
    if (value <= 30) return 'bg-green-500';
    if (value <= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  } else {
    // For telomerase activity and DNA repair
    if (value >= 70) return 'bg-green-500';
    if (value >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  }
};

export const getTextColor = (score: number) => {
  if (score >= 50) return "text-green-600";
  if (score >= 20) return "text-blue-600";
  if (score >= 0) return "text-yellow-600";
  if (score >= -30) return "text-orange-600";
  return "text-red-600";
};

export const getProcessTextColor = (value: number, type: 'higher-better' | 'lower-better') => {
  if (type === 'lower-better') {
    return value <= 30 ? 'text-green-600' : value <= 50 ? 'text-yellow-600' : 'text-red-600';
  } else {
    return value >= 70 ? 'text-green-600' : value >= 50 ? 'text-yellow-600' : 'text-red-600';
  }
};

export const formatLifeDays = (days: number): string => {
  if (days > 0) {
    if (days >= 365) {
      const years = Math.floor(days / 365);
      const remainingDays = days % 365;
      return `+${years} ${years === 1 ? 'год' : years < 5 ? 'года' : 'лет'}${remainingDays > 0 ? ` и ${remainingDays} дн.` : ''}`;
    }
    return `+${days} ${days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'}`;
  } else if (days < 0) {
    const absDays = Math.abs(days);
    if (absDays >= 365) {
      const years = Math.floor(absDays / 365);
      const remainingDays = absDays % 365;
      return `-${years} ${years === 1 ? 'год' : years < 5 ? 'года' : 'лет'}${remainingDays > 0 ? ` и ${remainingDays} дн.` : ''}`;
    }
    return `-${absDays} ${absDays === 1 ? 'день' : absDays < 5 ? 'дня' : 'дней'}`;
  }
  return "Нейтрально";
};

export const getTelomereHealthStatus = (telomereHealth: number) => {
  if (telomereHealth >= 80) return { 
    status: "Отличное", 
    color: "text-green-600", 
    desc: "Теломеры активно защищены!" 
  };
  if (telomereHealth >= 60) return { 
    status: "Хорошее", 
    color: "text-blue-600", 
    desc: "Здоровое состояние теломер" 
  };
  if (telomereHealth >= 40) return { 
    status: "Среднее", 
    color: "text-yellow-600", 
    desc: "Требуется больше защиты" 
  };
  if (telomereHealth >= 20) return { 
    status: "Плохое", 
    color: "text-orange-600", 
    desc: "Теломеры под угрозой" 
  };
  return { 
    status: "Критическое", 
    color: "text-red-600", 
    desc: "Ускоренное старение!" 
  };
};

export const getAvatarEmoji = (telomereHealth: number): string => {
  if (telomereHealth >= 80) return '😊';
  if (telomereHealth >= 60) return '🙂';
  if (telomereHealth >= 40) return '😐';
  if (telomereHealth >= 20) return '😟';
  return '😵';
};

export const getAvatarBgColor = (telomereHealth: number): string => {
  if (telomereHealth >= 80) return 'bg-green-100';
  if (telomereHealth >= 60) return 'bg-blue-100';
  if (telomereHealth >= 40) return 'bg-yellow-100';
  if (telomereHealth >= 20) return 'bg-orange-100';
  return 'bg-red-100';
};

export const getAvatarStatusText = (telomereHealth: number): string => {
  if (telomereHealth >= 80) return 'Сияющее здоровье!';
  if (telomereHealth >= 60) return 'Отличное состояние';
  if (telomereHealth >= 40) return 'Среднее здоровье';
  if (telomereHealth >= 20) return 'Нужна помощь';
  return 'Критическое состояние';
};

export const getAvatarStatusColor = (telomereHealth: number): string => {
  if (telomereHealth >= 80) return 'text-green-600';
  if (telomereHealth >= 60) return 'text-blue-600';
  if (telomereHealth >= 40) return 'text-yellow-600';
  if (telomereHealth >= 20) return 'text-orange-600';
  return 'text-red-600';
};

// Calculate cellular effects based on consumed foods
export const calculateCellularEffects = (foods: any[]) => {
  const baseEffects = { 
    oxidativeStress: 50, 
    inflammation: 50, 
    telomeraseActivity: 50, 
    dnaRepair: 50 
  };
  
  foods.forEach(food => {
    if (food.effects) {
      Object.keys(baseEffects).forEach(effect => {
        baseEffects[effect as keyof typeof baseEffects] += food.effects[effect] || 0;
      });
    }
  });

  // Clamp values between 0 and 100
  Object.keys(baseEffects).forEach(effect => {
    baseEffects[effect as keyof typeof baseEffects] = Math.max(0, Math.min(100, baseEffects[effect as keyof typeof baseEffects]));
  });

  return baseEffects;
};

// Calculate telomere health score
export const calculateTelomereHealth = (totalScore: number): number => {
  return Math.max(0, Math.min(100, 50 + totalScore * 0.8));
};

// Calculate total telomere score from all foods
export const calculateTotalScore = (dayMeals: { [key: string]: any[] }): number => {
  const allFoods = Object.values(dayMeals).flat();
  return allFoods.reduce((sum, food) => sum + (food.telomerePoints || 0), 0);
};
