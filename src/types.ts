export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  priceUnit: 'kg' | 'un' | 'cento' | 'peça';
  categories: string[];
  tags?: string[];
  image?: string;
  highlight?: boolean;
  // Firestore specific fields
  category?: string;
  unit?: string;
  imageFileName?: string;
  imageUrl?: string;
  updatedAt?: any;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  itemCount: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  quantity: number;
  unit: string;
  price: number;
  total: number;
}
