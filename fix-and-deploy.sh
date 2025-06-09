#!/bin/bash

echo "🔧 Исправляем TypeScript ошибку и делаем push..."

cd /Users/alexeyshishkov/Desktop/knvbot/telomero

git add .
git commit -m "🔧 Исправлена TypeScript ошибка в analyze-food.ts

- Добавлена правильная типизация для error: any
- Исправлена диагностика Claude API
- Готово к деплою в production"

echo "📤 Отправляем исправления..."
git push origin main

echo "✅ Готово! Исправленный код отправлен."
echo "🚀 Vercel автоматически пересоберет проект"
echo "⏱️ Ожидайте 1-2 минуты для завершения деплоя"
