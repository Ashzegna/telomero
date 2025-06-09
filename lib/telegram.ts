import { getConfig } from './config';

// Telegram WebApp utilities
export interface TelegramWebApp {
  ready: () => void;
  expand: () => void;
  close: () => void;
  MainButton: {
    text: string;
    color: string;
    textColor: string;
    isVisible: boolean;
    isActive: boolean;
    isProgressVisible: boolean;
    setText: (text: string) => void;
    onClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
    enable: () => void;
    disable: () => void;
    showProgress: (leaveActive?: boolean) => void;
    hideProgress: () => void;
  };
  BackButton: {
    isVisible: boolean;
    onClick: (callback: () => void) => void;
    show: () => void;
    hide: () => void;
  };
  HapticFeedback: {
    impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
    notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
    selectionChanged: () => void;
  };
  themeParams: {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_bg_color?: string;
  };
  colorScheme: 'light' | 'dark';
  initData: string;
  initDataUnsafe: {
    user?: {
      id: number;
      is_bot: boolean;
      first_name: string;
      last_name?: string;
      username?: string;
      language_code?: string;
      is_premium?: boolean;
    };
    chat_type?: string;
    chat_instance?: string;
    auth_date?: number;
    hash?: string;
  };
  sendData: (data: string) => void;
  showPopup: (params: {
    title?: string;
    message: string;
    buttons?: Array<{
      id?: string;
      type?: 'default' | 'ok' | 'close' | 'cancel' | 'destructive';
      text: string;
    }>;
  }, callback?: (buttonId: string) => void) => void;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: TelegramWebApp;
    };
  }
}

export const useTelegramWebApp = () => {
  if (typeof window === 'undefined') return null;
  
  return window.Telegram?.WebApp || null;
};

export const initTelegramWebApp = () => {
  const tg = useTelegramWebApp();
  
  if (tg) {
    tg.ready();
    tg.expand();
    
    // Apply Telegram theme colors to CSS variables
    if (tg.themeParams) {
      const root = document.documentElement;
      if (tg.themeParams.bg_color) {
        root.style.setProperty('--tg-color-bg', tg.themeParams.bg_color);
      }
      if (tg.themeParams.text_color) {
        root.style.setProperty('--tg-color-text', tg.themeParams.text_color);
      }
      if (tg.themeParams.hint_color) {
        root.style.setProperty('--tg-color-hint', tg.themeParams.hint_color);
      }
      if (tg.themeParams.link_color) {
        root.style.setProperty('--tg-color-link', tg.themeParams.link_color);
      }
      if (tg.themeParams.button_color) {
        root.style.setProperty('--tg-color-button', tg.themeParams.button_color);
      }
      if (tg.themeParams.button_text_color) {
        root.style.setProperty('--tg-color-button-text', tg.themeParams.button_text_color);
      }
      if (tg.themeParams.secondary_bg_color) {
        root.style.setProperty('--tg-color-secondary-bg', tg.themeParams.secondary_bg_color);
      }
    }
    
    return tg;
  }
  
  return null;
};

export const shareResults = (telomereScore: number, lifeDays: number) => {
  const tg = useTelegramWebApp();
  const config = getConfig();
  
  if (tg) {
    const message = `🧬 Мой результат в калькуляторе теломер: ${lifeDays > 0 ? '+' : ''}${lifeDays} дней к жизни!
    
Попробуй и ты: https://t.me/telomero_bot/telomere`;
    
    tg.showPopup({
      title: '📊 Поделиться результатами',
      message: 'Хотите поделиться своими результатами?',
      buttons: [
        { type: 'default', text: 'Поделиться' },
        { type: 'cancel', text: 'Отмена' }
      ]
    }, (buttonId) => {
      if (buttonId === '0') { // First button (Поделиться)
        tg.sendData(JSON.stringify({
          action: 'share',
          message: message,
          score: telomereScore,
          days: lifeDays
        }));
      }
    });
  }
};

export const showHapticFeedback = (type: 'light' | 'medium' | 'heavy' | 'success' | 'error' | 'warning' | 'selection') => {
  const tg = useTelegramWebApp();
  
  if (tg && tg.HapticFeedback) {
    if (type === 'success' || type === 'error' || type === 'warning') {
      tg.HapticFeedback.notificationOccurred(type);
    } else if (type === 'selection') {
      tg.HapticFeedback.selectionChanged();
    } else {
      tg.HapticFeedback.impactOccurred(type);
    }
  }
};
