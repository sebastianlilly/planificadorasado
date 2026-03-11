import React from 'react';
import { Shield, Wine, Flame, Hammer } from 'lucide-react';
import type { MercenarioProfile } from '../mercenarioProfile';

interface MercenarioPanelProps {
  data: MercenarioProfile;
  language: 'es' | 'en';
}

const iconMap = {
  maridaje: Wine,
  consejo: Flame,
  herramienta: Hammer,
  perfil: Shield,
} as const;

const cardOrder: Array<keyof MercenarioProfile> = ['maridaje', 'consejo', 'herramienta', 'perfil'];

export default function MercenarioPanel({ data, language }: MercenarioPanelProps) {
  const intro =
    language === 'es'
      ? 'No eres un simple parrillero de domingo. Este es tu cierre táctico para servir mejor y verte como un verdadero Mercenario de la Parrilla.'
      : 'You are not just a casual Sunday griller. This is your tactical finish to serve better and feel like a true Grill Mercenary.';

  return (
    <section className="mt-6 rounded-2xl border-2 border-primary/25 bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-800 p-5 text-white shadow-[0_0_30px_rgba(236,19,30,0.18)]">
      <div className="mb-5">
        <p className="mb-2 inline-flex rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-black uppercase tracking-[0.22em] text-amber-300">
          {language === 'es' ? 'Modo Mercenario Activado' : 'Mercenary Mode Activated'}
        </p>
        <h3 className="text-2xl font-black tracking-tight text-white">
          {language === 'es' ? 'Tu lectura estratégica del asado' : 'Your strategic BBQ readout'}
        </h3>
        <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-300">{intro}</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {cardOrder.map((key) => {
          const item = data[key];
          const Icon = iconMap[key];

          return (
            <article
              key={item.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-white/[0.07]"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary text-white shadow-lg shadow-primary/25">
                  <Icon size={20} strokeWidth={2.2} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.18em] text-amber-300">{item.title}</p>
                  <h4 className="text-lg font-black leading-tight text-white">{item.value}</h4>
                </div>
              </div>
              <p className="text-sm leading-6 text-zinc-300">{item.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
