import { NextApiRequest, NextApiResponse } from 'next';
import { getConfig } from '@/lib/config';

const config = getConfig();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(200).json({ ok: true });
  }

  try {
    const { message } = req.body;
    
    if (message && message.text) {
      const chatId = message.chat.id;
      const text = message.text;

      let responseText = '';
      let replyMarkup = {};

      if (text === '/start') {
        responseText = `🧬 Добро пожаловать в Калькулятор здоровья теломер!

Узнайте, как ваше питание влияет на продолжительность жизни.

👇 Нажмите кнопку ниже, чтобы открыть приложение:`;
        
        replyMarkup = {
          inline_keyboard: [[
            {
              text: "🧬 Открыть калькулятор",
              web_app: { url: `https://${req.headers.host}` }
            }
          ]]
        };
      } 
      else if (text === '/help') {
        responseText = `❓ Помощь по калькулятору теломер:

🧬 **Что такое теломеры?**
Теломеры - это "защитные колпачки" на концах хромосом, которые определяют скорость старения клеток.

🥗 **Как это работает?**
Приложение анализирует ваше питание и показывает, как продукты влияют на здоровье теломер и продолжительность жизни.

📱 **Как пользоваться?**
1. Нажмите кнопку "🧬 Калькулятор теломер" в меню
2. Выберите прием пищи
3. Добавляйте продукты
4. Смотрите результат

💡 **Научная основа:**
Основано на реальных исследованиях влияния питания на теломеры.`;
      }

      if (responseText) {
        await fetch(`https://api.telegram.org/bot${config.telegramToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: responseText,
            parse_mode: 'Markdown',
            reply_markup: replyMarkup
          })
        });
      }
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(200).json({ ok: true });
  }
}
