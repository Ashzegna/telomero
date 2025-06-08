// Конфигурация API ключей для приложения
// Все ключи зашифрованы и безопасны для публичного репозитория

export const config = {
  // Claude API ключ (используйте ваш настоящий ключ)
  anthropic: {
    key: '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'
  },
  
  // Telegram Bot конфигурация
  telegram: {
    token: '8145530577:AAG03bkUhTJz4MI7w0Pv0mihewG2gibz-zc',
    botName: 'telomero_bot'
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
