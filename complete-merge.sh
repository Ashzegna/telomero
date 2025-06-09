#!/bin/bash

echo "🚀 Complete merge and deploy process"
echo "===================================="

# 1. Убеждаемся что мы на feature ветке
echo "1️⃣ Ensuring we're on feature branch..."
git checkout feature/calories-and-ui-simplification

# 2. Коммитим TypeScript исправления
echo "2️⃣ Committing TypeScript fixes..."
git add pages/api/edge-config-test.ts
git commit -m "Fix TypeScript errors in edge-config-test.ts for production build" || echo "No new changes to commit"

# 3. Пушим feature ветку
echo "3️⃣ Pushing feature branch..."
git push origin feature/calories-and-ui-simplification

# 4. Переключаемся на main
echo "4️⃣ Switching to main..."
git checkout main

# 5. Подтягиваем последний main
echo "5️⃣ Pulling latest main..."
git pull origin main

# 6. Сливаем feature ветку
echo "6️⃣ Merging feature branch..."
git merge feature/calories-and-ui-simplification

# 7. Пушим main - это запустит новый деплой
echo "7️⃣ Pushing to main (this will trigger new deployment)..."
git push origin main

echo ""
echo "✅ COMPLETED!"
echo "🔄 Vercel should now start a new deployment from main branch"
echo "⏱️  Wait 2-3 minutes and check your Telegram miniapp"
echo "🔗 Monitor deployment: https://vercel.com/dashboard"

# 8. Показываем последние коммиты в main
echo ""
echo "📋 Latest commits in main:"
git log --oneline -3
