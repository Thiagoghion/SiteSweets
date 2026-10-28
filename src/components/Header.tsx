import React from 'react';
import { ShoppingBag } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onSelectCategory: (category: string) => void;
  currentCategory: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onSelectCategory,
  currentCategory
}) => {
  const navItems = [
    { id: 'todos', label: 'INÍCIO' },
    { id: 'bolos', label: 'BOLOS FINOS' },
    { id: 'tortas-cheesecakes', label: 'CHEESECAKES & TORTAS' },
    { id: 'docinhos-salgadinhos', label: 'DOCINHOS & SALGADOS' },
  ];

  const handleNavClick = (id: string) => {
    onSelectCategory(id);
    const catalogoEl = document.getElementById('catalogo');
    if (catalogoEl) {
      catalogoEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-cream-base/95 backdrop-blur-md border-b border-tan-pale/30 shadow-sm">
      <div className="bg-chocolate-deep text-cream-base text-[10px] sm:text-xs py-1.5 px-4 tracking-wider font-medium flex justify-between items-center max-w-7xl mx-auto">
        <span className="hidden sm:inline">📍 RUA CONSELHEIRO BROTERO, 913 — SANTA CECÍLIA, SP</span>
        <span className="mx-auto sm:mx-0">📞 (11) 3661-6921 • ATELIÊ & PRONTA ENTREGA</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div 
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => handleNavClick('todos')}
        >
          <img src="/logo.png" alt="Sweets & Cakes" className="h-12 w-auto object-contain" onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }} />
          <div>
            <h1 className="font-headline font-bold text-2xl text-chocolate-deep tracking-wider">SWEETS & CAKES</h1>
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold-accent font-bold">Haute Pâtisserie</p>
          </div>
        </div>

        {/* Links Superiores Ativos e Linkados */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-xs font-bold uppercase tracking-wider transition-all relative py-1 ${
                currentCategory === item.id 
                  ? 'text-chocolate-deep font-black' 
                  : 'text-coffee-muted hover:text-chocolate-deep'
              }`}
            >
              {item.label}
              {currentCategory === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-accent rounded-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('todos')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 border border-chocolate-deep/30 rounded-xl text-xs font-bold uppercase tracking-wider text-chocolate-deep hover:bg-cream-soft transition-colors"
          >
            Cardápio
          </button>

          <button
            onClick={onOpenCart}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-chocolate-deep hover:bg-chocolate-roast text-cream-base rounded-xl text-xs font-bold uppercase tracking-wider shadow-md transition-all active:scale-95"
          >
            <ShoppingBag size={16} className="text-gold-accent" />
            <span>Encomendar</span>
            {cartCount > 0 && (
              <span className="ml-1 px-1.5 py-0.5 bg-berry-red text-white text-[10px] font-bold rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};