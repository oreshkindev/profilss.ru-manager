interface Post {
  id?: number;
  description: string;
  file: string;
  promo: boolean;
  published: boolean;
  name: string;
  created_at?: number;
}

export type { Post };
