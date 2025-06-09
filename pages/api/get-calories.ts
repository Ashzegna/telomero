import { NextApiRequest, NextApiResponse } from 'next';
import Anthropic from '@anthropic-ai/sdk';
import { getConfig } from '@/lib/config';

const config = getConfig();

const anthropic = new Anthropic({
  apiKey: config.anthropicKey,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { foodName } = req.body;

  if (!foodName || typeof foodName !== 'string') {
    return res.status(400).json({ error: 'Название продукта обязательно' });
  }

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 100,
      system: `Ты нутрициолог. Верни ТОЛЬКО число калорий на 100г продукта в JSON формате:
{"calories": число}

Примеры:
Яблоко -> {"calories": 52}
Хлеб -> {"calories": 265}`,
      messages: [
        {
          role: 'user',
          content: `Сколько калорий в 100г продукта "${foodName.trim()}"?`
        }
      ]
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }
    
    try {
      const data = JSON.parse(content.text);
      const calories = Math.max(1, Math.min(1000, Number(data.calories) || 100));
      
      return res.status(200).json({ calories });
    } catch (parseError) {
      // Fallback если Claude вернул не JSON
      return res.status(200).json({ calories: 100 });
    }

  } catch (error) {
    console.error('Error getting calories:', error);
    return res.status(200).json({ calories: 100 }); // Always return fallback
  }
}
