"use client";

import { useBook } from "@/modules/books/hooks/useBook";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { reviewSchema, ReviewFormData } from "@/modules/books/validation/bookSchema";
import { createReview } from "@/modules/books/services/bookService";
import { useNotificationStore } from "@/shared/store/useNotificationStore";

interface BookDetailPageProps {
  bookId: number;
}

export default function BookDetailPage({ bookId }: BookDetailPageProps) {
  const { book, isLoading, error, refetch } = useBook(bookId);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const { showNotification } = useNotificationStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 5,
      comment: "",
      reviewer: "",
    },
  });

  const onSubmitReview: SubmitHandler<ReviewFormData> = async (data) => {
    try {
      setIsSubmittingReview(true);
      await createReview(bookId, { ...data, reviewDate: new Date().toISOString() });
      showNotification("Review agregado exitosamente", "success");
      reset();
      refetch(); // Recargar el libro para mostrar el nuevo review
    } catch (error) {
      console.error("Error creating review:", error);
      showNotification("Error al agregar el review", "error");
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-xl text-white">📚 Cargando detalles del libro...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-xl text-red-400">❌ Error: {error}</div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-black">
        <div className="text-xl text-gray-300">📖 Libro no encontrado</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-black min-h-screen">
      {/* Detalles del libro */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6 mb-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Imagen del libro */}
          <div className="lg:col-span-1">
            <img
              src={book.image || "/placeholder-book.png"}
              alt={book.name}
              className="w-full max-w-sm mx-auto rounded-lg shadow-md"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "/placeholder-book.png";
              }}
            />
          </div>

          {/* Información del libro */}
          <div className="lg:col-span-2">
            <h1 className="text-3xl font-bold text-white mb-4">📖 {book.name}</h1>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center">
                <span className="font-semibold text-gray-300 w-32">📚 ISBN:</span>
                <span className="font-mono text-gray-400">{book.isbn}</span>
              </div>
              
              <div className="flex items-center">
                <span className="font-semibold text-gray-300 w-32">📅 Publicación:</span>
                <span className="text-gray-400">
                  {new Date(book.publishingDate).toLocaleDateString()}
                </span>
              </div>
              
              {book.editorial && (
                <div className="flex items-center">
                  <span className="font-semibold text-gray-300 w-32">🏢 Editorial:</span>
                  <span className="text-gray-400">{book.editorial.name}</span>
                </div>
              )}
              
              {book.authors && book.authors.length > 0 && (
                <div className="flex items-start">
                  <span className="font-semibold text-gray-300 w-32">✍️ Autores:</span>
                  <div className="text-gray-400">
                    {book.authors.map((author, index) => (
                      <span key={author.id}>
                        {author.name}
                        {index < book.authors!.length - 1 && ", "}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold text-white mb-3">📝 Descripción</h3>
              <p className="text-gray-300 leading-relaxed">{book.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Reviews */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-white mb-6">⭐ Reviews</h2>

        {/* Formulario para agregar review */}
        <div className="border-b pb-6 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">✨ Agregar Review</h3>
          <form onSubmit={handleSubmit(onSubmitReview)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Tu nombre
                </label>
                <input
                  {...register("reviewer")}
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                  placeholder="Ingresa tu nombre"
                />
                {errors.reviewer && (
                  <p className="mt-1 text-sm text-red-600">{errors.reviewer.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Calificación
                </label>
                <select
                  {...register("rating", { valueAsNumber: true })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                >
                  <option value={1}>⭐ 1 estrella</option>
                  <option value={2}>⭐⭐ 2 estrellas</option>
                  <option value={3}>⭐⭐⭐ 3 estrellas</option>
                  <option value={4}>⭐⭐⭐⭐ 4 estrellas</option>
                  <option value={5}>⭐⭐⭐⭐⭐ 5 estrellas</option>
                </select>
                {errors.rating && (
                  <p className="mt-1 text-sm text-red-600">{errors.rating.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Comentario
              </label>
              <textarea
                {...register("comment")}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-black"
                placeholder="Escribe tu review del libro..."
              />
              {errors.comment && (
                <p className="mt-1 text-sm text-red-600">{errors.comment.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmittingReview}
              className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmittingReview ? "Agregando..." : "Agregar Review"}
            </button>
          </form>
        </div>

        {/* Lista de reviews existentes */}
        <div className="space-y-4">
          {book.reviews && book.reviews.length > 0 ? (
            book.reviews.map((review) => (
              <div key={review.id} className="border border-gray-600 bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-white">
                      {review.reviewer || "Anónimo"}
                    </span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={i < review.rating ? "text-yellow-400" : "text-gray-500"}
                        >
                          ⭐
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className="text-sm text-gray-400">
                    {new Date(review.reviewDate).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-300">{review.comment}</p>
              </div>
            ))
          ) : (
            <div className="text-center py-8 bg-gray-800 rounded-lg border border-gray-600">
              <p className="text-gray-300">📝 No hay reviews para este libro aún.</p>
              <p className="text-sm text-gray-400">¡Sé el primero en agregar un review!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}