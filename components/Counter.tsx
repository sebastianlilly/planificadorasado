import React, { useState } from 'react';
import { Minus, Plus, User, Users, Baby } from 'lucide-react';

interface CounterProps {
  label: string;
  value: number;
  type: 'men' | 'women' | 'children';
  onChange: (newValue: number) => void;
}

const Counter: React.FC<CounterProps> = ({ label, value, type, onChange }) => {
  const getIcon = () => {
    switch (type) {
      case 'men': return <User className="w-5 h-5 text-secondary" />;
      case 'women': return <Users className="w-5 h-5 text-primary" />;
      case 'children': return <Baby className="w-5 h-5 text-green-600" />;
    }
  };

  const increment = () => onChange(value + 1);
  const decrement = () => onChange(Math.max(0, value - 1));

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-bold text-text-main flex items-center gap-2">
        {getIcon()}
        {label}
      </label>
      <div className="flex items-center justify-between bg-surface-off rounded-lg p-1 border border-gray-200">
        <button
          onClick={decrement}
          className="w-12 h-12 flex items-center justify-center rounded-md bg-white shadow-sm hover:bg-gray-50 text-primary transition-all active:scale-95 disabled:opacity-50"
          disabled={value === 0}
        >
          <Minus size={20} strokeWidth={2.5} />
        </button>
        <span className="text-2xl font-bold w-14 text-center text-text-main tabular-nums">
          {value}
        </span>
        <button
          onClick={increment}
          className="w-12 h-12 flex items-center justify-center rounded-md bg-white shadow-sm hover:bg-gray-50 text-primary transition-all active:scale-95"
        >
          <Plus size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};

export default Counter;