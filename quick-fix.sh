#!/bin/bash

# Быстрое исправление calories в foods.ts
cd /Users/alexeyshishkov/Desktop/knvbot/telomero

# Сделаем backup
cp data/foods.ts data/foods.ts.backup

# Исправим основную ошибку TypeScript - сделаем calories опциональным в интерфейсе
# Уже исправлено выше

# Обновим git и попробуем билд
git add .
git commit -m "🔧 Fix TypeScript calories error - make calories optional in Food interface"
git push origin feature/calories-and-ui-simplification

echo "✅ Исправления отправлены в репозиторий!"
echo "🚀 Теперь Vercel должен собрать проект успешно"
