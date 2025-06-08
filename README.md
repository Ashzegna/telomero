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

⚠️ **ВАЖНО**: Создайте файл `.env.local` с вашими ключами.

Подробные инструкции смотрите в файле [SETUP.md](./SETUP.md)

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
# ANTHROPIC_API_KEY=your_claude_api_key_here
# TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
```

### 2. Настройка бота в BotFather

1. Перейти к @BotFather в Telegram
2. Отправить `/setmenubutton`
3. Выбрать вашего бота
4. Установить:
   - **Текст кнопки**: `🧬 Калькулятор теломер`
   - **URL**: `https://your-vercel-url.vercel.app`

### 3. Настройка Web App

```bash
# Отправить @BotFather команду:
/newapp

# Выбрать вашего бота
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
1. Открыть вашего бота
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

**Бот**: @your_bot_name  
**Разработчик**: Anonymous  
**Версия**: 1.0.0
