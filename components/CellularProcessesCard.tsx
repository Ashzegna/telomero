'use client';

import React from 'react';
import { Shield, Heart, Dna, Sparkles } from 'lucide-react';
import { getHealthColor, getProcessTextColor } from '@/lib/calculations';

interface CellularEffects {
  oxidativeStress: number;
  inflammation: number;
  telomeraseActivity: number;
  dnaRepair: number;
}

interface CellularProcessesCardProps {
  cellularEffects: CellularEffects;
}

const CellularProcessesCard: React.FC<CellularProcessesCardProps> = ({ cellularEffects }) => {
  const cellularIcons = {
    oxidativeStress: <Shield className="w-4 h-4" />,
    inflammation: <Heart className="w-4 h-4" />,
    telomeraseActivity: <Dna className="w-4 h-4" />,
    dnaRepair: <Sparkles className="w-4 h-4" />
  };

  const cellularNames = {
    oxidativeStress: "Защита от окисления",
    inflammation: "Контроль воспаления", 
    telomeraseActivity: "Активность теломеразы",
    dnaRepair: "Восстановление ДНК"
  };

  const cellularExplanations = {
    oxidativeStress: "(уровень свободных радикалов)",
    inflammation: "(воспалительные процессы в клетках)",
    telomeraseActivity: "(фермент, удлиняющий теломеры)",
    dnaRepair: "(репарация повреждений хромосом)"
  };

  const ProcessBar = ({ 
    effect, 
    value, 
    type 
  }: { 
    effect: keyof CellularEffects; 
    value: number; 
    type: 'higher-better' | 'lower-better' 
  }) => {
    return (
      <div>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-start text-sm text-gray-700 flex-1">
            {cellularIcons[effect]}
            <div className="ml-2 flex-1">
              <div className="font-medium">{cellularNames[effect]}</div>
              <div className="text-xs text-gray-500 mt-1">
                {cellularExplanations[effect]}
              </div>
            </div>
          </div>
          <span className={`text-sm font-semibold ml-2 ${getProcessTextColor(value, type)}`}>
            {Math.round(value)}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-1000 ${getHealthColor(value, type)}`}
            style={{ width: `${value}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="telomere-card">
      <h3 className="font-semibold text-gray-800 mb-4 flex items-center text-sm md:text-base">
        <Sparkles className="w-4 h-4 md:w-5 md:h-5 mr-2" />
        Клеточные процессы
      </h3>
      
      <div className="space-y-4">
        <ProcessBar 
          effect="oxidativeStress"
          value={cellularEffects.oxidativeStress}
          type="lower-better"
        />
        <ProcessBar 
          effect="inflammation"
          value={cellularEffects.inflammation}
          type="lower-better"
        />
        <ProcessBar 
          effect="telomeraseActivity"
          value={cellularEffects.telomeraseActivity}
          type="higher-better"
        />
        <ProcessBar 
          effect="dnaRepair"
          value={cellularEffects.dnaRepair}
          type="higher-better"
        />
      </div>
      
      {/* Explanation */}
      <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <div className="text-xs text-blue-800">
          <strong>💡 Как читать показатели:</strong><br/>
          • <strong>Окисление и воспаление:</strong> чем ниже %, тем лучше<br/>
          • <strong>Теломераза и восстановление ДНК:</strong> чем выше %, тем лучше
        </div>
      </div>
    </div>
  );
};

export default CellularProcessesCard;
