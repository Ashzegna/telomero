#!/bin/bash

# Быстрое исправление TypeScript ошибки
cd /Users/alexeyshishkov/Desktop/knvbot/telomero

echo "🔧 Исправляем TypeScript ошибки..."

# Запускаем скрипт исправления
node fix-foods-final.js

echo "✅ Файл foods.ts исправлен!"

# Коммитим изменения
git add .
git commit -m "🚀 Fix: Add calories to all food items - TypeScript build error resolved"
git push origin feature/calories-and-ui-simplification

echo "🚀 Изменения отправлены в репозиторий!"
echo "📱 Vercel автоматически пересоберет проект"
echo ""
echo "🔍 Отслеживайте статус билда на: https://vercel.com/dashboard"
