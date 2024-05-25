interface Settings {
  id?: number;
  name: string;
  abbreviation: string;
  contacts: Contact[];
  inn: string;
  kpp: string;
  ogrn: string;
  employees: Employee[];
  bank: string;
  bik: string;
  kor: string;
  current_account: string;
  okvd: string;
  tax: string;
  media: Media[];
}

interface Contact {
  id?: number;
  address: string;
  email: string;
  phone: string;
}

interface Employee {
  id?: number;
  contacts: Contact[];
  description: string;
  name: string;
}

interface Media {
  id?: number;
  href: string;
  name: string;
}

export type { Contact, Employee, Media, Settings };
