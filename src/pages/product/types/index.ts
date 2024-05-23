interface Product {
  id?: number;
  category: Category;
  isos: Iso[];
  characteristic: Characteristic;
  created_at?: number;
  published: boolean;
}

interface Iso {
  id?: number;
  name: string;
}

interface Characteristic {
  id?: number;
  max_price: string;
  price: string;
  size: string;
  thickness: string;
  weight: string;
}

interface Category {
  id?: number;
  name: string;
  description: string;
  content: string;
  adv: string;
  file: string;
}

export type { Category, Characteristic, Iso, Product };
