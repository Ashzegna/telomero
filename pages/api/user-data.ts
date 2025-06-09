import { NextApiRequest, NextApiResponse } from 'next';
// import { kv } from '@vercel/kv'; // Добавим позже после настройки KV

// Временное хранение в памяти (для разработки)
const userProfiles: Record<string, any> = {};
const userFoodHistory: Record<string, any> = {};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { action, userId, data } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'userId is required' });
  }

  try {
    switch (action) {
      case 'save_profile':
        userProfiles[userId] = data;
        console.log('Profile saved for user:', userId);
        return res.status(200).json({ success: true });

      case 'get_profile':
        const profile = userProfiles[userId] || null;
        return res.status(200).json({ profile });

      case 'save_food':
        // Инициализируем массив для пользователя если его нет
        if (!userFoodHistory[userId]) {
          userFoodHistory[userId] = [];
        }
        
        // Добавляем новую еду
        const newFood = {
          ...data,
          id: Date.now(), // Уникальный ID
          timestamp: new Date().toISOString()
        };
        
        userFoodHistory[userId].push(newFood);
        
        console.log('Food saved for user:', userId);
        return res.status(200).json({ success: true });

      case 'get_today_foods':
        const today = new Date().toISOString().split('T')[0];
        const userFoods = userFoodHistory[userId] || [];
        const todayFoods = userFoods.filter((food: any) => 
          food.timestamp.startsWith(today)
        );
        return res.status(200).json({ foods: todayFoods });

      case 'delete_food':
        const { foodId } = data;
        if (userFoodHistory[userId]) {
          userFoodHistory[userId] = userFoodHistory[userId].filter(
            (food: any) => food.id !== foodId
          );
        }
        return res.status(200).json({ success: true });

      case 'get_user_stats':
        // Получаем статистику пользователя за последние 7 дней
        const stats = [];
        const userAllFoods = userFoodHistory[userId] || [];
        
        for (let i = 0; i < 7; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          
          const dayFoods = userAllFoods.filter((food: any) => 
            food.timestamp.startsWith(dateStr)
          );
          
          const dayStats = {
            date: dateStr,
            totalCalories: dayFoods.reduce((sum: number, food: any) => sum + (food.calories || 0), 0),
            totalTelomerePoints: dayFoods.reduce((sum: number, food: any) => sum + (food.telomerePoints || 0), 0),
            foodCount: dayFoods.length
          };
          
          stats.push(dayStats);
        }
        
        return res.status(200).json({ stats });

      default:
        return res.status(400).json({ error: 'Unknown action' });
    }
  } catch (error) {
    console.error('API Error:', error);
    return res.status(500).json({ 
      error: 'Database error', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}
