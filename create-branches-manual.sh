#!/bin/bash

echo "🌿 Создаем ветки вручную..."

cd /Users/alexeyshishkov/Desktop/knvbot/telomero

# Показываем текущее состояние
echo "📍 Текущая ветка:"
git branch

echo "📍 Удаленные ветки:"
git branch -r

# Убеждаемся что мы на main и все сохранено
git checkout main
git add .
git commit -m "✅ Сохраняем перед созданием веток" || echo "Нет изменений для коммита"
git push origin main

echo "1. Создаем ветку stable-v1.0 (бэкап)..."
git checkout -b stable-v1.0
git push origin stable-v1.0
echo "✅ Ветка stable-v1.0 создана и отправлена"

echo "2. Создаем ветку для разработки..."
git checkout main
git checkout -b feature/calories-and-ui-simplification  
git push origin feature/calories-and-ui-simplification
echo "✅ Ветка feature/calories-and-ui-simplification создана и отправлена"

# Возвращаемся на main
git checkout main

echo ""
echo "🎯 ПРОВЕРЯЕМ РЕЗУЛЬТАТ:"
echo "Локальные ветки:"
git branch
echo ""
echo "Удаленные ветки:"
git branch -r
echo ""
echo "✅ Готово! Теперь можете переключиться на ветку разработки:"
echo "git checkout feature/calories-and-ui-simplification"
