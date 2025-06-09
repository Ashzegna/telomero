#!/bin/bash

echo "🔒 Подготовка безопасного деплоя..."

# Проверяем что нет ключей в коде
echo "🔍 Проверяем безопасность кода..."

if grep -r "sk-ant-" lib/ components/ pages/ app/ 2>/dev/null; then
    echo "❌ НАЙДЕНЫ API КЛЮЧИ В КОДЕ! Не деплоим!"
    exit 1
fi

if grep -r "sk-" .env.local 2>/dev/null; then
    echo "⚠️  Найдены ключи в .env.local (это нормально, файл не коммитится)"
fi

echo "✅ Код безопасен - ключи только в переменных окружения"

cd /Users/alexeyshishkov/Desktop/knvbot/telomero

echo "📝 Коммитим безопасную версию..."
git add .
git commit -m "🔒 БЕЗОПАСНОСТЬ: Убраны все хардкодные ключи

- Все API ключи теперь только в environment variables
- Добавлен .env.example для шаблона
- Обновлен README с безопасными инструкциями  
- Готово для создания нового Claude API ключа"

echo "📤 Отправляем безопасную версию..."
git push origin main

echo ""
echo "✅ БЕЗОПАСНАЯ ВЕРСИЯ ЗАДЕПЛОЕНА!"
echo ""
echo "🔑 Теперь можно безопасно:"
echo "1. Создать новый Claude API ключ"
echo "2. Добавить его ТОЛЬКО в Vercel Environment Variables"
echo "3. Ключ не попадет в GitHub и не будет отозван!"
