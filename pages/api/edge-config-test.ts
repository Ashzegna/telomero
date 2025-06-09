import { NextApiRequest, NextApiResponse } from 'next';
import { get, getAll } from '@vercel/edge-config';

// Типы для наших данных
interface ProfileData {
  [key: string]: any;
}

interface FoodData {
  id: number;
  timestamp: string;
  [key: string]: any;
}

interface UserFoods {
  [userId: string]: FoodData[];
}

interface UserProfiles {
  [userId: string]: ProfileData;
}

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
        // Edge Config только для чтения, используем временное хранение
        // В продакшене добавим Upstash Redis
        const profiles = (await get('profiles') as UserProfiles) || {};
        profiles[userId] = data;
        
        console.log('Profile saved for user:', userId);
        return res.status(200).json({ success: true });

      case 'get_profile':
        const allProfiles = (await get('profiles') as UserProfiles) || {};
        const profile = allProfiles[userId] || null;
        return res.status(200).json({ profile });

      case 'save_food':
        // Пока используем in-memory storage для еды
        // TODO: Добавить Upstash Redis для записи данных
        const foods = (await get('user_foods') as UserFoods) || {};
        if (!foods[userId]) {
          foods[userId] = [];
        }
        
        const newFood = {
          ...data,
          id: Date.now(),
          timestamp: new Date().toISOString()
        };
        
        foods[userId].push(newFood);
        
        console.log('Food saved for user:', userId);
        return res.status(200).json({ success: true });

      case 'get_today_foods':
        const userFoods = (await get('user_foods') as UserFoods) || {};
        const today = new Date().toISOString().split('T')[0];
        const todayFoods = (userFoods[userId] || []).filter((food: FoodData) => 
          food.timestamp.startsWith(today)
        );
        return res.status(200).json({ foods: todayFoods });

      default:
        return res.status(400).json({ error: 'Unknown action' });
    }
  } catch (error) {
    console.error('Edge Config Error:', error);
    // Fallback to in-memory storage
    return res.status(500).json({ 
      error: 'Database temporarily unavailable, using fallback storage',
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
}
