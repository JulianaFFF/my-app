import { fetcher } from "@/shared/services/http";
import { Book, Review } from "@/modules/books/types";

export const fetchBooks = (): Promise<Book[]> => {
  return fetcher<Book[]>("/books");
};

export const fetchBookById = (id: number): Promise<Book> => {
  return fetcher<Book>(`/books/${id}`);
};

export const createBook = (data: Omit<Book, 'id'>): Promise<Book> => {
  return fetcher<Book>("/books", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const associateBookToAuthor = (authorId: number, bookId: number): Promise<void> => {
  return fetcher<void>(`/authors/${authorId}/books/${bookId}`, {
    method: "POST",
  });
};

export const createReview = (bookId: number, review: Omit<Review, 'id'>): Promise<Review> => {
  return fetcher<Review>(`/books/${bookId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...review,
      reviewDate: new Date().toISOString().split('T')[0], // Formato YYYY-MM-DD
    }),
  });
};