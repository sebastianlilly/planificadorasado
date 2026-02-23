import React from 'react';
import {
  Check,
  Plus,
  Beef,
  Drumstick,
  Bone,
  Wheat,
  Salad,
  Flame,
  Disc,
  Wind,
  Wine,
  CupSoda,
  GlassWater,
  Snowflake,
  Beer
} from 'lucide-react';
import { FoodItem, IconType } from '../types';

interface FoodGridProps {
  items: FoodItem[];
  selectedIds: Set<string>;
  quantities: Record<string, number>;
  onToggle: (id: string) => void;
  onQuantityChange: (id: string, val: number) => void;
  title: string;
  /** Optional subtitle under the title (e.g. "Guarnición más contundente") */
  subtitle?: string;
  categoryColor: string;
  language: 'es' | 'en';
}

const FoodGrid: React.FC<FoodGridProps> = ({
  items,
  selectedIds,
  quantities,
  onToggle,
  onQuantityChange,
  title,
  subtitle,
  categoryColor,
  language
}) => {
  if (items.length === 0) return null;

  const getIcon = (type: IconType, isSelected: boolean) => {
    const props = {
      size: 24,
      strokeWidth: 1.5,
      className: `transition-colors duration-300 ${isSelected ? 'text-white' : 'text-primary'}`
    };

    switch (type) {
      case 'beef':
        return <Beef {...props} />;
      case 'pork':
        return <Bone {...props} className={props.className + ' rotate-45'} />;
      case 'chicken':
        return <Drumstick {...props} />;
      case 'sausage':
        return <Flame {...props} />;
      case 'chorizo':
        return <Flame {...props} />;
      case 'bread':
        return <Wheat {...props} />;
      case 'salad':
        return <Salad {...props} />;
      case 'cheese':
        return <Disc {...props} />;
      case 'fire':
        return <Wind {...props} />;
      case 'wine':
        return <Wine {...props} />;
      case 'soda':
        return <CupSoda {...props} />;
      case 'pisco':
        return <GlassWater {...props} />;
      case 'ice':
        return <Snowflake {...props} />;
      case 'beer':
        return <Beer {...props} />;
      default:
        return <Beef {...props} />;
    }
  };

  const getUnitLabel = (item: FoodItem) => {
    // Translations for units
    const unitMap: Record<string, { es: string; en: string }> = {
      unid: { es: 'unid', en: 'units' },
      bolsas: { es: 'bolsas', en: 'bags' },
      kg: { es: 'kg', en: 'kg' }
    };

    let key: keyof typeof unitMap = 'kg';

    // Drinks & bottles
    if (
      item.category === 'wine' ||
      item.category === 'drink' ||
      item.category === 'pisco' ||
      item.category === 'beer'
    ) {
      key = 'unid';
    }
    // Ice
    else if (item.category === 'ice') {
      key = 'bolsas';
    }
    // Specific unit items
    else if (item.id === 'marraqueta' || item.id === 'provoleta') {
      key = 'unid';
    }
    // ✅ FIX: Ensaladas y Acompañamientos se calculan en kg (según App.tsx)
    else if (item.category === 'ensaladas' || item.category === 'acompanamientos') {
      key = 'kg';
    }
    // Default meat/appetizers as kg
    else if (item.category === 'meat' || item.category === 'appetizer') {
      key = 'kg';
    }

    return unitMap[key][language];
  };

  return (
    <div className="mb-8">
      <div className="mb-4">
        <h2 className="text-xl font-extrabold text-text-main flex items-center gap-2">
          <span className={`w-1.5 h-6 rounded-full ${categoryColor}`}></span>
          {title}
        </h2>

        {/* Optional subtitle under the category title */}
        {subtitle && (
          <p className="text-sm text-text-sub mt-1">
            {subtitle}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
        {items.map((item) => {
          const isSelected = selectedIds.has(item.id);
          const quantity = quantities[item.id] || 0;
          const unitLabel = getUnitLabel(item);

          return (
            <div
              key={item.id}
              onClick={() => onToggle(item.id)}
              className={`group relative bg-white rounded-xl border-2 transition-all cursor-pointer overflow-hidden flex flex-col
                ${isSelected
                  ? 'border-primary shadow-lg scale-[1.01] sm:scale-[1.02]'
                  : 'border-transparent shadow-sm hover:border-gray-200 hover:shadow-md'
                }`}
            >
              <div className="flex flex-row items-center flex-1 min-h-[70px] sm:min-h-[80px]">
                {/* Icon Container - Responsive width */}
                <div
                  className={`self-stretch w-14 sm:w-16 flex-shrink-0 flex items-center justify-center transition-colors duration-300
                  ${isSelected ? 'bg-primary' : 'bg-red-50 group-hover:bg-red-100'}`}
                >
                  {getIcon(item.iconType, isSelected)}
                </div>

                {/* Content */}
                <div className="p-2 sm:p-2.5 flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-bold text-sm leading-tight transition-colors line-clamp-2 ${isSelected ? 'text-primary' : 'text-text-main'
                          }`}
                      >
                        {item.name}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-text-sub mt-0.5 sm:mt-1 leading-snug line-clamp-2">
                        {language === 'en' && item.description_en ? item.description_en : item.description}
                      </p>
                    </div>
                    <div
                      className={`size-5 flex-shrink-0 rounded-full flex items-center justify-center transition-all mt-0.5
                      ${isSelected
                          ? 'bg-primary text-white scale-110'
                          : 'bg-gray-100 text-gray-400 group-hover:text-primary group-hover:bg-red-50'
                        }`}
                    >
                      {isSelected ? <Check size={12} strokeWidth={3} /> : <Plus size={12} strokeWidth={3} />}
                    </div>
                  </div>
                </div>
              </div>

              {/* Input Area */}
              {isSelected && (
                <div
                  className="bg-red-50/50 border-t border-red-100 px-3 py-2 flex items-center justify-between gap-2 animate-in slide-in-from-top-2 duration-200"
                  onClick={(e) => e.stopPropagation()}
                >
                  <label className="text-[10px] font-bold text-text-sub uppercase tracking-wide">
                    {language === 'es' ? 'Cantidad' : 'Quantity'}
                  </label>
                  <div className="flex items-center gap-1 relative">
                    <input
                      type="number"
                      step={unitLabel === 'kg' ? '0.1' : '1'}
                      min="0"
                      value={quantity}
                      onChange={(e) => onQuantityChange(item.id, parseFloat(e.target.value) || 0)}
                      className="w-16 text-right font-bold text-text-main bg-white border border-gray-200 rounded py-1 px-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    />
                    <span className="text-[10px] font-bold text-text-sub w-auto min-w-5">{unitLabel}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FoodGrid;