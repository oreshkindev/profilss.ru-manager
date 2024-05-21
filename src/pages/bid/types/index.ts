interface Bid {
  id?: number;
  email: string;
  description: string;
  fullname: string;
  phone: string;
  status: boolean;
  created_at?: number;
}

export type { Bid };
