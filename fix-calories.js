// Скрипт для быстрого исправления недостающих calories в foods.ts
const fs = require('fs');

const filePath = '/Users/alexeyshishkov/Desktop/knvbot/telomero/data/foods.ts';
let content = fs.readFileSync(filePath, 'utf8');

// Массив продуктов без calories и их приблизительная калорийность
const missingCalories = [
  // Lunch
  { name: "Пельмени с майонезом", calories: 350 },
  { name: "Пицца пепперони", calories: 280 },
  { name: "Жареная картошка с котлетой", calories: 450 },
  { name: "Шаурма", calories: 300 },
  { name: "Макароны с сосисками", calories: 320 },
  { name: "Роллы в кляре жареные", calories: 250 },
  
  // Dinner
  { name: "Запеченная рыба с овощами", calories: 180 },
  { name: "Тушеные овощи с оливковым маслом", calories: 90 },
  { name: "Салат с авокадо и орехами", calories: 200 },
  { name: "Курица на пару с брокколи", calories: 150 },
  { name: "Омлет с зеленью и помидорами", calories: 160 },
  { name: "Запеченные овощи с киноа", calories: 140 },
  { name: "Суп-пюре из тыквы", calories: 60 },
  { name: "Рис с отварной курицей", calories: 180 },
  { name: "Творог с фруктами", calories: 120 },
  { name: "Колбаса с картошкой", calories: 380 },
  { name: "Жареная свинина с гарниром", calories: 420 },
  { name: "Лапша быстрого приготовления", calories: 450 },
  { name: "Замороженная пицца", calories: 250 },
  { name: "Чебуреки или беляши", calories: 380 },
  
  // Snacks
  { name: "Ягоды (черника, малина)", calories: 45 },
  { name: "Орехи грецкие (30г)", calories: 650 },
  { name: "Миндаль (30г)", calories: 580 },
  { name: "Яблоко зеленое", calories: 52 },
  { name: "Морковные палочки с хумусом", calories: 80 },
  { name: "Зеленый чай", calories: 1 },
  { name: "Темный шоколад (70%+)", calories: 540 },
  { name: "Авокадо половинка", calories: 160 },
  { name: "Йогурт натуральный с ягодами", calories: 90 },
  { name: "Банан", calories: 89 },
  { name: "Хлебцы цельнозерновые", calories: 300 },
  { name: "Чипсы картофельные", calories: 536 },
  { name: "Печенье сахарное", calories: 420 },
  { name: "Конфеты", calories: 380 },
  { name: "Газированная вода сладкая", calories: 42 },
  { name: "Энергетический напиток", calories: 45 },
  { name: "Сухарики с приправами", calories: 330 },
  { name: "Мороженое", calories: 200 },
  
  // Alcohol
  { name: "Красное вино (1 бокал 150мл)", calories: 85 },
  { name: "Белое вино (1 бокал 150мл)", calories: 82 },
  { name: "Пиво светлое (1 банка 330мл)", calories: 150 },
  { name: "Пиво темное (1 банка 330мл)", calories: 160 },
  { name: "Водка (50мл)", calories: 115 },
  { name: "Коньяк (50мл)", calories: 115 },
  { name: "Виски (50мл)", calories: 115 },
  { name: "Коктейль сладкий (Мохито, Дайкири)", calories: 180 },
  { name: "Шампанское (1 бокал 150мл)", calories: 90 },
  { name: "Ликер сладкий (50мл)", calories: 150 }
];

// Функция для добавления calories к продукту
function addCaloriesToProduct(productName, calories) {
  const regex = new RegExp(`(\\{\\s*name:\\s*"${productName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^}]*telomerePoints:\\s*[^,]+,)(?!.*calories)`, 'g');
  content = content.replace(regex, `$1\n      calories: ${calories},`);
}

// Добавляем calories для всех продуктов
missingCalories.forEach(({ name, calories }) => {
  addCaloriesToProduct(name, calories);
});

// Записываем обновленный файл
fs.writeFileSync(filePath, content);
console.log('✅ Calories добавлены во все продукты!');
