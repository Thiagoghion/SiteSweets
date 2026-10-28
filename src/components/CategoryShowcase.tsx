import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CategoryShowcaseProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onSelectCategory }) => {
  const categories = [
    {
      id: 'bolos',
      name: 'Bolos Finos',
      itemCount: 'MAIS DE 20 VARIEDADES',
      description: 'Nossa coleção completa de bolos artesanais, desde os intensos de chocolate até os refrescantes tropicais.',
      image: '/assets/aistudio/foto_bolo_sweets_and_cakes_3ea7270b.jpg',
    },
    {
      id: 'tortas-cheesecakes',
      name: 'Cheesecakes & Tortas',
      itemCount: 'VER TORTAS',
      description: 'Cheesecake Frutas Vermelhas, Torta Banoffee caramelizada e Torta Alfajor.',
      image: '/assets/aistudio/foto_cheesecake_frutas_vermelhas_e0390015.jpg',
    },
    {
      id: 'docinhos-salgadinhos',
      name: 'Docinhos & Salgados Finos',
      itemCount: 'GUIA COMPLETO',
      description: 'Coxinhas douradas, empadas finas, folhados e cento de brigadeiros artesanais.',
      image: '/assets/aistudio/salgados_b13f6069.jpg',
    },
  ];

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="w-2 h-2 rounded-full bg-gold-accent inline-block mr-2" />
          <h2 className="font-headline text-3xl sm:text-4xl font-bold text-chocolate-deep inline-block align-middle">
            Categorias do Cardápio Digital
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-coffee-muted italic">
          Toque nos cards para navegar diretamente pelas coleções de confeitaria fina e salgados especiais.
        </p>
      </div>

      {/* Grade com a mesma largura e impacto visual dos produtos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => onSelectCategory(cat.id)}
            className="group relative rounded-2xl overflow-hidden shadow-md bg-white border border-tan-pale/40 flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer"
          >
            {/* Foto da Categoria */}
            <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-chocolate-deep">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <h3 className="absolute bottom-5 left-6 right-6 font-headline text-2xl sm:text-3xl font-bold text-white leading-tight drop-shadow-md">
                {cat.name}
              </h3>
            </div>

            {/* Conteúdo Inferior */}
            <div className="p-6 flex-1 flex flex-col justify-between bg-white">
              <p className="text-xs sm:text-sm text-coffee-muted leading-relaxed mb-6">
                {cat.description}
              </p>

              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-chocolate-roast group-hover:text-gold-accent transition-colors pt-4 border-t border-tan-pale/25">
                <span>{cat.itemCount}</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};