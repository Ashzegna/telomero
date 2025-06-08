#!/bin/bash

# Скрипт для полной очистки репозитория от секретов

echo "🔒 Удаляем все секреты и создаем чистый репозиторий..."

# 1. Удаляем .env.local полностью
rm -f .env.local

# 2. Удаляем всю git историю
rm -rf .git

# 3. Инициализируем новый репозиторий
git init

# 4. Добавляем все файлы (кроме секретов)
git add .

# 5. Первый чистый коммит
git commit -m "Initial commit: Clean Telegram Mini App without secrets"

# 6. Создайте новый репозиторий на GitHub и выполните:
# git remote add origin https://github.com/ВАШ_USERNAME/НОВОЕ_ИМЯ_РЕПО.git
# git branch -M main  
# git push -u origin main

echo "✅ Готово! Теперь создайте новый репозиторий на GitHub и подключите его."
