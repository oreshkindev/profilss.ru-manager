import type { Category } from '../category/types';

interface Product {
  id?: number;
  category: Category;
  characteristic: Characteristic;
  published: boolean;
  created_at?: number;
}

interface Characteristic {
  id?: number;
  max_price: string;
  price: string;
  size: string;
  thickness: string;
  weight: string;
}

export type { Characteristic, Product };
