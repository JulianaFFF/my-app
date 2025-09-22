export interface Author {
  id?: number;
  name: string;
  description: string;
  birthDate: string;
  image: string;
  books?: Book[];
  prizes?: Prize[];
}

export interface Book {
  id: number;
  name: string;
  isbn: string;
  image: string;
  publishingDate: string;
  description: string;
}

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

export interface Editorial {
  id: number;
  name: string;
}