export interface Autor { 
    id?: number;
    birthDate: string; 
    name: string;
    description: string;
    image: string;
    books?: Book[]; 
    }

export interface Book {
    id: number;
    name: string;
    isbn: string;
    image: string;
    publishingDate: string; 
    description: string;
}