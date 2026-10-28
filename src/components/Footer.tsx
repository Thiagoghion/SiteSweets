import React, { useState, useEffect } from 'react';
import { Clock, Phone, MapPin, FileText } from 'lucide-react';
import { settingsService } from '../services/settingsService';

export const Footer: React.FC = () => {
  const [menuUrl, setMenuUrl] = useState<string | null>(null);

  useEffect(() => {
    settingsService.getMenuPdfUrl().then(url => {
      if (url) setMenuUrl(url);
    });
  }, []);

  return (
    <footer className="w-full bg-chocolate-deep text-cream-base mt-20 border-t-2 border-gold-accent">
      <div className="max-w-7xl mx-auto px-margin-mobile md:px-margin-desktop py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-12 border-b border-chocolate-roast">
          <div className="md:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <span className="font-headline text-2xl tracking-wider text-gold-light uppercase" translate="no">Sweets & Cakes</span>
            </div>
            <p className="text-sm text-sand-light max-w-md leading-relaxed">
              Artesania açucareira, ingredientes nobres e a tradição dos grandes clássicos parisienses no coração de Santa Cecília. Confeitaria fina para celebrações memoráveis e momentos doces do dia a dia.
            </p>
            <div className="flex items-center gap-2 pt-2 text-[10px] font-bold uppercase tracking-wider text-gold-muted">
              <Clock size={16} />
              <span>Segunda a Sexta: 10h às 19h • Sábados: 8h às 15h • Domingos: Fechado</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-headline text-lg text-gold-light mb-6 uppercase tracking-wide">Ateliê & Endereço</h4>
            <div className="space-y-4 text-sm text-sand-light leading-relaxed">
              <div className="flex items-start gap-2">
                <MapPin size={18} className="text-gold-accent shrink-0 mt-0.5" />
                <span>Rua Conselheiro Brotero, 913<br/>Bairro Santa Cecília<br/>São Paulo – SP<br/>CEP 01232-011</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-headline text-lg text-gold-light mb-6 uppercase tracking-wide">Encomendas</h4>
            <p className="text-sm text-sand-light mb-6">Atendimento direto para bolos sob medida, docinhos e recepções.</p>
            <div className="flex flex-col gap-3">
              <a 
                href="https://wa.me/551136616921" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 bg-secondary hover:bg-secondary-container hover:text-on-secondary-container text-cream-base text-[11px] font-bold uppercase tracking-wider rounded transition-colors"
              >
                <Phone size={14} />
                <span>(11) 3661-6921</span>
              </a>
              <a 
                href={menuUrl || "/assets/aistudio/Cardapio.pdf"} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 border border-gold-accent/20 hover:bg-gold-accent/10 text-gold-light text-[11px] font-bold uppercase tracking-wider rounded transition-colors"
                translate="no"
              >
                <FileText size={14} />
                <span>Cardápio PDF</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-sand-light/50">
              © 2025 Sweets & Cakes Confeitaria Fina Ltda. Todos os direitos reservados.
            </p>
            <a href="/gerenciamento" className="text-[9px] font-bold uppercase tracking-widest text-gold-muted/30 hover:text-gold-muted transition-colors">
              Gerenciamento
            </a>
          </div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-gold-muted">
            Tradição Gourmet • Santa Cecília, São Paulo
          </p>
        </div>
      </div>
    </footer>
  );
};
