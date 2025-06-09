// Добавляем новые методы
export const deleteFoodEntry = async (foodId: number): Promise<boolean> => {
  try {
    const userId = getUserId();
    const response = await fetch('/api/user-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'delete_food',
        userId,
        data: { foodId }
      })
    });
    return response.ok;
  } catch (error) {
    console.error('Error deleting food:', error);
    return false;
  }
};

export const getUserStats = async (): Promise<any[]> => {
  try {
    const userId = getUserId();
    const response = await fetch('/api/user-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'get_user_stats',
        userId
      })
    });
    const data = await response.json();
    return data.stats || [];
  } catch (error) {
    console.error('Error getting user stats:', error);
    return [];
  }
};// Утилиты для работы с пользовательскими данными

export interface UserProfile {
  height: number; // см
  weight: number; // кг
  age: number;
  gender: 'M' | 'F';
  calorieGoal?: number;
  activityLevel: 'low' | 'medium' | 'high';
}

export interface FoodEntry {
  name: string;
  calories: number;
  telomerePoints: number;
  weight?: number; // граммы
  timestamp: string;
}

// Получение ID пользователя из Telegram
export const getUserId = (): string => {
  if (typeof window !== 'undefined' && window.Telegram?.WebApp?.initDataUnsafe?.user) {
    return window.Telegram.WebApp.initDataUnsafe.user.id.toString();
  }
  // Fallback для тестирования
  return 'anonymous_' + Date.now();
};

// Расчет дневной нормы калорий (формула Миффлина-Сан Жеора)
export const calculateCalorieGoal = (profile: UserProfile): number => {
  const { height, weight, age, gender, activityLevel } = profile;
  
  // Базовый метаболизм
  let bmr;
  if (gender === 'M') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
  
  // Коэффициент активности
  const activityMultiplier = {
    low: 1.2,
    medium: 1.55, 
    high: 1.9
  };
  
  return Math.round(bmr * activityMultiplier[activityLevel]);
};

// API методы
export const saveProfile = async (profile: UserProfile): Promise<boolean> => {
  try {
    const userId = getUserId();
    const response = await fetch('/api/user-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'save_profile',
        userId,
        data: {
          ...profile,
          calorieGoal: calculateCalorieGoal(profile)
        }
      })
    });
    return response.ok;
  } catch (error) {
    console.error('Error saving profile:', error);
    return false;
  }
};

export const getProfile = async (): Promise<UserProfile | null> => {
  try {
    const userId = getUserId();
    const response = await fetch('/api/user-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'get_profile',
        userId
      })
    });
    const data = await response.json();
    return data.profile;
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
};

export const saveFoodEntry = async (food: FoodEntry): Promise<boolean> => {
  try {
    const userId = getUserId();
    const response = await fetch('/api/user-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'save_food',
        userId,
        data: food
      })
    });
    return response.ok;
  } catch (error) {
    console.error('Error saving food:', error);
    return false;
  }
};

export const getTodayFoods = async (): Promise<FoodEntry[]> => {
  try {
    const userId = getUserId();
    const response = await fetch('/api/user-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'get_today_foods',
        userId
      })
    });
    const data = await response.json();
    return data.foods || [];
  } catch (error) {
    console.error('Error getting today foods:', error);
    return [];
  }
};
