"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authorSchema, AuthorFormData } from "@/modules/authors/validation/authorSchema";
import { useState, useEffect } from "react";
import { fetchOrganizations } from "@/modules/prizes/services/prizeService";

interface AuthorFormProps {
  onSubmit: SubmitHandler<AuthorFormData>;
  defaultValues?: Partial<AuthorFormData>;
  isSubmitting?: boolean;
  submitText?: string;
}

export default function AuthorForm({
  onSubmit,
  defaultValues,
  isSubmitting = false,
  submitText = "Guardar Autor",
}: AuthorFormProps) {
  const [organizations, setOrganizations] = useState<any[]>([]);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
    defaultValues: defaultValues || {
      name: "",
      description: "",
      birthDate: "",
      image: "",
      book: {
        name: "",
        isbn: "",
        image: "",
        publishingDate: "",
        description: "",
      },
      prize: {
        premiationDate: "",
        name: "",
        description: "",
        organizationId: 1,
      },
    },
  });

  useEffect(() => {
    const loadOrganizations = async () => {
      try {
        const orgs = await fetchOrganizations();
        setOrganizations(orgs);
      } catch (error) {
        console.error("Error loading organizations:", error);
        // Si no hay organizaciones, usar una por defecto
        setOrganizations([{ id: 1, name: "Organización Default", tipo: "Premio" }]);
      }
    };
    loadOrganizations();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        
        {/* Información del Autor */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Información del Autor</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                {...register("name")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Nacimiento
              </label>
              <input
                {...register("birthDate")}
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.birthDate && (
                <p className="mt-1 text-sm text-red-600">{errors.birthDate.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Imagen (URL)
              </label>
              <input
                {...register("image")}
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción
              </label>
              <textarea
                {...register("description")}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Información del Libro */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Información del Libro</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título del Libro
              </label>
              <input
                {...register("book.name")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.book?.name && (
                <p className="mt-1 text-sm text-red-600">{errors.book.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                ISBN
              </label>
              <input
                {...register("book.isbn")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.book?.isbn && (
                <p className="mt-1 text-sm text-red-600">{errors.book.isbn.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Publicación
              </label>
              <input
                {...register("book.publishingDate")}
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.book?.publishingDate && (
                <p className="mt-1 text-sm text-red-600">{errors.book.publishingDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Imagen del Libro (URL)
              </label>
              <input
                {...register("book.image")}
                type="url"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.book?.image && (
                <p className="mt-1 text-sm text-red-600">{errors.book.image.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción del Libro
              </label>
              <textarea
                {...register("book.description")}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.book?.description && (
                <p className="mt-1 text-sm text-red-600">{errors.book.description.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Información del Premio */}
        <div className="border-b pb-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Información del Premio</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nombre del Premio
              </label>
              <input
                {...register("prize.name")}
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.prize?.name && (
                <p className="mt-1 text-sm text-red-600">{errors.prize.name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fecha de Premiación
              </label>
              <input
                {...register("prize.premiationDate")}
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.prize?.premiationDate && (
                <p className="mt-1 text-sm text-red-600">{errors.prize.premiationDate.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Organización
              </label>
              <select
                {...register("prize.organizationId", { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Seleccionar organización</option>
                {organizations.map((org) => (
                  <option key={org.id} value={org.id}>
                    {org.name}
                  </option>
                ))}
              </select>
              {errors.prize?.organizationId && (
                <p className="mt-1 text-sm text-red-600">{errors.prize.organizationId.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descripción del Premio
              </label>
              <textarea
                {...register("prize.description")}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.prize?.description && (
                <p className="mt-1 text-sm text-red-600">{errors.prize.description.message}</p>
              )}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Guardando..." : submitText}
        </button>
      </form>
    </div>
  );
}