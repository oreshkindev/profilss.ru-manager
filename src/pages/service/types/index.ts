interface Service {
  id?: number;
  description: string;
  content: string;
  file: string;
  published: boolean;
  name: string;
  created_at?: number;
  quote: string;
}

export type { Service };
