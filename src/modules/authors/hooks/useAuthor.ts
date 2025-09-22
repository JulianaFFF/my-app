"use client";

import { useState, useEffect } from "react";
import { Author } from "@/modules/authors/types";
import { fetchAuthorById } from "@/modules/authors/services/authorService";

export function useAuthor(id: number) {
  const [author, setAuthor] = useState<Author | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadAuthor = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchAuthorById(id);
      setAuthor(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error desconocido al cargar el autor.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      loadAuthor();
    }
  }, [id]);

  return { author, isLoading, error, refetch: loadAuthor };
}