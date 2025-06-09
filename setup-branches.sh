#!/bin/bash

echo "🌿 Создаем ветки для безопасной разработки..."

cd /Users/alexeyshishkov/Desktop/knvbot/telomero

# Убеждаемся что все изменения сохранены
git add .
git commit -m "✅ Стабильная версия: Claude API работает, Telegram интеграция OK

- Полностью рабочая версия калькулятора теломер
- Claude API анализ продуктов функционирует
- Telegram WebApp интеграция настроена
- Безопасное хранение API ключей
- Готово к созданию веток для новых фич"

git push origin main

echo "✅ Текущая версия сохранена в main"

# Создаем ветку для стабильной версии (бэкап)
git checkout -b stable-v1.0
git push origin stable-v1.0

echo "✅ Создана ветка stable-v1.0 (бэкап рабочей версии)"

# Создаем ветку для новых фич (калории + упрощение)
git checkout -b feature/calories-and-ui-simplification
git push origin feature/calories-and-ui-simplification

echo "✅ Создана ветка feature/calories-and-ui-simplification"

# Возвращаемся на main
git checkout main

echo ""
echo "🎯 ГОТОВО! Структура веток:"
echo "📁 main                              - основная ветка (деплой в продакшн)"
echo "📁 stable-v1.0                      - сохраненная рабочая версия"  
echo "📁 feature/calories-and-ui-simplification - новые фичи"
echo ""
echo "🚀 Для разработки:"
echo "git checkout feature/calories-and-ui-simplification"
echo ""
echo "🔄 Для возврата к стабильной версии:"
echo "git checkout stable-v1.0"
echo "git checkout main"
echo "git merge stable-v1.0"
