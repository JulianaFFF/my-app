"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AuthorForm from "@/modules/authors/ui/AuthorForm";
import { AuthorFormData } from "@/modules/authors/validation/authorSchema";
import { createAuthor } from "@/modules/authors/services/authorService";
import { useNotificationStore } from "@/shared/store/useNotificationStore";

export default function AuthorCreatePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const showNotification = useNotificationStore((state) => state.showNotification);

  const handleCreateAuthor = async (data: AuthorFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await createAuthor(data);
      showNotification("Autor creado exitosamente", "success");
      router.push("/autor"); 
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Ocurrió un error al crear el autor";
      setError(errorMessage);
      showNotification(errorMessage, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Crear Nuevo Autor</h1>
      
      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700 border border-red-300">
          {error}
        </div>
      )}

      <AuthorForm 
        onSubmit={handleCreateAuthor} 
        isSubmitting={isSubmitting}
        submitText="Crear Autor"
      />
    </div>
  );
}