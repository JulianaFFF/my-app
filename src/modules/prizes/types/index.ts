export interface Prize {
  id?: number;
  premiationDate: string;
  name: string;
  description: string;
  organization: Organization;
}

export interface Organization {
  id: number;
  name: string;
  tipo: string;
}