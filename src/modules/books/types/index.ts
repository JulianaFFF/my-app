
export interface Book {
  id?: number;
  name: string;
  isbn: string;
  image: string;
  publishingDate: string;
  description: string;
  editorial?: Editorial;
  authors?: Author[];
  reviews?: Review[];
}

export interface Review {
  id?: number;
  rating: number;
  comment: string;
  reviewDate: string;
  reviewer?: string;
}

export interface Editorial {
  id: number;
  name: string;
}

export interface Author {
  id?: number;
  name: string;
  description: string;
  birthDate: string;
  image: string;
}