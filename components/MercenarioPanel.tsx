import React, { useEffect, useState } from 'react';
import { X, Wine, Flame, Hammer, Shield } from 'lucide-react';
import type { MercenarioProfile } from '../mercenarioProfile';

interface MercenarioPanelProps {
  data: MercenarioProfile;
  language: 'es' | 'en';
}

const iconMap = {
  maridaje: Wine,
  consejo: Flame,
  herramienta: Hammer,
} as const;

const cardOrder: Array<'maridaje' | 'consejo' | 'herramienta'> = [
  'maridaje',
  'consejo',
  'herramienta',
];

export default function MercenarioPanel({ data, language }: MercenarioPanelProps) {
  const [showMedal, setShowMedal] = useState(true);

  useEffect(() => {
    setShowMedal(true);
  }, [data.perfil.value]);

  const intro =
    language === 'es'
      ? 'No eres un simple parrillero de domingo. Aquí tienes una lectura táctica para mejorar tu asado.'
      : 'You are not just a casual Sunday griller. Here is a tactical readout to improve your BBQ.';

  return (
    <section className="relative mt-6 rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <p className="mb-2 inline-flex rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-zinc-700">
          {language === 'es' ? 'Lectura del Mercenario' : 'Mercenary Readout'}
        </p>
        <h3 className="text-2xl font-black tracking-tight text-text-main">
          {language === 'es' ? 'Tu lectura estratégica del asado' : 'Your strategic BBQ readout'}
        </h3>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-text-sub">{intro}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {cardOrder.map((key) => {
          const item = data[key];
          const Icon = iconMap[key];

          return (
            <article
              key={item.title}
              className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/20">
                  <Icon size={20} strokeWidth={2.2} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-primary">
                    {item.title}
                  </p>
                  <h4 className="text-lg font-black leading-tight text-text-main">{item.value}</h4>
                </div>
              </div>
              <p className="text-sm leading-6 text-text-sub">{item.description}</p>
            </article>
          );
        })}
      </div>

      {showMedal && (
        <div className="fixed inset-x-4 bottom-6 z-[80] mx-auto max-w-md rounded-3xl border border-amber-300 bg-gradient-to-br from-zinc-950 via-zinc-900 to-black p-5 text-white shadow-[0_20px_80px_rgba(0,0,0,0.45)] lg:inset-x-auto lg:right-8 lg:bottom-8">
          <button
            onClick={() => setShowMedal(false)}
            className="absolute right-3 top-3 rounded-full bg-white/10 p-2 text-white/80 transition hover:bg-white/20 hover:text-white"
            aria-label={language === 'es' ? 'Cerrar medalla' : 'Close medal'}
          >
            <X size={16} />
          </button>

          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-400 text-black shadow-lg">
              <Shield size={28} strokeWidth={2.4} />
            </div>
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.22em] text-amber-300">
                {language === 'es' ? 'Medalla Mercenario' : 'Mercenary Medal'}
              </p>
              <h4 className="text-xl font-black leading-tight text-white">
                {data.perfil.value}
              </h4>
            </div>
          </div>

          <p className="text-sm leading-6 text-zinc-300">{data.perfil.description}</p>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-amber-200">
            {language === 'es'
              ? 'El Mercenario de la Parrilla reconoce tu estilo. Llévalo con honor.'
              : 'The Grill Mercenary recognizes your style. Wear it with honor.'}
          </div>
        </div>
      )}
    </section>
  );
}
