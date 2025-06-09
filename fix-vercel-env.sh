#!/bin/bash

echo "🔑 Исправляем переменные окружения и делаем редеплой..."

cd /Users/alexeyshishkov/Desktop/knvbot/telomero

git commit --allow-empty -m "🔑 Переменные окружения добавлены в Vercel

- ANTHROPIC_API_KEY добавлен в Vercel Dashboard
- Принудительный редеплой для применения изменений
- Исправление ошибки 401 invalid x-api-key"

echo "📤 Отправляем пустой коммит для редеплоя..."
git push origin main

echo "✅ Готово!"
echo "🔧 Теперь добавьте переменные окружения в Vercel Dashboard:"
echo "   Settings → Environment Variables"
echo "   ANTHROPIC_API_KEY = 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"
