# 🌿 СТРАТЕГИЯ ВЕТОК ДЛЯ TELOMERO

## Структура веток:

### 📁 `main` (Production)
- **Автодеплой в Vercel** ✅
- Только стабильные, протестированные версии
- То что видят пользователи Telegram бота

### 📁 `stable-v1.0` (Backup)
- Сохраненная рабочая версия с теломерами
- Бэкап на случай если что-то пойдет не так
- Можно быстро вернуться к рабочему состоянию

### 📁 `feature/calories-and-ui-simplification` (Development)
- Разработка новых фич: подсчет калорий + упрощение UI
- Эксперименты и тестирование
- **НЕ деплоится автоматически**

## Workflow разработки:

### Создание новых фич:
```bash
# Переключиться на ветку разработки
git checkout feature/calories-and-ui-simplification

# Разрабатывать и коммитить
git add .
git commit -m "Добавил подсчет калорий"
git push origin feature/calories-and-ui-simplification
```

### Тестирование:
```bash
# Preview деплой в Vercel для тестирования
# Vercel автоматически создаст preview URL для ветки
```

### Релиз в продакшн:
```bash
# Когда все готово - мержим в main
git checkout main
git merge feature/calories-and-ui-simplification
git push origin main
# Автоматический деплой в продакшн
```

### Откат к стабильной версии:
```bash
git checkout main
git reset --hard stable-v1.0
git push origin main --force
# Мгновенно вернется рабочая версия
```

## Настройки Vercel:
- **Production Branch**: `main` только
- **Preview Branches**: все остальные ветки
- Один домен, разные версии для тестирования
