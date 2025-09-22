"use client";

import { useState, useEffect } from "react";
import { Author } from "@/modules/authors/types";
import { fetchAuthors } from "@/modules/authors/services/authorService";

export function useAuthors() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadAuthors = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchAuthors();
      console.log("Authors loaded:", data);
      console.log("Author IDs:", data.map(author => ({ id: author.id, name: author.name })));
      setAuthors(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error desconocido al cargar los autores.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAuthors();
  }, []);

  const removeAuthorFromList = (id: number) => {
    setAuthors(prevAuthors => prevAuthors.filter(author => author.id !== id));
  };

  
  return { 
    authors, 
    isLoading, 
    error, 
    refetch: loadAuthors,
    removeAuthorFromList 
  };
}