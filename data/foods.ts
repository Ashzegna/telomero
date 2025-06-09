// Полная база продуктов с научным обоснованием влияния на теломеры
export interface Food {
  name: string;
  telomerePoints: number; // -25 до +25
  calories?: number; // ккал на 100г (опциональное поле)
  category: 'protective' | 'neutral' | 'damaging' | 'alcohol';
  mechanism: string; // научное объяснение
  effects: {
    oxidativeStress: number; // -25 до +25 (меньше = лучше)
    inflammation: number; // -25 до +25 (меньше = лучше) 
    telomeraseActivity: number; // -25 до +25 (больше = лучше)
    dnaRepair: number; // -25 до +25 (больше = лучше)
  };
  isCustom?: boolean;
}

export const telomereFoodsDatabase = {
  breakfast: [
    {
      name: "Овсянка с ягодами",
      telomerePoints: 15,
      calories: 68,
      category: "protective",
      mechanism: "Антиоксиданты защищают теломеры от свободных радикалов",
      effects: { oxidativeStress: -12, inflammation: -8, telomeraseActivity: 10, dnaRepair: 8 }
    },
    {
      name: "Яичница с овощами",
      telomerePoints: 12,
      calories: 154,
      category: "protective", 
      mechanism: "Витамин E и каротиноиды поддерживают длину теломер",
      effects: { oxidativeStress: -8, inflammation: -6, telomeraseActivity: 6, dnaRepair: 10 }
    },
    {
      name: "Творог с орехами",
      telomerePoints: 14,
      calories: 159,
      category: "protective",
      mechanism: "Омега-3 и белки способствуют активности теломеразы", 
      effects: { oxidativeStress: -6, inflammation: -10, telomeraseActivity: 12, dnaRepair: 8 }
    },
    {
      name: "Греческий йогурт с медом",
      telomerePoints: 10,
      calories: 130,
      category: "protective",
      mechanism: "Пробиотики снижают воспаление, мед содержит антиоксиданты",
      effects: { oxidativeStress: -5, inflammation: -12, telomeraseActivity: 6, dnaRepair: 6 }
    },
    {
      name: "Авокадо-тост цельнозерновой",
      telomerePoints: 13,
      calories: 190,
      category: "protective",
      mechanism: "Мононенасыщенные жиры снижают воспаление клеток",
      effects: { oxidativeStress: -8, inflammation: -12, telomeraseActivity: 8, dnaRepair: 6 }
    },
    {
      name: "Смузи с зеленью и фруктами",
      telomerePoints: 16,
      calories: 85,
      category: "protective", 
      mechanism: "Концентрация антиоксидантов и фолатов для защиты ДНК",
      effects: { oxidativeStress: -15, inflammation: -10, telomeraseActivity: 8, dnaRepair: 12 }
    },
    {
      name: "Мюсли с орехами и ягодами",
      telomerePoints: 14,
      calories: 450,
      category: "protective",
      mechanism: "Клетчатка и антиоксиданты поддерживают клеточное здоровье",
      effects: { oxidativeStress: -10, inflammation: -8, telomeraseActivity: 8, dnaRepair: 10 }
    },
    {
      name: "Омлет со шпинатом",
      telomerePoints: 11,
      calories: 180,
      category: "protective",
      mechanism: "Фолиевая кислота и лютеин защищают от повреждений ДНК",
      effects: { oxidativeStress: -8, inflammation: -6, telomeraseActivity: 6, dnaRepair: 8 }
    },
    // Нейтральные завтраки
    {
      name: "Каша рисовая на воде",
      telomerePoints: 3,
      calories: 89,
      category: "neutral",
      mechanism: "Простые углеводы без значительного влияния на теломеры",
      effects: { oxidativeStress: 0, inflammation: 2, telomeraseActivity: 2, dnaRepair: 0 }
    },
    {
      name: "Кофе черный без сахара",
      telomerePoints: 5,
      calories: 2,
      category: "neutral",
      mechanism: "Антиоксиданты кофе умеренно защищают теломеры",
      effects: { oxidativeStress: -4, inflammation: -2, telomeraseActivity: 2, dnaRepair: 4 }
    },
    {
      name: "Чай зеленый",
      telomerePoints: 8,
      calories: 1,
      category: "protective",
      mechanism: "EGCG активирует теломеразу и защищает от окисления",
      effects: { oxidativeStress: -8, inflammation: -6, telomeraseActivity: 8, dnaRepair: 6 }
    },
    // Вредные завтраки
    {
      name: "Белый хлеб с маслом",
      telomerePoints: -8,
      calories: 280,
      category: "damaging",
      mechanism: "Рафинированные углеводы ускоряют укорачивание теломер",
      effects: { oxidativeStress: 10, inflammation: 8, telomeraseActivity: -6, dnaRepair: -4 }
    },
    {
      name: "Сладкие хлопья с молоком",
      telomerePoints: -12,
      calories: 320,
      category: "damaging",
      mechanism: "Избыток сахара усиливает оксидативный стресс",
      effects: { oxidativeStress: 15, inflammation: 12, telomeraseActivity: -8, dnaRepair: -6 }
    },
    {
      name: "Круассан с джемом",
      telomerePoints: -10,
      calories: 350,
      category: "damaging",
      mechanism: "Трансжиры и сахар повреждают клеточные мембраны",
      effects: { oxidativeStress: 12, inflammation: 10, telomeraseActivity: -6, dnaRepair: -8 }
    },
    {
      name: "Бутерброд с колбасой",
      telomerePoints: -14,
      calories: 290,
      category: "damaging",
      mechanism: "Нитраты в колбасе повреждают ДНК и ускоряют старение",
      effects: { oxidativeStress: 16, inflammation: 14, telomeraseActivity: -10, dnaRepair: -8 }
    },
    {
      name: "Кофе с сахаром и сливками",
      telomerePoints: -6,
      calories: 150,
      category: "damaging",
      mechanism: "Добавленный сахар нивелирует пользу антиоксидантов",
      effects: { oxidativeStress: 8, inflammation: 6, telomeraseActivity: -4, dnaRepair: -2 }
    },
    {
      name: "Пончик или булочка",
      telomerePoints: -15,
      calories: 400,
      category: "damaging",
      mechanism: "Трансжиры и сахар создают воспалительную среду",
      effects: { oxidativeStress: 18, inflammation: 15, telomeraseActivity: -8, dnaRepair: -10 }
    }
  ],

  lunch: [
    // Полезные обеды
    {
      name: "Салат с жирной рыбой",
      telomerePoints: 20,
      calories: 250,
      category: "protective",
      mechanism: "Омега-3 кислоты активируют теломеразу и защищают ДНК",
      effects: { oxidativeStress: -15, inflammation: -18, telomeraseActivity: 20, dnaRepair: 15 }
    },
    {
      name: "Лосось на пару с овощами",
      telomerePoints: 22,
      calories: 200,
      category: "protective",
      mechanism: "Максимальная концентрация омега-3 и антиоксидантов",
      effects: { oxidativeStress: -18, inflammation: -20, telomeraseActivity: 22, dnaRepair: 18 }
    },
    {
      name: "Салат с авокадо и киноа",
      telomerePoints: 16,
      calories: 180,
      category: "protective",
      mechanism: "Полноценные аминокислоты и здоровые жиры для клеток",
      effects: { oxidativeStress: -12, inflammation: -14, telomeraseActivity: 10, dnaRepair: 12 }
    },
    {
      name: "Суп из чечевицы с овощами",
      telomerePoints: 13,
      calories: 120,
      category: "protective",
      mechanism: "Растительный белок и фолаты поддерживают репарацию ДНК",
      effects: { oxidativeStress: -8, inflammation: -10, telomeraseActivity: 8, dnaRepair: 12 }
    },
    {
      name: "Гречка с курицей",
      telomerePoints: 11,
      calories: 160,
      category: "protective",
      mechanism: "Рутин в гречке и белки поддерживают клеточное здоровье",
      effects: { oxidativeStress: -6, inflammation: -8, telomeraseActivity: 6, dnaRepair: 8 }
    },
    {
      name: "Овощное рагу с бобовыми",
      telomerePoints: 14,
      calories: 95,
      category: "protective",
      mechanism: "Фитонутриенты овощей поддерживают целостность теломер",
      effects: { oxidativeStress: -12, inflammation: -10, telomeraseActivity: 8, dnaRepair: 12 }
    },
    {
      name: "Борщ без мяса со сметаной",
      telomerePoints: 8,
      calories: 80,
      category: "protective",
      mechanism: "Свекла содержит беталаины - мощные антиоксиданты",
      effects: { oxidativeStress: -8, inflammation: -6, telomeraseActivity: 4, dnaRepair: 6 }
    },
    {
      name: "Салат Цезарь с курицей",
      telomerePoints: 5,
      calories: 220,
      category: "neutral",
      mechanism: "Белок полезен, но соус и сухарики добавляют воспаление",
      effects: { oxidativeStress: 2, inflammation: 4, telomeraseActivity: 4, dnaRepair: 2 }
    },
    {
      name: "Суши с лососем",
      telomerePoints: 12,
      calories: 150,
      category: "protective",
      mechanism: "Омега-3 из рыбы, но белый рис снижает пользу",
      effects: { oxidativeStress: -8, inflammation: -10, telomeraseActivity: 12, dnaRepair: 8 }
    },
    // Вредные обеды
    {
      name: "Бургер с картошкой фри",
      telomerePoints: -18,
      calories: 650,
      category: "damaging",
      mechanism: "Трансжиры и избыток калорий ускоряют старение теломер",
      effects: { oxidativeStress: 20, inflammation: 22, telomeraseActivity: -15, dnaRepair: -12 }
    },
    {
      name: "Пельмени с майонезом",
      telomerePoints: -14,
      calories: 350,
      category: "damaging",
      mechanism: "Обработанное мясо содержит вещества, повреждающие ДНК",
      effects: { oxidativeStress: 15, inflammation: 18, telomeraseActivity: -10, dnaRepair: -8 }
    },
    {
      name: "Пицца пепперони",
      telomerePoints: -16,
      calories: 280,
      category: "damaging",
      mechanism: "Нитраты, трансжиры и избыток натрия повреждают клетки",
      effects: { oxidativeStress: 18, inflammation: 20, telomeraseActivity: -12, dnaRepair: -10 }
    },
    {
      name: "Жареная картошка с котлетой",
      telomerePoints: -12,
      calories: 450,
      category: "damaging",
      mechanism: "Акриламид при жарке повреждает клеточные структуры",
      effects: { oxidativeStress: 12, inflammation: 15, telomeraseActivity: -8, dnaRepair: -6 }
    },
    {
      name: "Шаурма",
      telomerePoints: -13,
      calories: 300,
      category: "damaging",
      mechanism: "Обработанное мясо и соусы создают воспалительную среду",
      effects: { oxidativeStress: 14, inflammation: 16, telomeraseActivity: -8, dnaRepair: -10 }
    },
    {
      name: "Макароны с сосисками",
      telomerePoints: -15,
      calories: 320,
      category: "damaging",
      mechanism: "Нитраты и рафинированные углеводы ускоряют старение",
      effects: { oxidativeStress: 16, inflammation: 18, telomeraseActivity: -10, dnaRepair: -8 }
    },
    {
      name: "Роллы в кляре жареные",
      telomerePoints: -10,
      calories: 250,
      category: "damaging",
      mechanism: "Жарка в масле создает вредные соединения",
      effects: { oxidativeStress: 12, inflammation: 10, telomeraseActivity: -6, dnaRepair: -8 }
    }
  ],

  dinner: [
    // Полезные ужины
    {
      name: "Запеченная рыба с овощами",
      telomerePoints: 22,
      category: "protective",
      mechanism: "Максимальная защита теломер: омега-3 + антиоксиданты",
      effects: { oxidativeStress: -18, inflammation: -20, telomeraseActivity: 22, dnaRepair: 18 }
    },
    {
      name: "Тушеные овощи с оливковым маслом",
      telomerePoints: 13,
      category: "protective",
      mechanism: "Множественные антиоксиданты снижают клеточное воспаление",
      effects: { oxidativeStress: -10, inflammation: -12, telomeraseActivity: 8, dnaRepair: 10 }
    },
    {
      name: "Салат с авокадо и орехами",
      telomerePoints: 16,
      category: "protective",
      mechanism: "Витамин E и фолаты поддерживают стабильность теломер",
      effects: { oxidativeStress: -12, inflammation: -15, telomeraseActivity: 10, dnaRepair: 12 }
    },
    {
      name: "Курица на пару с брокколи",
      telomerePoints: 11,
      category: "protective",
      mechanism: "Сульфорафан в брокколи активирует защитные механизмы",
      effects: { oxidativeStress: -8, inflammation: -10, telomeraseActivity: 6, dnaRepair: 10 }
    },
    {
      name: "Омлет с зеленью и помидорами",
      telomerePoints: 9,
      category: "protective",
      mechanism: "Ликопин и фолаты защищают от повреждений ДНК",
      effects: { oxidativeStress: -6, inflammation: -8, telomeraseActivity: 6, dnaRepair: 8 }
    },
    {
      name: "Запеченные овощи с киноа",
      telomerePoints: 15,
      category: "protective",
      mechanism: "Полноценный белок и антиоксиданты для восстановления клеток",
      effects: { oxidativeStress: -12, inflammation: -10, telomeraseActivity: 8, dnaRepair: 12 }
    },
    {
      name: "Суп-пюре из тыквы",
      telomerePoints: 10,
      category: "protective",
      mechanism: "Бета-каротин защищает клеточные мембраны от окисления",
      effects: { oxidativeStress: -8, inflammation: -6, telomeraseActivity: 6, dnaRepair: 6 }
    },
    // Нейтральные ужины
    {
      name: "Рис с отварной курицей",
      telomerePoints: 4,
      category: "neutral",
      mechanism: "Белок полезен, но белый рис имеет высокий гликемический индекс",
      effects: { oxidativeStress: 2, inflammation: 4, telomeraseActivity: 4, dnaRepair: 2 }
    },
    {
      name: "Творог с фруктами",
      telomerePoints: 8,
      category: "protective",
      mechanism: "Белок и антиоксиданты фруктов поддерживают клетки",
      effects: { oxidativeStress: -4, inflammation: -6, telomeraseActivity: 6, dnaRepair: 4 }
    },
    // Вредные ужины
    {
      name: "Колбаса с картошкой",
      telomerePoints: -16,
      category: "damaging",
      mechanism: "Нитраты и избыток натрия повреждают клеточные мембраны",
      effects: { oxidativeStress: 18, inflammation: 20, telomeraseActivity: -12, dnaRepair: -10 }
    },
    {
      name: "Жареная свинина с гарниром",
      telomerePoints: -13,
      category: "damaging",
      mechanism: "Насыщенные жиры и продукты жарки создают воспаление",
      effects: { oxidativeStress: 15, inflammation: 16, telomeraseActivity: -8, dnaRepair: -10 }
    },
    {
      name: "Лапша быстрого приготовления",
      telomerePoints: -13,
      category: "damaging",
      mechanism: "Консерванты и избыток натрия нарушают клеточный баланс",
      effects: { oxidativeStress: 15, inflammation: 16, telomeraseActivity: -8, dnaRepair: -6 }
    },
    {
      name: "Замороженная пицца",
      telomerePoints: -12,
      category: "damaging",
      mechanism: "Консерванты, трансжиры и избыток соли вредят клеткам",
      effects: { oxidativeStress: 14, inflammation: 15, telomeraseActivity: -8, dnaRepair: -6 }
    },
    {
      name: "Чебуреки или беляши",
      telomerePoints: -14,
      category: "damaging",
      mechanism: "Жарка в масле создает канцерогенные соединения",
      effects: { oxidativeStress: 16, inflammation: 18, telomeraseActivity: -10, dnaRepair: -8 }
    }
  ],

  snacks: [
    // Полезные перекусы
    {
      name: "Ягоды (черника, малина)",
      telomerePoints: 18,
      category: "protective",
      mechanism: "Антоцианы - мощные защитники теломер от окисления",
      effects: { oxidativeStress: -20, inflammation: -15, telomeraseActivity: 12, dnaRepair: 15 }
    },
    {
      name: "Орехи грецкие (30г)",
      telomerePoints: 14,
      category: "protective",
      mechanism: "Витамин E и омега-3 поддерживают длину теломер",
      effects: { oxidativeStress: -12, inflammation: -10, telomeraseActivity: 15, dnaRepair: 10 }
    },
    {
      name: "Миндаль (30г)",
      telomerePoints: 12,
      category: "protective",
      mechanism: "Витамин E защищает клеточные мембраны от окисления",
      effects: { oxidativeStress: -10, inflammation: -8, telomeraseActivity: 8, dnaRepair: 8 }
    },
    {
      name: "Яблоко зеленое",
      telomerePoints: 6,
      category: "protective",
      mechanism: "Кверцетин и клетчатка поддерживают клеточное здоровье",
      effects: { oxidativeStress: -6, inflammation: -4, telomeraseActivity: 4, dnaRepair: 6 }
    },
    {
      name: "Морковные палочки с хумусом",
      telomerePoints: 8,
      category: "protective",
      mechanism: "Бета-каротин и растительный белок защищают клетки",
      effects: { oxidativeStress: -6, inflammation: -8, telomeraseActivity: 4, dnaRepair: 6 }
    },
    {
      name: "Зеленый чай",
      telomerePoints: 8,
      category: "protective",
      mechanism: "EGCG активирует теломеразу и защищает от окисления",
      effects: { oxidativeStress: -8, inflammation: -6, telomeraseActivity: 8, dnaRepair: 6 }
    },
    {
      name: "Темный шоколад (70%+)",
      telomerePoints: 6,
      category: "protective",
      mechanism: "Флавоноиды какао защищают сердечно-сосудистую систему",
      effects: { oxidativeStress: -6, inflammation: -4, telomeraseActivity: 4, dnaRepair: 4 }
    },
    {
      name: "Авокадо половинка",
      telomerePoints: 10,
      category: "protective",
      mechanism: "Мононенасыщенные жиры снижают воспаление",
      effects: { oxidativeStress: -6, inflammation: -10, telomeraseActivity: 6, dnaRepair: 8 }
    },
    {
      name: "Йогурт натуральный с ягодами",
      telomerePoints: 9,
      category: "protective",
      mechanism: "Пробиотики и антиоксиданты поддерживают иммунитет",
      effects: { oxidativeStress: -6, inflammation: -10, telomeraseActivity: 6, dnaRepair: 6 }
    },
    // Нейтральные перекусы
    {
      name: "Банан",
      telomerePoints: 4,
      category: "neutral",
      mechanism: "Калий полезен, но высокое содержание сахара",
      effects: { oxidativeStress: 2, inflammation: 0, telomeraseActivity: 2, dnaRepair: 2 }
    },
    {
      name: "Хлебцы цельнозерновые",
      telomerePoints: 3,
      category: "neutral",
      mechanism: "Клетчатка полезна, но обработка снижает питательность",
      effects: { oxidativeStress: 0, inflammation: 2, telomeraseActivity: 2, dnaRepair: 0 }
    },
    // Вредные перекусы
    {
      name: "Чипсы картофельные",
      telomerePoints: -15,
      category: "damaging",
      mechanism: "Трансжиры и акриламид ускоряют укорачивание теломер",
      effects: { oxidativeStress: 18, inflammation: 15, telomeraseActivity: -12, dnaRepair: -8 }
    },
    {
      name: "Печенье сахарное",
      telomerePoints: -8,
      category: "damaging",
      mechanism: "Трансжиры и сахар создают воспалительную среду",
      effects: { oxidativeStress: 10, inflammation: 8, telomeraseActivity: -6, dnaRepair: -4 }
    },
    {
      name: "Конфеты",
      telomerePoints: -12,
      category: "damaging",
      mechanism: "Сахар и искусственные добавки усиливают воспаление",
      effects: { oxidativeStress: 15, inflammation: 14, telomeraseActivity: -8, dnaRepair: -6 }
    },
    {
      name: "Газированная вода сладкая",
      telomerePoints: -16,
      category: "damaging",
      mechanism: "Избыток сахара запускает гликацию и повреждает ДНК",
      effects: { oxidativeStress: 20, inflammation: 18, telomeraseActivity: -10, dnaRepair: -12 }
    },
    {
      name: "Энергетический напиток",
      telomerePoints: -18,
      category: "damaging",
      mechanism: "Кофеин + сахар + химические добавки токсичны для клеток",
      effects: { oxidativeStress: 22, inflammation: 20, telomeraseActivity: -15, dnaRepair: -18 }
    },
    {
      name: "Сухарики с приправами",
      telomerePoints: -10,
      category: "damaging",
      mechanism: "Избыток натрия и химические усилители вкуса",
      effects: { oxidativeStress: 12, inflammation: 10, telomeraseActivity: -6, dnaRepair: -6 }
    },
    {
      name: "Мороженое",
      telomerePoints: -6,
      category: "damaging",
      mechanism: "Сахар и насыщенные жиры умеренно вредят клеткам",
      effects: { oxidativeStress: 8, inflammation: 6, telomeraseActivity: -4, dnaRepair: -2 }
    }
  ],

  alcohol: [
    {
      name: "Красное вино (1 бокал 150мл)",
      telomerePoints: -5,
      category: "alcohol",
      mechanism: "Ресвератрол vs алкогольное повреждение ДНК - минимальный вред",
      effects: { oxidativeStress: 2, inflammation: -2, telomeraseActivity: -4, dnaRepair: -3 }
    },
    {
      name: "Белое вино (1 бокал 150мл)",
      telomerePoints: -7,
      category: "alcohol",
      mechanism: "Меньше антиоксидантов чем в красном, больше вреда",
      effects: { oxidativeStress: 6, inflammation: 4, telomeraseActivity: -6, dnaRepair: -4 }
    },
    {
      name: "Пиво светлое (1 банка 330мл)",
      telomerePoints: -10,
      category: "alcohol",
      mechanism: "Алкоголь нарушает репарацию ДНК и ускоряет старение",
      effects: { oxidativeStress: 8, inflammation: 6, telomeraseActivity: -8, dnaRepair: -6 }
    },
    {
      name: "Пиво темное (1 банка 330мл)",
      telomerePoints: -8,
      category: "alcohol",
      mechanism: "Больше антиоксидантов чем в светлом, но все равно вредно",
      effects: { oxidativeStress: 6, inflammation: 4, telomeraseActivity: -6, dnaRepair: -4 }
    },
    {
      name: "Водка (50мл)",
      telomerePoints: -18,
      category: "alcohol",
      mechanism: "Высокие дозы этанола токсичны для теломер",
      effects: { oxidativeStress: 20, inflammation: 15, telomeraseActivity: -15, dnaRepair: -18 }
    },
    {
      name: "Коньяк (50мл)",
      telomerePoints: -16,
      category: "alcohol",
      mechanism: "Антиоксиданты от выдержки частично снижают вред",
      effects: { oxidativeStress: 18, inflammation: 12, telomeraseActivity: -12, dnaRepair: -15 }
    },
    {
      name: "Виски (50мл)",
      telomerePoints: -17,
      category: "alcohol",
      mechanism: "Высокая концентрация алкоголя повреждает клетки",
      effects: { oxidativeStress: 20, inflammation: 14, telomeraseActivity: -14, dnaRepair: -16 }
    },
    {
      name: "Коктейль сладкий (Мохито, Дайкири)",
      telomerePoints: -22,
      category: "alcohol",
      mechanism: "Алкоголь + сахар = двойной удар по клеточному здоровью",
      effects: { oxidativeStress: 25, inflammation: 20, telomeraseActivity: -18, dnaRepair: -20 }
    },
    {
      name: "Шампанское (1 бокал 150мл)",
      telomerePoints: -6,
      category: "alcohol",
      mechanism: "Умеренная концентрация алкоголя, быстрое выведение",
      effects: { oxidativeStress: 4, inflammation: 2, telomeraseActivity: -4, dnaRepair: -6 }
    },
    {
      name: "Ликер сладкий (50мл)",
      telomerePoints: -20,
      category: "alcohol",
      mechanism: "Концентрированный алкоголь + большое количество сахара",
      effects: { oxidativeStress: 22, inflammation: 18, telomeraseActivity: -16, dnaRepair: -18 }
    }
  ]
} as const;
