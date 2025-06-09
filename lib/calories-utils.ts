// Утилиты для безопасной работы с калориями

import { Food } from '@/data/foods';

/**
 * Безопасно получает calories из продукта с fallback
 */
export const getCaloriesSafe = (food: Food): number => {
  if ('calories' in food && typeof food.calories === 'number' && food.calories > 0) {
    return food.calories;
  }
  return 100; // Fallback значение
};

/**
 * Получает calories через API если они отсутствуют
 */
export const getCaloriesFromAPI = async (foodName: string): Promise<number> => {
  try {
    const response = await fetch('/api/get-calories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ foodName }),
    });
    
    const data = await response.json();
    return data.calories || 100;
  } catch (error) {
    console.error('Error fetching calories:', error);
    return 100;
  }
};

/**
 * Расширенная функция получения calories с API fallback
 */
export const getCaloriesExtended = async (food: Food): Promise<number> => {
  const safeCalories = getCaloriesSafe(food);
  
  // Если есть calories, возвращаем их
  if (safeCalories !== 100) {
    return safeCalories;
  }
  
  // Если нет calories, пробуем получить через API
  try {
    return await getCaloriesFromAPI(food.name);
  } catch (error) {
    return 100; // Окончательный fallback
  }
};

/**
 * Нормализует значение calories в допустимых пределах
 */
export const normalizeCalories = (calories: number): number => {
  return Math.max(1, Math.min(1000, Math.round(calories)));
};
