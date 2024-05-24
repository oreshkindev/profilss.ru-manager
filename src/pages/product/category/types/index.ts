interface Category {
  id?: number;
  name: string;
  description: string;
  content: string;
  adv: string;
  file: File;
  published: boolean;
  created_at?: number;
}

interface File {
  id?: number;
  preview: string;
  video: string;
}

export type { Category, File };
