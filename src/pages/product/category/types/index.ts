import type { Iso } from '../../iso/types';

interface Category {
  id?: number;
  file: File;
  sub_category: SubCategory;
  iso: Iso[];
  name: string;
  description: string;
  published: boolean;
  created_at?: number;
}

interface SubCategory {
  id?: number;
  name: string;
  description: string;
  content: string;
  published: boolean;
  created_at?: number;
}

interface File {
  id?: number;
  preview: string;
  video: string;
}

export type { Category, File, SubCategory };
