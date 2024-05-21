interface Product {
  id?: number;
  characteristics: ProductCharacteristics[];
  category: Category;
  description: string;
  file: string;
  published: boolean;
  name: string;
  created_at?: number;
}

interface ProductCharacteristics {
  characteristic: Characteristic;
  measure: Measure;
  value: string;
}

interface Measure {
  id: number;
  code: string;
  name: string;
}

interface Characteristic {
  id: number;
  name: string;
  description: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
}

export type { Category, Characteristic, Measure, Product, ProductCharacteristics };
