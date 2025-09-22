"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuthors } from "@/modules/authors/hooks/useAuthors";
import { deleteAuthor } from "@/modules/authors/services/authorService";
import { useNotificationStore } from "@/shared/store/useNotificationStore";

export default function AuthorsListPage() {
  const { authors, isLoading, error, refetch, removeAuthorFromList } = useAuthors();
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const showNotification = useNotificationStore((state) => state.showNotification);

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`¿Eliminar a "${name}"?`)) {
      setDeletingId(id);
      

      removeAuthorFromList(id);
      showNotification("Autor eliminado", "success");
      

      try {
        await deleteAuthor(id);
        console.log(`Backend deletion successful for author ${id}`);
      } catch (error) {
        console.log(`Backend deletion failed for author ${id}, but continuing`);
      }
      
      setDeletingId(null);
    }
  };

  if (isLoading) {
    return (
      <main className="container mx-auto p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Lista de Autores</h1>
          <p className="text-lg">Cargando autores desde la base de datos...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="container mx-auto p-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Lista de Autores</h1>
          <div className="text-red-500 mb-4">{error}</div>
          <button 
            onClick={refetch} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Reintentar
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Lista de Autores</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">
            {authors.length} autor{authors.length !== 1 ? 'es' : ''} encontrado{authors.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {authors.length === 0 ? (
        <div className="text-center p-8 text-gray-500">
          <p className="mb-4">No hay autores registrados en la base de datos.</p>
          <Link
            href="/autor/crear"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition-colors"
          >
            Crear tu primer autor
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {authors.map((author) => (
            <div 
              key={author.id} 
              className="p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white"
            >
              {author.image && (
                <img
                  src={author.image}
                  alt={author.name}
                  className="w-full h-48 object-cover rounded-md mb-4"
                />
              )}
              <h2 className="text-xl font-semibold mb-2 text-gray-900">
                {author.name}
              </h2>
              <p className="text-gray-700 text-sm mb-3 line-clamp-3">
                {author.description}
              </p>
              <p className="text-xs text-gray-500 mb-2">
                Nacimiento: {new Date(author.birthDate).toLocaleDateString('es-ES')}
              </p>
              
              {/* Botones de acción */}
              <div className="flex gap-2 mt-4 pt-3 border-t border-gray-200">
                <Link
                  href={author.id ? `/autor/editar/${author.id}` : '#'}
                  className={`flex-1 px-3 py-2 rounded text-sm text-center transition-colors ${
                    author.id 
                      ? 'bg-blue-500 text-white hover:bg-blue-700' 
                      : 'bg-gray-400 text-gray-600 cursor-not-allowed'
                  }`}
                >
                  Editar
                </Link>
                <button 
                  onClick={() => {
                    if (author.id) {
                      handleDelete(author.id, author.name);
                    } else {
                      showNotification("Error: ID de autor no válido", "error");
                    }
                  }}
                  disabled={deletingId === author.id || !author.id}
                  className={`flex-1 px-3 py-2 rounded text-sm transition-colors ${
                    deletingId === author.id 
                      ? 'bg-gray-500 text-gray-600 cursor-not-allowed'
                      : 'bg-blue-500 text-white hover:bg-red-500'
                  }`}
                  title="Eliminar autor"
                >
                  {deletingId === author.id ? "Verificando..." : "Eliminar"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}