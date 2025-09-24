"use client";

import { useState, useEffect } from "react";
import { Book } from "@/modules/books/types";
import { fetchBookById } from "@/modules/books/services/bookService";
import { useBooks } from "./useBooks";

export function useBook(id: number) {
  const [book, setBook] = useState<Book | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadBook = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const bookData = await fetchBookById(id);
      setBook(bookData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      console.error("Error loading book:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const refetch = () => {
    loadBook();
  };

  useEffect(() => {
    if (id) {
      loadBook();
    }
  }, [id]);

  return {
    book,
    isLoading,
    error,
    refetch,
  };
}
export default useBook;