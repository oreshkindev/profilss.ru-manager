interface Hr {
  id?: number;
  name: string;
  period: string;
  cost: string;
  address: string;
  duties: string[];
  requirements: string[];
  conditions: string[];
  published: boolean;
  created_at?: number;
}

export type { Hr };
