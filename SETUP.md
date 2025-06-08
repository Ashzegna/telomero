# 🔐 Настройка переменных окружения

Создайте файл `.env.local` в корне проекта со следующим содержимым:

```bash
# Получите API ключ на https://console.anthropic.com/
ANTHROPIC_API_KEY=your_claude_api_key_here

# Токен вашего Telegram бота от @BotFather
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here

# Имя вашего бота (без @)
NEXT_PUBLIC_TELEGRAM_BOT_NAME=your_bot_name
```

## 📝 Как получить ключи:

### 1. Claude API Key:
1. Перейдите на https://console.anthropic.com/
2. Создайте аккаунт или войдите
3. Перейдите в "API Keys"
4. Создайте новый ключ

### 2. Telegram Bot Token:
1. Напишите @BotFather в Telegram
2. Отправьте `/newbot`
3. Следуйте инструкциям
4. Скопируйте токен

## ⚠️ Важно:
- Никогда не коммитьте файл `.env.local` в Git
- Добавьте переменные в Vercel через Dashboard
- Храните ключи в безопасности
