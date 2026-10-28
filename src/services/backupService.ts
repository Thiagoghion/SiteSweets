import { 
  collection, 
  getDocs, 
  addDoc, 
  setDoc, 
  doc, 
  query, 
  orderBy, 
  limit, 
  serverTimestamp,
  writeBatch,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from '../types';

export const backupService = {
  async createBackup() {
    // 1. Get current products
    const productsSnap = await getDocs(collection(db, 'products'));
    const products = productsSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }));

    // 2. Get current categories
    const categoriesSnap = await getDocs(collection(db, 'categories'));
    const categories = categoriesSnap.docs.map(doc => ({ ...doc.data(), id: doc.id }));

    // 3. Get current settings
    const settingsDoc = await getDocs(collection(db, 'settings'));
    const settings = settingsDoc.docs.reduce((acc, doc) => ({ ...acc, [doc.id]: doc.data() }), {});

    // Save as backup
    await addDoc(collection(db, 'backups'), {
      products,
      categories,
      settings,
      createdAt: serverTimestamp()
    });
  },

  async getLatestBackup() {
    const q = query(collection(db, 'backups'), orderBy('createdAt', 'desc'), limit(1));
    const snap = await getDocs(q);
    if (!snap.empty) {
      return snap.docs[0].data();
    }
    return null;
  },

  async restoreLatestBackup() {
    const backup = await this.getLatestBackup();
    if (!backup) throw new Error('Nenhum backup encontrado.');

    const batch = writeBatch(db);

    // 1. Clear current products and add from backup
    const productsSnap = await getDocs(collection(db, 'products'));
    productsSnap.docs.forEach(d => batch.delete(d.ref));
    backup.products.forEach((p: any) => {
      const { id, ...data } = p;
      batch.set(doc(db, 'products', id), data);
    });

    // 2. Clear current categories and add from backup
    const categoriesSnap = await getDocs(collection(db, 'categories'));
    categoriesSnap.docs.forEach(d => batch.delete(d.ref));
    backup.categories.forEach((c: any) => {
      const { id, ...data } = c;
      batch.set(doc(db, 'categories', id), data);
    });

    // 3. Restore settings
    if (backup.settings) {
      Object.entries(backup.settings).forEach(([id, data]) => {
        batch.set(doc(db, 'settings', id), data as any);
      });
    }

    await batch.commit();
    
    // Optionally delete the used backup or keep it
    // For safety, let's keep it but maybe limited.
  }
};
