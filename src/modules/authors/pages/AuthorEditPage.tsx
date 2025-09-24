"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AuthorForm from "@/modules/authors/ui/AuthorForm";
import { AuthorFormData } from "@/modules/authors/validation/authorSchema";
import { updateAuthor } from "@/modules/authors/services/authorService";
import { useAuthor } from "@/modules/authors/hooks/useAuthor";
import { useNotificationStore } from "@/shared/store/useNotificationStore";

interface AuthorEditPageProps {
  authorId: number;
}

export default function AuthorEditPage({ authorId }: AuthorEditPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const showNotification = useNotificationStore((state) => state.showNotification);
  const { author, isLoading, error: fetchError } = useAuthor(authorId);

  const handleUpdateAuthor = async (data: AuthorFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await updateAuthor(authorId, data);
      showNotification("Autor actualizado exitosamente", "success");
      router.push("/autor"); 
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Ocurrió un error al actualizar el autor";
      setError(errorMessage);
      showNotification(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Editar Autor</h1>
          <p className="text-lg">Cargando datos del autor...</p>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Editar Autor</h1>
          <div className="text-red-500 mb-4">{fetchError}</div>
          <button 
            onClick={() => router.push("/autor")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Volver a la lista
          </button>
        </div>
      </div>
    );
  }

  if (!author) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Autor no encontrado</h1>
          <button 
            onClick={() => router.push("/autor")}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Volver a la lista
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Editar Autor: {author.name}</h1>
      
      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-300">
          {error}
        </div>
      )}

      <AuthorForm 
        onSubmit={handleUpdateAuthor} 
        isSubmitting={isSubmitting}
        submitText="Actualizar Autor"
      />
    </div>
  );
}