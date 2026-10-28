import { 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  serverTimestamp,
  getDoc
} from 'firebase/firestore';
import { db } from '../lib/firebase';

export const settingsService = {
  async getMenuPdfUrl() {
    const docRef = doc(db, 'settings', 'app');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().menuPdfUrl as string;
    }
    return null;
  },

  async updateMenuPdfUrl(url: string) {
    const docRef = doc(db, 'settings', 'app');
    await setDoc(docRef, { 
      menuPdfUrl: url, 
      updatedAt: serverTimestamp() 
    }, { merge: true });
  }
};
