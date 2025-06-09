import { NextApiRequest, NextApiResponse } from 'next';
import Anthropic from '@anthropic-ai/sdk';
import { getConfig } from '@/lib/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const config = getConfig();

  console.log('=== ПРОСТОЙ ТЕСТ CLAUDE API ===');
  console.log('API Key:', config.anthropicKey ? 'Есть ключ' : 'НЕТ КЛЮЧА');

  try {
    const anthropic = new Anthropic({
      apiKey: config.anthropicKey,
    });

    console.log('Отправляем простой запрос к Claude...');
    
    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 100,
      messages: [
        {
          role: 'user',
          content: 'Привет! Ответь просто "Работаю!" если получил это сообщение.'
        }
      ]
    });

    console.log('✅ Claude ответил:', response.content[0]);

    return res.status(200).json({
      success: true,
      message: 'Claude API работает!',
      response: response.content[0],
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('❌ Ошибка Claude API:', error);
    
    return res.status(500).json({
      success: false,
      error: error.message,
      errorType: error.constructor.name,
      status: error.status,
      details: error
    });
  }
}
