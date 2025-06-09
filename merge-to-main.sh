#!/bin/bash

echo "🔄 Merging feature/calories-and-ui-simplification to main..."

# Проверяем текущий статус
echo "📊 Current status:"
git status

# Коммитим все изменения в feature ветке (если есть незакоммиченные)
echo "💾 Saving current changes..."
git add .
git commit -m "Fix TypeScript errors for production build" || echo "No changes to commit"

# Пушим feature ветку
echo "⬆️ Pushing feature branch..."
git push origin feature/calories-and-ui-simplification

# Переключаемся на main
echo "🔄 Switching to main branch..."
git checkout main

# Подтягиваем последние изменения из origin/main
echo "⬇️ Pulling latest main..."
git pull origin main

# Сливаем feature ветку в main
echo "🔀 Merging feature branch into main..."
git merge feature/calories-and-ui-simplification

# Пушим обновленный main
echo "⬆️ Pushing updated main branch..."
git push origin main

echo "✅ Successfully merged to main!"
echo "🚀 Vercel should now automatically deploy from main branch"
echo ""
echo "📱 Check your Telegram miniapp in a few minutes to see the updates!"
echo ""
echo "🔗 You can monitor the deployment at: https://vercel.com/dashboard"
