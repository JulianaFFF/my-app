"use client";

import { useBooks } from "@/modules/books/hooks/useBooks";
import Link from "next/link";

export default function BooksListPage() {
  const { books, isLoading, error } = useBooks();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Cargando libros...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Lista de Libros</h1>
        <div className="text-sm text-gray-600">
          {books.length} libros encontrados
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden"
          >
            <div className="aspect-w-3 aspect-h-4 bg-gray-200">
              <img
                src={book.image || "/placeholder-book.png"}
                alt={book.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder-book.png";
                }}
              />
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
                {book.name}
              </h3>
              
              <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                {book.description}
              </p>
              
              <div className="text-sm text-gray-500 mb-3">
                <div className="flex justify-between">
                  <span>ISBN:</span>
                  <span className="font-mono">{book.isbn}</span>
                </div>
                <div className="flex justify-between mt-1">
                  <span>Publicación:</span>
                  <span>{new Date(book.publishingDate).toLocaleDateString()}</span>
                </div>
              </div>

              <Link
                href={`/libros/${book.id}`}
                className="block w-full bg-blue-600 text-white text-center py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300"
              >
                Ver Detalles
              </Link>
            </div>
          </div>
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-xl">No se encontraron libros</div>
          <p className="text-gray-400 mt-2">
            Los libros aparecerán aquí cuando se creen autores con libros asociados.
          </p>
        </div>
      )}
    </div>
  );
}