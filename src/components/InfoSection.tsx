import React from 'react';
import { Info, HelpCircle } from 'lucide-react';

export const InfoSection: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto w-full px-margin-mobile md:px-margin-desktop mb-24">
      <div className="bg-cream-pure rounded-xl p-8 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-tan-pale/30">
        <div className="space-y-2 max-w-3xl">
          <span className="text-[11px] font-bold text-chocolate-deep uppercase tracking-widest flex items-center gap-2">
            <Info size={16} className="text-gold-accent" />
            <span>Orientações de Conservação & Transporte</span>
          </span>
          <p className="text-sm text-coffee-muted leading-relaxed">
            Bolos com frutas frescas (morango, maracujá) devem ser mantidos sob refrigeração de 4°C a 8°C e consumidos preferencialmente em até 48 horas para máxima integridade e frescor.
          </p>
        </div>
        <a 
          href="https://wa.me/551136616921" 
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 inline-flex items-center gap-2 px-6 py-2.5 bg-chocolate-deep text-cream-base text-[11px] font-bold uppercase tracking-wider rounded shadow-sm hover:bg-secondary transition-colors"
        >
          <HelpCircle size={16} className="text-gold-accent" />
          <span>Dúvidas com a Confeiteira</span>
        </a>
      </div>
    </section>
  );
};
