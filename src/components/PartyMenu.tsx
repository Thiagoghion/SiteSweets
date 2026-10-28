import React, { useState } from 'react';
import { Product } from '../types';
import { Plus, Minus, ShoppingBag, Info } from 'lucide-react';

interface PartyMenuProps {
  products: Product[];
  onAddToCart: (product: Product, quantity: number) => void;
}

export const PartyMenu: React.FC<PartyMenuProps> = ({ products, onAddToCart }) => {
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const docinhos = products.filter(p => {
    const cats = p.categories || (p.category ? [p.category] : []);
    const unit = p.priceUnit || p.unit;
    return unit !== 'kg' && unit !== 'peça' && cats.includes('docinhos');
  });

  const salgados = products.filter(p => {
    const cats = p.categories || (p.category ? [p.category] : []);
    const unit = p.priceUnit || p.unit;
    return unit !== 'kg' && unit !== 'peça' && cats.includes('salgados');
  });

  const handleStep = (id: string, delta: number, step: number = 25) => {
    const current = quantities[id] || 0;
    const next = Math.max(0, current + delta * step);
    setQuantities(prev => ({ ...prev, [id]: next }));
  };

  const handleAddBatch = (list: Product[]) => {
    let addedCount = 0;
    list.forEach(p => {
      const q = quantities[p.id] || 0;
      if (q > 0) {
        onAddToCart(p, q);
        addedCount++;
      }
    });

    if (addedCount > 0) {
      // Limpa as quantidades selecionadas do lote adicionado
      setQuantities(prev => {
        const next = { ...prev };
        list.forEach(p => delete next[p.id]);
        return next;
      });
    } else {
      alert('Selecione ao menos 25 unidades de algum sabor antes de adicionar.');
    }
  };

  const totalSelectedDocs = docinhos.reduce((acc, p) => acc + (quantities[p.id] || 0), 0);
  const totalSelectedSalgs = salgados.reduce((acc, p) => acc + (quantities[p.id] || 0), 0);

  return (
    <div className="space-y-12">
      {/* BLOCO 1: DOCINHOS GOURMET (IMAGEM 2) */}
      <div className="bg-cream-pure rounded-2xl p-6 sm:p-10 border border-tan-pale/40 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-tan-pale/30">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gold-accent block">
              Confeitaria Fina
            </span>
            <h3 className="font-headline text-2xl sm:text-3xl font-bold text-chocolate-deep tracking-wide">
              DOCINHOS GOURMET
            </h3>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-soft border border-tan-pale/40 text-chocolate-roast text-xs font-bold">
            <Info size={14} className="text-gold-accent" />
            <span>Mínimo: 25 unidades por sabor</span>
          </div>
        </div>

        <div className="divide-y divide-tan-pale/25">
          {docinhos.map(item => {
            const currentQty = quantities[item.id] || 0;
            return (
              <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-cream-soft/40 transition-colors px-2 rounded-xl">
                <div className="flex-1">
                  <h4 className="font-headline font-bold text-base sm:text-lg text-chocolate-deep">
                    {item.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-coffee-muted mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0">
                  <span className="text-sm sm:text-base font-bold text-chocolate-deep">
                    R$ {item.price.toFixed(2).replace('.', ',')}
                    <span className="text-xs text-coffee-muted font-normal ml-1">/un</span>
                  </span>

                  <div className="flex items-center bg-cream-soft rounded-lg p-1 border border-tan-pale/40 shadow-inner">
                    <button
                      onClick={() => handleStep(item.id, -1, 25)}
                      className="p-1.5 hover:text-gold-accent text-chocolate-deep transition-colors"
                      aria-label="Diminuir"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-xs sm:text-sm font-bold px-3 text-chocolate-deep min-w-[42px] text-center">
                      {currentQty}
                    </span>
                    <button
                      onClick={() => handleStep(item.id, 1, 25)}
                      className="p-1.5 hover:text-gold-accent text-chocolate-deep transition-colors"
                      aria-label="Aumentar"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-tan-pale/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-coffee-muted italic text-center sm:text-left">
            *Escolha múltiplos de 25 por sabor para compor sua mesa.
          </p>
          <button
            onClick={() => handleAddBatch(docinhos)}
            disabled={totalSelectedDocs === 0}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-chocolate-deep hover:bg-chocolate-roast disabled:opacity-40 disabled:hover:bg-chocolate-deep text-cream-base font-bold text-xs uppercase tracking-widest rounded-xl shadow-md transition-all active:scale-95"
          >
            <ShoppingBag size={16} className="text-gold-accent" />
            <span>Adicionar Docinhos Selecionados ({totalSelectedDocs})</span>
          </button>
        </div>
      </div>

      {/* BLOCO 2: SALGADOS FINOS (IMAGEM 2) */}
      <div className="bg-cream-pure rounded-2xl p-6 sm:p-10 border border-tan-pale/40 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-tan-pale/30">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-gold-accent block">
              Buffet & Coquetel
            </span>
            <h3 className="font-headline text-2xl sm:text-3xl font-bold text-chocolate-deep tracking-wide">
              SALGADOS FINOS
            </h3>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cream-soft border border-tan-pale/40 text-chocolate-roast text-xs font-bold">
            <Info size={14} className="text-gold-accent" />
            <span>Mínimo: 25 unidades por sabor (saltos de 25 em 25)</span>
          </div>
        </div>

        <div className="divide-y divide-tan-pale/25">
          {salgados.map(item => {
            const currentQty = quantities[item.id] || 0;
            return (
              <div key={item.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-cream-soft/40 transition-colors px-2 rounded-xl">
                <div className="flex-1">
                  <h4 className="font-headline font-bold text-base sm:text-lg text-chocolate-deep">
                    {item.name}
                  </h4>
                  <p className="text-xs sm:text-sm text-coffee-muted mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 shrink-0">
                  <span className="text-sm sm:text-base font-bold text-chocolate-deep">
                    R$ {item.price.toFixed(2).replace('.', ',')}
                    <span className="text-xs text-coffee-muted font-normal ml-1">/un</span>
                  </span>

                  <div className="flex items-center bg-cream-soft rounded-lg p-1 border border-tan-pale/40 shadow-inner">
                    <button
                      onClick={() => handleStep(item.id, -1, 25)}
                      className="p-1.5 hover:text-gold-accent text-chocolate-deep transition-colors"
                      aria-label="Diminuir"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-xs sm:text-sm font-bold px-3 text-chocolate-deep min-w-[42px] text-center">
                      {currentQty}
                    </span>
                    <button
                      onClick={() => handleStep(item.id, 1, 25)}
                      className="p-1.5 hover:text-gold-accent text-chocolate-deep transition-colors"
                      aria-label="Aumentar"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 pt-6 border-t border-tan-pale/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-coffee-muted italic text-center sm:text-left">
            *Salgados assados e fritos para festa com antecedência mínima de 60 horas.
          </p>
          <button
            onClick={() => handleAddBatch(salgados)}
            disabled={totalSelectedSalgs === 0}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-chocolate-deep hover:bg-chocolate-roast disabled:opacity-40 disabled:hover:bg-chocolate-deep text-cream-base font-bold text-xs uppercase tracking-widest rounded-xl shadow-md transition-all active:scale-95"
          >
            <ShoppingBag size={16} className="text-gold-accent" />
            <span>Adicionar Salgados Selecionados ({totalSelectedSalgs})</span>
          </button>
        </div>
      </div>
    </div>
  );
};