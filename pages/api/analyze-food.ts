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

  if (!foodName || typeof foodName !== 'string' || foodName.trim().length < 2) {
    return res.status(400).json({ error: 'Название продукта слишком короткое' });
  }

  try {
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      system: `Ты эксперт по влиянию питания на здоровье теломер. Анализируй продукты с научной точки зрения.

Верни ТОЛЬКО JSON в следующем формате:
{
  "telomerePoints": число от -25 до +25,
  "category": "protective" | "neutral" | "damaging" | "alcohol", 
  "mechanism": "краткое научное объяснение влияния на теломеры (до 80 символов)",
  "effects": {
    "oxidativeStress": число от -25 до +25 (отрицательное = меньше стресса),
    "inflammation": число от -25 до +25 (отрицательное = меньше воспаления),
    "telomeraseActivity": число от -25 до +25 (положительное = больше активности),
    "dnaRepair": число от -25 до +25 (положительное = лучше восстановление)
  }
}

Основывайся на исследованиях влияния питания на теломеры, оксидативный стресс, воспаление.

Будь более точным в оценках:
- Ягоды, жирная рыба, орехи: +15 до +22 баллов (мощная защита теломер)
- Овощи, зеленый чай, омлет с овощами: +8 до +15 баллов (умеренная защита)
- Простые продукты (омлет, каша): +3 до +8 баллов (слабая польза)
- Обработанная еда, сладости: -10 до -18 баллов (повреждение теломер)
- Алкоголь: -5 до -22 баллов в зависимости от типа и количества`,
      messages: [
        {
          role: 'user',
          content: `Проанализируй влияние продукта "${foodName.trim()}" на здоровье теломер.`
        }
      ]
    });

    const content = response.content[0];
    if (content.type !== 'text') {
      throw new Error('Unexpected response type from Claude');
    }
    
    // Try to parse JSON response
    let foodData;
    try {
      foodData = JSON.parse(content.text);
      console.log('Claude response for:', foodName, ':', content.text); // Логируем ответ Claude
    } catch (parseError) {
      console.error('Failed to parse Claude response:', content.text);
      console.log('Raw Claude response:', content.text); // Логируем сырой ответ
      
      // Fallback if Claude returns non-JSON
      foodData = {
        telomerePoints: 0,
        category: "neutral",
        mechanism: "Влияние на теломеры требует дополнительного изучения",
        effects: {
          oxidativeStress: 0, 
          inflammation: 0,
          telomeraseActivity: 0, 
          dnaRepair: 0
        }
      };
    }

    // Validate and clamp values
    foodData.telomerePoints = Math.max(-25, Math.min(25, Number(foodData.telomerePoints) || 0));
    
    if (foodData.effects && typeof foodData.effects === 'object') {
      Object.keys(foodData.effects).forEach(key => {
        foodData.effects[key] = Math.max(-25, Math.min(25, Number(foodData.effects[key]) || 0));
      });
    } else {
      foodData.effects = {
        oxidativeStress: 0, 
        inflammation: 0,
        telomeraseActivity: 0, 
        dnaRepair: 0
      };
    }

    // Ensure category is valid
    if (!['protective', 'neutral', 'damaging', 'alcohol'].includes(foodData.category)) {
      foodData.category = 'neutral';
    }

    // Ensure mechanism is a string
    if (typeof foodData.mechanism !== 'string') {
      foodData.mechanism = "Влияние на теломеры определяется индивидуально";
    }

    return res.status(200).json({
      name: foodName.trim(),
      ...foodData,
      isCustom: true
    });

  } catch (error) {
    console.error('Claude API Error:', error);
    
    return res.status(500).json({ 
      error: 'Ошибка анализа продукта',
      fallback: {
        name: foodName.trim(),
        telomerePoints: 0,
        category: "neutral", 
        mechanism: "Временно недоступно",
        effects: {
          oxidativeStress: 0, 
          inflammation: 0,
          telomeraseActivity: 0, 
          dnaRepair: 0
        },
        isCustom: true
      }
    });
  }
}
