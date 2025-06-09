import { NextApiRequest, NextApiResponse } from 'next';
import { getConfig } from '@/lib/config';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const config = getConfig();
  
  console.log('=== ТЕСТ КОНФИГУРАЦИИ ===');
  console.log('Environment variables:', {
    NODE_ENV: process.env.NODE_ENV,
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY ? 'НАЙДЕН' : 'НЕ НАЙДЕН',
    CLAUDE_API_KEY: process.env.CLAUDE_API_KEY ? 'НАЙДЕН' : 'НЕ НАЙДЕН'
  });
  
  console.log('Config result:', {
    hasAnthropicKey: !!config.anthropicKey,
    keyLength: config.anthropicKey?.length,
    keyStart: config.anthropicKey?.slice(0, 10),
    keyEnd: config.anthropicKey?.slice(-10)
  });

  return res.status(200).json({
    success: true,
    config: {
      hasAnthropicKey: !!config.anthropicKey,
      keyLength: config.anthropicKey?.length,
      keyValid: config.anthropicKey?.startsWith('sk-ant-'),
      environment: process.env.NODE_ENV,
      timestamp: new Date().toISOString()
    }
  });
}
