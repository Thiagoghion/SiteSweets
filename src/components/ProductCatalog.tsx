import React, { useMemo } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Product } from '../types';
import { ShoppingBag, Search, Loader2 } from 'lucide-react';
import { PartyMenu } from './PartyMenu';

interface ProductCatalogProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({ 
  selectedCategory,
  onSelectCategory,
  onAddToCart 
}) => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const { products, loading } = useProducts();

  const categories = [
    { id: 'todos', label: 'Todos' },
    { id: 'bolos', label: 'Bolos' },
    { id: 'tortas-cheesecakes', label: 'Tortas e Cheesecakes' },
    { id: 'docinhos-salgadinhos', label: 'Docinhos e Salgadinhos' },
  ];

  const filteredCakes = useMemo(() => {
    return products.filter((product) => {
      if (product.id.endsWith('-showcase')) return false;

      const cats = product.categories || (product.category ? [product.category] : []);
      const unit = product.priceUnit || product.unit;
      const isParty = unit !== 'kg' && unit !== 'peça' && (cats.includes('docinhos') || cats.includes('salgados'));

      // Ignora itens de festa no grid de bolos/tortas
      if (isParty) return false;

      let matchesCategory = true;
      if (selectedCategory === 'bolos') {
        matchesCategory = cats.includes('bolos-finos') && !cats.includes('cheesecakes-tortas-especiais') && !cats.includes('tortas');
      } else if (selectedCategory === 'tortas-cheesecakes') {
        matchesCategory = cats.includes('cheesecakes-tortas-especiais') || cats.includes('tortas');
      } else if (selectedCategory === 'docinhos-salgadinhos') {
        return false;
      }

      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  if (loading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <Loader2 className="animate-spin text-gold-accent" size={36} />
      </div>
    );
  }

  return (
    <section id="catalogo" className="py-12 px-4 max-w-7xl mx-auto scroll-mt-24">
      {/* Barra de Busca e Filtros Sincronizados com o Topo */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-4 border-b border-tan-pale/30">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-tan-pale" size={18} />
          <input
            type="text"
            placeholder="Pesquisar sabor, fruta, recheio..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-tan-pale/60 rounded-xl text-sm font-medium text-chocolate-deep placeholder-coffee-muted/60 outline-none focus:ring-2 focus:ring-gold-accent/40 shadow-sm"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wider transition-all whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-chocolate-deep text-white shadow-md'
                  : 'bg-white text-coffee-muted hover:bg-cream-soft hover:text-chocolate-deep border border-tan-pale/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* RENDERIZAÇÃO DOS BOLOS E TORTAS EM CARDS CLAROS / IMAGEM 2 */}
      {selectedCategory !== 'docinhos-salgadinhos' && (
        <div className="mb-14">
          {filteredCakes.length === 0 ? (
            <div className="text-center py-16 bg-cream-soft/50 rounded-2xl border border-tan-pale/30">
              <p className="text-coffee-muted text-base font-medium">Nenhum bolo encontrado para esta seleção.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredCakes.map((product) => {
                const tagLabel = product.tags && product.tags.length > 0 ? product.tags[0] : 'CLÁSSICO';
                const imageUrl = product.imageUrl || product.image || '/assets/aistudio/foto_bolo_sweets_and_cakes_3ea7270b.jpg';

                return (
                  <div
                    key={product.id}
                    className="group relative rounded-2xl overflow-hidden aspect-[4/4.7] sm:aspect-[4/4.8] flex flex-col justify-end p-6 shadow-md transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl border border-gold-border/20 bg-chocolate-deep"
                  >
                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Gradiente iluminado */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

                    <div className="relative z-10 flex flex-col justify-end h-full">
                      <div className="mb-auto pt-1">
                        <span className="inline-block bg-[#c99738] text-chocolate-deep text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded shadow-md">
                          {tagLabel}
                        </span>
                      </div>

                      <h3 className="text-2xl sm:text-[26px] font-headline font-bold text-white tracking-wide mb-2 leading-tight drop-shadow-md">
                        {product.name}
                      </h3>

                      <p className="text-white/95 text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4 font-medium drop-shadow">
                        {product.description}
                      </p>

                      <div className="w-full h-px bg-white/25 mb-4" />

                      <div className="flex items-center justify-between gap-3 pt-1">
                        <div className="flex items-baseline">
                          <span className="text-[#f5c968] font-serif font-black text-xl sm:text-2xl tracking-tight drop-shadow-md">
                            R$&nbsp;{product.price.toFixed(2).replace('.', ',')}
                          </span>
                          <span className="text-white/90 text-xs sm:text-sm font-semibold ml-1 drop-shadow">
                            /{product.priceUnit || product.unit}
                          </span>
                        </div>

                        <button
                          onClick={() => onAddToCart(product, 1)}
                          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#845b13] hover:bg-[#a6741b] text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-xl shadow-lg transition-all active:scale-95 group/btn"
                        >
                          <ShoppingBag size={14} />
                          <span>Adicionar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* RENDERIZAÇÃO DA LISTA CLÁSSICA DE DOCINHOS E SALGADOS (IMAGEM 2) */}
      {(selectedCategory === 'todos' || selectedCategory === 'docinhos-salgadinhos') && (
        <div className="mt-8">
          <PartyMenu products={products} onAddToCart={onAddToCart} />
        </div>
      )}
    </section>
  );
};