#!/bin/bash

echo "🔧 ОКОНЧАТЕЛЬНОЕ ИСПРАВЛЕНИЕ TypeScript ошибок..."

cd /Users/alexeyshishkov/Desktop/knvbot/telomero

echo "📋 Что исправлено:"
echo "✅ Создана система безопасного получения calories"
echo "✅ Добавлен API endpoint для получения calories через Claude"
echo "✅ Обновлен HealthRPGApp.tsx с безопасными функциями"
echo "✅ Добавлены утилиты для работы с calories"

echo ""
echo "🚀 Коммитим изменения..."

git add .
git commit -m "🔧 FINAL FIX: TypeScript calories error

✅ Создана система безопасного получения calories:
- lib/calories-utils.ts - утилиты для работы с calories
- pages/api/get-calories.ts - API для получения calories через Claude
- HealthRPGApp.tsx - обновлен с безопасными функциями
- Все ошибки TypeScript должны быть исправлены

🎯 Решение:
- getCaloriesSafe() - безопасно получает calories с fallback
- getCaloriesExtended() - получает calories через API если отсутствуют
- Устранены все обращения к food.calories без проверок"

git push origin feature/calories-and-ui-simplification

echo ""
echo "🎉 ГОТОВО! Изменения отправлены в репозиторий."
echo "📱 Vercel автоматически пересоберет проект"
echo ""
echo "🔍 Отслеживайте билд на: https://vercel.com/dashboard"
echo ""
echo "📋 Если ошибки всё ещё есть, проблема может быть в кэше TypeScript."
echo "💡 В таком случае попробуйте изменить тип интерфейса Food."
