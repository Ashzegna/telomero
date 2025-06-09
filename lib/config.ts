// Конфигурация API ключей для приложения
// ВСЕ КЛЮЧИ ХРАНЯТСЯ ТОЛЬКО В ПЕРЕМЕННЫХ ОКРУЖЕНИЯ!
// НЕ ДОБАВЛЯЙТЕ РЕАЛЬНЫЕ КЛЮЧИ В ЭТОТ ФАЙЛ!

export const config = {
  // Claude API - только из environment variables
  anthropic: {
    key: process.env.ANTHROPIC_API_KEY || ''
  },
  
  // Telegram Bot - только из environment variables
  telegram: {
    token: process.env.TELEGRAM_BOT_TOKEN || '',
    botName: process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME || 'telomero_bot'
  },

  // Vercel конфигурация
  vercel: {
    url: process.env.VERCEL_URL || 'localhost:3000'
  }
};

// Функция для получения конфигурации
export const getConfig = () => {
  // Приоритет: переменные окружения, затем встроенная конфигурация
  return {
    anthropicKey: process.env.ANTHROPIC_API_KEY || 
                  process.env.CLAUDE_API_KEY || 
                  config.anthropic.key,
    
    telegramToken: process.env.TELEGRAM_BOT_TOKEN || 
                   process.env.TG_BOT_TOKEN || 
                   config.telegram.token,
    
    botName: process.env.NEXT_PUBLIC_TELEGRAM_BOT_NAME || 
             process.env.BOT_NAME || 
             config.telegram.botName
  };
};
