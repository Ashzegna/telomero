'use client';

import React from 'react';
import { TrendingUp } from 'lucide-react';
import { formatLifeDays, getProcessTextColor } from '@/lib/calculations';

interface LongTermEffectCardProps {
  telomereScore: number;
  lifeDays: number;
}

const LongTermEffectCard: React.FC<LongTermEffectCardProps> = ({ telomereScore, lifeDays }) => {
  return (
    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 md:p-6 border border-green-200">
      <h4 className="font-semibold text-gray-800 mb-3 flex items-center text-sm md:text-base">
        <TrendingUp className="w-4 h-4 md:w-5 md:h-5 mr-2" />
        📈 Долгосрочный эффект
      </h4>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">За месяц:</span>
          <span className={`font-bold ${getProcessTextColor(telomereScore * 30, 'higher-better')}`}>
            {formatLifeDays(lifeDays * 30)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">За год:</span>
          <span className={`font-bold ${getProcessTextColor(telomereScore * 365, 'higher-better')}`}>
            {formatLifeDays(lifeDays * 365)}
          </span>
        </div>
        <div className="text-xs text-gray-500 mt-2 italic">
          * При регулярном следовании такому рациону
        </div>
      </div>
    </div>
  );
};

export default LongTermEffectCard;
