export type PageType = 'catalog' | 'product' | 'cart' | 'checkout' | 'thank-you';

export interface Product {
  id: string;
  articul: string;
  name: string;
  category: 'Реликвии' | 'Манускрипты' | 'Инструменты' | 'Алхимия' | 'Украшения';
  price: number; // in Tenge (₸)
  oldPrice?: number;
  inStock: boolean;
  shortDescription: string;
  fullDescription: string[];
  latinInscription?: string;
  latinTranslation?: string;
  specs: {
    label: string;
    value: string;
  }[];
  symbol: string;
  auraType: 'crimson' | 'ember';
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CheckoutFormData {
  name: string;
  phone: string;
  address: string;
  comment: string;
  deliveryMethod: 'courier' | 'express' | 'pickup';
}

export interface OrderRecord {
  orderNumber: string;
  items: CartItem[];
  totalAmount: number;
  customer: CheckoutFormData;
  createdAt: string;
  telegramMessageId?: number;
}
