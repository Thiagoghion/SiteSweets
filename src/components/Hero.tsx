import React from 'react';
import { Calendar, Utensils, FileText } from 'lucide-react';

interface HeroProps {
  onExplore: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="relative w-full bg-gradient-to-b from-chocolate-dark via-chocolate-deep to-primary-container text-cream-base px-margin-mobile md:px-margin-desktop py-20 md:py-24 overflow-hidden mt-20">
      {/* Decorative elements */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gold-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#F3CA7E_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto relative z-10 flex flex-col items-center text-center">
        <div className="mb-8 relative w-40 h-40">
          <img 
            src="/assets/aistudio/Logo_2_ae30ac13.png" 
            alt="Sweets & Cakes Logo" 
            className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(226,184,110,0.3)]"
          />
        </div>

        <span className="text-[11px] font-bold uppercase tracking-[3px] text-gold-light mb-4" translate="no">Maison de Haute Pâtisserie</span>
        
        <h1 className="font-headline text-4xl md:text-6xl tracking-wide text-cream-pure mb-6 drop-shadow-lg" translate="no">
          Sweets & Cakes
        </h1>
        
        <p className="font-headline text-xl md:text-2xl text-gold-muted tracking-wider italic mb-10">
          Confeitaria Fina & Pâtisserie Artesanal
        </p>

        {/* Editorial Quote */}
        <div className="max-w-3xl mx-auto bg-chocolate-roast/80 backdrop-blur-sm p-8 md:p-12 rounded-xl shadow-2xl relative border border-gold-accent/10">
          <div className="w-12 h-1 bg-gold-accent mx-auto mb-8 rounded-full" />
          <p className="font-body text-base md:text-lg text-cream-soft leading-relaxed italic px-2">
            “Desde receitas tradicionais que despertam memórias afetivas até as mais sofisticadas criações da alta confeitaria, cada doce é preparado artesanalmente com ingredientes nobres e frutas frescas selecionadas.”
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 text-[10px] font-bold tracking-widest uppercase text-gold-light">
            <span>Santa Cecília</span>
            <span className="text-sand-light/50">•</span>
            <span>São Paulo</span>
            <span className="text-sand-light/50">•</span>
            <span>Desde 2012</span>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap justify-center gap-6">
          <a 
            href="https://wa.me/551136616921" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 bg-chocolate-dark hover:bg-black text-gold-light text-[11px] font-bold uppercase tracking-wider rounded shadow-md transition-all transform hover:-translate-y-0.5"
          >
            <Calendar size={18} className="text-gold-accent" />
            <span>Solicitar Encomenda</span>
          </a>
          <button 
            onClick={onExplore}
            className="inline-flex items-center gap-2 px-8 py-3 bg-cream-soft hover:bg-cream-pure text-chocolate-deep text-[11px] font-bold uppercase tracking-wider rounded shadow-sm transition-all"
          >
            <Utensils size={18} className="text-gold-accent" />
            <span>Explorar Online</span>
          </button>
          <a 
            href="/assets/aistudio/Cardapio.pdf" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3 border border-gold-accent/30 hover:bg-gold-accent/10 text-gold-light text-[11px] font-bold uppercase tracking-wider rounded transition-all"
            translate="no"
          >
            <FileText size={18} className="text-gold-accent" />
            <span>Cardápio PDF</span>
          </a>
        </div>
      </div>
    </section>
  );
};
