# 🔑 ОБНОВЛЕНИЕ API КЛЮЧА CLAUDE

## Проблема:
Текущий ключ возвращает 401 "invalid x-api-key"

## Решение:
1. Создайте новый ключ в https://console.anthropic.com/settings/keys
2. Обновите ключ в коде и Vercel

## Инструкция:

### 1. Получите новый ключ:
- Зайдите в https://console.anthropic.com/
- API Keys → Create Key
- Скопируйте новый ключ

### 2. Обновите в файлах:
- Замените в lib/config.ts
- Замените в .env.local

### 3. Обновите в Vercel:
- Dashboard → Settings → Environment Variables
- Обновите ANTHROPIC_API_KEY

### 4. Редеплой:
```bash
git add .
git commit -m "🔑 Обновлен Claude API ключ"
git push origin main
```

## Текущий (неработающий) ключ:
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

## Новый ключ (вставьте после создания):
[ВСТАВЬТЕ НОВЫЙ КЛЮЧ СЮДА]
