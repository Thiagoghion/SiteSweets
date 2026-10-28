import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoryShowcase } from './components/CategoryShowcase';
import { WeightCalculator } from './components/WeightCalculator';
import { ProductCatalog } from './components/ProductCatalog';
import { OrderCart } from './components/OrderCart';
import { Footer } from './components/Footer';
import { CartItem, Product } from './types';
import { Management } from './pages/Management'; // <-- Importado no topo

export const App: React.FC = () => {
  // Roteamento simples: se a URL for /gerenciamento, abre o painel administrativo
  const path = window.location.pathname;
  if (path === '/gerenciamento' || path === '/gerenciamento/') {
    return <Management />;
  }

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartMinimized, setIsCartMinimized] = useState(true);
  const [currentCategory, setCurrentCategory] = useState<string>('todos');

  const handleSelectCategory = (categoryId: string) => {
    setCurrentCategory(categoryId);
    const catalogoEl = document.getElementById('catalogo');
    if (catalogoEl) {
      catalogoEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity, total: (item.quantity + quantity) * item.price }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        unit: product.priceUnit || product.unit || 'un',
        quantity: quantity,
        total: quantity * product.price
      }];
    });
    setIsCartMinimized(false);
  };

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity, total: newQuantity * item.price };
      }
      return item;
    }));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearCart = () => setCartItems([]);

  return (
    <div className="min-h-screen bg-cream-base flex flex-col font-body selection:bg-gold-light selection:text-chocolate-deep">
      <Header 
        cartCount={cartItems.length}
        onOpenCart={() => setIsCartMinimized(false)}
        onSelectCategory={handleSelectCategory}
        currentCategory={currentCategory}
      />

      <main className="flex-1">
        <Hero onExplore={() => handleSelectCategory('todos')} />

        <CategoryShowcase onSelectCategory={handleSelectCategory} />

        <WeightCalculator />

        <ProductCatalog 
          selectedCategory={currentCategory}
          onSelectCategory={handleSelectCategory}
          onAddToCart={handleAddToCart}
        />
      </main>

      <Footer />

      <OrderCart 
        items={cartItems}
        isMinimized={isCartMinimized}
        onToggle={() => setIsCartMinimized(prev => !prev)}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />
    </div>
  );
};

export default App;