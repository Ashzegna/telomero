'use client';

import React, { useState } from 'react';
import FoodCard from '@/components/FoodCard';
import { showHapticFeedback } from '@/lib/telegram';

const FoodCardDemo = () => {
  const [selectedFoods, setSelectedFoods] = useState<string[]>([]);

  const handleAddFood = (foodName: string) => {
    setSelectedFoods(prev => [...prev, foodName]);
    showHapticFeedback('success');
  };

  // Демо продукты для тестирования
  const demoFoods = [
    {
      name: 'Пончик глазированный',
      telomerePoints: -15,
      calories: 450,
      mechanism: 'Трансжиры и сахар создают воспалительную среду, ускоряющую укорачивание теломер'
    },
    {
      name: 'Черника свежая',
      telomerePoints: 18,
      calories: 57,
      mechanism: 'Антоцианы - мощные защитники теломер от окислительного стресса'
    },
    {
      name: 'Лосось на пару',
      telomerePoints: 22,
      calories: 208,
      weight: 150,
      mechanism: 'Омега-3 кислоты активируют теломеразу и защищают ДНК от повреждений'
    },
    {
      name: 'Рис белый',
      telomerePoints: 0,
      calories: 130,
      mechanism: 'Нейтральное влияние на теломеры, простые углеводы без значительного эффекта'
    },
    {
      name: 'Водка 50мл',
      telomerePoints: -18,
      calories: 115,
      weight: 50,
      mechanism: 'Высокие дозы этанола токсичны для теломер и ускоряют клеточное старение'
    },
    {
      name: 'Авокадо половинка',
      telomerePoints: 10,
      calories: 160,
      weight: 100,
      mechanism: 'Мононенасыщенные жиры снижают воспаление и поддерживают здоровье клеток'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      {/* Заголовок */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-white mb-4 text-glow">
          🎮 FOOD RPG CARDS
        </h1>
        <p className="text-purple-200 text-lg">
          Каждый продукт - это заклинание для твоего здоровья!
        </p>
        <div className="bg-purple-500/20 backdrop-blur-sm rounded-lg p-3 mt-4 max-w-2xl mx-auto">
          <p className="text-purple-100 text-sm">
            ⚡ Нажимайте на карточки чтобы увидеть эффекты! Красные карты = урон, зеленые = исцеление
          </p>
        </div>
      </div>

      {/* Счетчик выбранных продуктов */}
      {selectedFoods.length > 0 && (
        <div className="text-center mb-6">
          <div className="bg-blue-500/20 backdrop-blur-sm rounded-lg p-3 max-w-md mx-auto">
            <h3 className="text-white font-bold mb-2">🛡️ Выбрано заклинаний: {selectedFoods.length}</h3>
            <div className="text-blue-200 text-sm">
              {selectedFoods.join(', ')}
            </div>
            <button 
              onClick={() => setSelectedFoods([])}
              className="mt-2 bg-red-500/50 hover:bg-red-500/70 text-white px-3 py-1 rounded text-xs"
            >
              🗑️ Очистить
            </button>
          </div>
        </div>
      )}

      {/* Сетка карточек */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {demoFoods.map((food, index) => (
          <FoodCard
            key={index}
            name={food.name}
            telomerePoints={food.telomerePoints}
            calories={food.calories}
            weight={food.weight}
            mechanism={food.mechanism}
            onAdd={() => handleAddFood(food.name)}
            showCompensation={food.telomerePoints < 0}
          />
        ))}
      </div>

      {/* Объяснение системы */}
      <div className="mt-12 max-w-4xl mx-auto">
        <div className="bg-black/40 backdrop-blur-sm rounded-xl p-6 border border-purple-500/30">
          <h2 className="text-2xl font-bold text-white mb-4 text-center">
            🧬 Как работает система
          </h2>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div className="bg-red-500/20 rounded-lg p-4">
              <div className="text-3xl mb-2">💀</div>
              <h3 className="text-red-300 font-bold mb-2">УРОН</h3>
              <p className="text-red-200 text-sm">
                Вредные продукты сокращают жизнь. Показана компенсация.
              </p>
            </div>
            <div className="bg-green-500/20 rounded-lg p-4">
              <div className="text-3xl mb-2">🛡️</div>
              <h3 className="text-green-300 font-bold mb-2">ЗАЩИТА</h3>
              <p className="text-green-200 text-sm">
                Полезные продукты продлевают жизнь и защищают клетки.
              </p>
            </div>
            <div className="bg-gray-500/20 rounded-lg p-4">
              <div className="text-3xl mb-2">⚖️</div>
              <h3 className="text-gray-300 font-bold mb-2">НЕЙТРАЛЬНО</h3>
              <p className="text-gray-200 text-sm">
                Продукты без значительного влияния на здоровье.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCardDemo;
