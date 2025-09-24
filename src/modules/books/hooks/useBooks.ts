"use client";

import { useState, useEffect } from "react";
import { Book } from "@/modules/books/types";
import { fetchBooks } from "@/modules/books/services/bookService";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadBooks = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const booksData = await fetchBooks();
      setBooks(booksData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error("Error loading books:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    loadBooks();
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return {
    books,
    isLoading,
    error,
    refetch,
  };
}
export default useBooks;