import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Калькулятор здоровья теломер',
  description: 'Telegram Mini App для отслеживания влияния питания на здоровье теломер и продолжительность жизни',
  viewport: 'width=device-width, initial-scale=1, user-scalable=no',
  themeColor: '#3B82F6',
  other: {
    'telegram-web-app': 'true',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className="telegram-bg telegram-text">
        <Script 
          src="https://telegram.org/js/telegram-web-app.js" 
          strategy="beforeInteractive"
        />
        {children}
      </body>
    </html>
  );
}
