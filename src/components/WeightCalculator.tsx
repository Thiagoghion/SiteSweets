import React from 'react';
import { MessageCircle, Users } from 'lucide-react';

export const WeightCalculator: React.FC = () => {
  const cards = [
    {
      people: '20 pessoas',
      suggested: '2,0 kg a 2,4 kg',
      isSpecial: false,
    },
    {
      people: '30 pessoas',
      suggested: '3,0 kg a 3,6 kg',
      isSpecial: false,
    },
    {
      people: '50 pessoas',
      suggested: '5,0 kg',
      isSpecial: false,
    },
    {
      people: '70+ pessoas',
      suggested: 'Pedido Especial',
      isSpecial: true,
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 my-14">
      <div className="bg-[#1b120c] rounded-2xl p-6 sm:p-10 shadow-xl border border-gold-border/20 text-cream-base">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-[#3d2716] flex items-center justify-center text-gold-accent">
            <Users size={20} />
          </div>
          <div>
            <h3 className="font-headline text-2xl sm:text-3xl font-bold text-cream-pure tracking-wide">
              Guia de Peso para Seu Bolo
            </h3>
            <p className="text-xs uppercase tracking-widest text-gold-accent font-bold mt-0.5">
              Cálculos baseados em eventos de 4 horas (100g a 120g por convidado)
            </p>
          </div>
        </div>

        {/* Grade perfeitamente distribuída em 4 colunas no computador */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="bg-[#2a1c12] rounded-xl p-5 border border-white/5 flex flex-col justify-between hover:border-gold-accent/40 transition-colors shadow-sm"
            >
              <div>
                <span className="font-headline text-xl text-[#e8c07d] font-bold block mb-3">
                  {card.people}
                </span>
                <span className="text-xs text-sand-light uppercase tracking-wider block mb-1">
                  Bolo Sugerido:
                </span>
                <span className={`text-base sm:text-lg font-bold ${card.isSpecial ? 'text-gold-accent' : 'text-white'}`}>
                  {card.suggested}
                </span>
              </div>

              {card.isSpecial && (
                <a
                  href="https://wa.me/551136616921?text=Ol%C3%A1%2C%20gostaria%20de%20consultar%20um%20pedido%20especial%20para%20mais%20de%2070%20pessoas."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 py-2 px-3 bg-[#422c19] hover:bg-gold-accent hover:text-chocolate-deep text-cream-base text-xs font-bold uppercase tracking-wider rounded-lg transition-colors"
                >
                  <MessageCircle size={14} />
                  <span>Consultar Ateliê</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};