import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product, Category } from '../types';
import { PRODUCTS as STATIC_PRODUCTS, CATEGORIES as STATIC_CATEGORIES } from '../data/products';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to products
    const qProducts = query(collection(db, 'products'), orderBy('name'));
    const unsubscribeProducts = onSnapshot(qProducts, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
      if (docs.length > 0) {
        setProducts(docs);
      } else {
        const fallback = STATIC_PRODUCTS.map(p => ({
          ...p,
          unit: p.priceUnit,
          category: p.categories[0],
          imageUrl: p.image
        }));
        setProducts(fallback as any);
      }
    });

    // Listen to categories
    const qCategories = query(collection(db, 'categories'), orderBy('name'));
    const unsubscribeCategories = onSnapshot(qCategories, (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as any));
      if (docs.length > 0) {
        // Merge with static metadata (descriptions/images) if available
        const merged = docs.map(doc => {
          const staticCat = STATIC_CATEGORIES.find(c => c.id === doc.id || c.name.toLowerCase() === doc.name.toLowerCase());
          return {
            id: doc.id,
            name: doc.name,
            description: staticCat?.description || '',
            image: staticCat?.image || '',
            itemCount: staticCat?.itemCount || 'Ver variedades'
          };
        });
        setCategories(merged);
      } else {
        setCategories(STATIC_CATEGORIES);
      }
      setLoading(false);
    });

    return () => {
      unsubscribeProducts();
      unsubscribeCategories();
    };
  }, []);

  return { products, categories, loading };
}
