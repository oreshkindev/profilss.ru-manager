interface Category {
  id?: number;
  name: string;
  description: string;
  content: string;
  adv: string;
  file: string;
  published: boolean;
  created_at?: number;
}

export type { Category };
