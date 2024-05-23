import type { Category } from '../category/types';
import type { Iso } from '../iso/types';

interface Product {
  id?: number;
  category: Category;
  isos: Iso[];
  characteristic: Characteristic;
  created_at?: number;
  published: boolean;
}

interface Characteristic {
  id?: number;
  max_price: string;
  price: string;
  size: string;
  thickness: string;
  weight: string;
}

export type { Characteristic, Iso, Product };
