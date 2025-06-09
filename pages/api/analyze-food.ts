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

  console.log('=== ДИАГНОСТИКА API ===');
  console.log('Анализируем продукт:', foodName.trim());
  console.log('Config:', {
    hasAnthropicKey: !!config.anthropicKey,
    keyLength: config.anthropicKey?.length,
    keyPrefix: config.anthropicKey?.slice(0, 15) + '...',
    keySuffix: '...' + config.anthropicKey?.slice(-10)
  });
  console.log('Environment variables:', {
    ANTHROPIC_API_KEY: !!process.env.ANTHROPIC_API_KEY,
    CLAUDE_API_KEY: !!process.env.CLAUDE_API_KEY
  });

  try {
    console.log('Создаем Anthropic клиент...');
    console.log('Отправляем запрос к Claude API...');
    
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 500,
      system: `Ты эксперт по влиянию питания на здоровье теломер. Анализируй продукты с научной точки зрения.

ОБЯЗАТЕЛЬНО верни ТОЛЬКО чистый JSON без комментариев:

{
  "telomerePoints": число от -25 до +25,
  "category": "protective" | "neutral" | "damaging" | "alcohol", 
  "mechanism": "краткое научное объяснение (до 80 символов)",
  "effects": {
    "oxidativeStress": число от -25 до +25,
    "inflammation": число от -25 до +25,
    "telomeraseActivity": число от -25 до +25,
    "dnaRepair": число от -25 до +25
  }
}

Пример для черники:
{
  "telomerePoints": 18,
  "category": "protective",
  "mechanism": "Антоцианы - мощные защитники теломер от окисления",
  "effects": {
    "oxidativeStress": -20,
    "inflammation": -15,
    "telomeraseActivity": 12,
    "dnaRepair": 15
  }
}

НЕ добавляй никакого текста кроме JSON!`,
      messages: [
        {
          role: 'user',
          content: `Проанализируй влияние продукта "${foodName.trim()}" на здоровье теломер.`
        }
      ]
    });

    console.log('✅ Получен ответ от Claude API!');
    console.log('Response type:', typeof response);
    console.log('Response content length:', response.content?.length);

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

  } catch (error: any) {
    console.error('❌ Claude API Error:', error);
    console.error('Error details:', {
      name: error?.name || 'Unknown',
      message: error?.message || 'No message',
      status: error?.status || 'No status',
      type: error?.type || 'No type'
    });
    
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
