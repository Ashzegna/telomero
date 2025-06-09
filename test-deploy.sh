#!/bin/bash

echo "🧪 Добавляем тестовые endpoints для диагностики Claude API..."

cd /Users/alexeyshishkov/Desktop/knvbot/telomero

git add .
git commit -m "🧪 Добавлены тестовые endpoints для диагностики Claude API

- /api/test-config - проверка конфигурации
- /api/test-claude - простой тест Claude API  
- Поможет найти проблему с возвратом 0"

echo "📤 Отправляем тесты..."
git push origin main

echo "✅ Готово! Тестовые endpoints добавлены."
echo ""
echo "🔍 После деплоя проверьте:"
echo "1. https://ваш-сайт.vercel.app/api/test-config"
echo "2. https://ваш-сайт.vercel.app/api/test-claude"
echo "3. Логи в Vercel Dashboard"
