# 🧬 Telegram Mini App "Калькулятор здоровья теломер"

Telegram Mini App для отслеживания влияния питания на здоровье теломер и продолжительность жизни с научным обоснованием.

## 🎯 Особенности

- **120+ продуктов** с научно обоснованным влиянием на теломеры
- **Claude AI интеграция** для анализа новых продуктов
- **Детальная визуализация** клеточных процессов
- **Telegram WebApp** с нативной интеграцией
- **Мобильная оптимизация** для всех устройств

## 🚀 Установка и запуск

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка переменных окружения

Файл `.env.local` уже создан с:
```
ANTHROPIC_API_KEY=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
TELEGRAM_BOT_TOKEN=8145530577:AAG03bkUhTJz4MI7w0Pv0mihewG2gibz-zc
NEXT_PUBLIC_TELEGRAM_BOT_NAME=telomero_bot
```

### 3. Запуск локально

```bash
npm run dev
```

Приложение будет доступно на http://localhost:3000

## 📱 Деплой в Telegram

### 1. Деплой на Vercel

```bash
# Установить Vercel CLI
npm i -g vercel

# Деплой
vercel

# Настроить переменные окружения в Vercel Dashboard:
# ANTHROPIC_API_KEY
# TELEGRAM_BOT_TOKEN
```

### 2. Настройка бота в BotFather

1. Перейти к @BotFather в Telegram
2. Отправить `/setmenubutton`
3. Выбрать бота @telomero_bot
4. Установить:
   - **Текст кнопки**: `🧬 Калькулятор теломер`
   - **URL**: `https://your-vercel-url.vercel.app`

### 3. Настройка Web App

```bash
# Отправить @BotFather команду:
/newapp

# Выбрать бота: @telomero_bot
# Название: Калькулятор здоровья теломер
# Описание: Узнайте, как ваше питание влияет на продолжительность жизни
# Фото: Загрузить иконку приложения
# Web App URL: https://your-vercel-url.vercel.app
```

## 🛠 Технологический стек

- **Frontend**: Next.js 14 + TypeScript + React
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Telegram**: @twa-dev/sdk
- **AI**: Claude API (Anthropic)
- **Deployment**: Vercel

## 📊 Структура проекта

```
telomero/
├── app/                    # Next.js App Router
│   ├── globals.css        # Глобальные стили
│   ├── layout.tsx         # Layout приложения
│   └── page.tsx           # Главная страница
├── components/            # React компоненты
│   ├── TelomereCalculator.tsx
│   ├── CellularProcessesCard.tsx
│   └── LongTermEffectCard.tsx
├── data/                  # База данных продуктов
│   └── foods.ts
├── lib/                   # Утилиты
│   ├── telegram.ts        # Telegram WebApp SDK
│   └── calculations.ts    # Расчеты здоровья
├── pages/api/             # API Routes
│   └── analyze-food.ts    # Claude API интеграция
└── vercel.json           # Конфигурация Vercel
```

## 🔧 API Endpoints

### POST /api/analyze-food
Анализирует продукт через Claude AI и возвращает влияние на теломеры.

**Запрос:**
```json
{
  "foodName": "Название продукта"
}
```

**Ответ:**
```json
{
  "name": "Название продукта",
  "telomerePoints": 15,
  "category": "protective",
  "mechanism": "Научное объяснение",
  "effects": {
    "oxidativeStress": -12,
    "inflammation": -8,
    "telomeraseActivity": 10,
    "dnaRepair": 8
  },
  "isCustom": true
}
```

## 📱 Telegram Integration

Приложение полностью интегрировано с Telegram WebApp:

- **Автоматическая адаптация темы** под Telegram
- **Haptic Feedback** для лучшего UX
- **Кнопка "Поделиться"** результатами
- **Нативное поведение** кнопок и интерфейса

## 🧪 Тестирование

Для тестирования в браузере без Telegram:
1. Открыть http://localhost:3000
2. Функционал будет работать без Telegram API

Для тестирования в Telegram:
1. Открыть бота @telomero_bot
2. Нажать кнопку меню или отправить `/start`

## 🔄 Обновление

```bash
# Обновить код
git add .
git commit -m "Update app"
git push

# Автоматически деплоится на Vercel
```

## 📝 Лицензия

MIT License - см. файл LICENSE

## 🤝 Поддержка

Для вопросов и предложений создавайте Issues в репозитории.

---

**Бот**: @telomero_bot  
**Разработчик**: Алексей Шишков  
**Версия**: 1.0.0
