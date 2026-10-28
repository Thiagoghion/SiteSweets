import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where,
  writeBatch,
  serverTimestamp,
  getDoc,
  setDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';

import { Product } from '../types';

export const productService = {
  async getProducts() {
    const querySnapshot = await getDocs(collection(db, 'products'));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product));
  },

  async syncFromExcel(products: Omit<Product, 'id'>[]) {
    const batch = writeBatch(db);
    
    // 1. Sync Products
    const productsRef = collection(db, 'products');
    const existingProducts = await this.getProducts();
    const existingMap = new Map(existingProducts.map(p => [p.name.toLowerCase(), p.id]));

    for (const productData of products) {
      const nameKey = productData.name.toLowerCase();
      if (existingMap.has(nameKey)) {
        const docRef = doc(db, 'products', existingMap.get(nameKey)!);
        batch.update(docRef, { ...productData, updatedAt: serverTimestamp() });
      } else {
        const docRef = doc(productsRef);
        batch.set(docRef, { ...productData, updatedAt: serverTimestamp() });
      }
    }

    // 2. Sync Categories (Unique names from products)
    const categoryNames = Array.from(new Set(products.map(p => p.category).filter(Boolean)));
    const categoriesRef = collection(db, 'categories');
    
    for (const catName of categoryNames) {
      if (!catName) continue;
      const catId = catName.toLowerCase().replace(/\s+/g, '-');
      const catDocRef = doc(db, 'categories', catId);
      batch.set(catDocRef, { name: catName, updatedAt: serverTimestamp() }, { merge: true });
    }

    await batch.commit();
  },

  async saveProduct(product: Omit<Product, 'id'>, id?: string) {
    // 1. Save Category if new
    if (product.category) {
      const catId = product.category.toLowerCase().replace(/\s+/g, '-');
      const catDocRef = doc(db, 'categories', catId);
      const catSnap = await getDoc(catDocRef);
      if (!catSnap.exists()) {
        await setDoc(catDocRef, { name: product.category, updatedAt: serverTimestamp() });
      }
    }

    // 2. Save Product
    if (id) {
      const docRef = doc(db, 'products', id);
      await updateDoc(docRef, { ...product, updatedAt: serverTimestamp() });
    } else {
      const productsRef = collection(db, 'products');
      await addDoc(productsRef, { ...product, updatedAt: serverTimestamp() });
    }
  },

  async deleteProduct(id: string) {
    const docRef = doc(db, 'products', id);
    await deleteDoc(docRef);
  }
};
