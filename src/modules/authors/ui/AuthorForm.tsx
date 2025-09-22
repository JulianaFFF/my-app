"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  authorSchema,
  AuthorFormData,
} from "@/modules/authors/validation/authorSchema";

interface AuthorFormProps {
  onSubmit: SubmitHandler<AuthorFormData>;
  defaultValues?: AuthorFormData;
  isSubmitting: boolean;
  submitText?: string;
}

export default function AuthorForm({
  onSubmit,
  defaultValues,
  isSubmitting,
  submitText = "Guardar Autor",
}: AuthorFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthorFormData>({
    resolver: zodResolver(authorSchema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-md">
      {/* Campo Nombre */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
          Nombre del Autor
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ejemplo: Gabriel García Márquez"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      {/* Campo Descripción */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
          Descripción
        </label>
        <textarea
          id="description"
          {...register("description")}
          rows={4}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Describe al autor, su estilo literario, obras principales..."
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
        )}
      </div>

      {/* Campo Fecha de Nacimiento */}
      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
          Fecha de Nacimiento
        </label>
        <input
          id="birthDate"
          type="date"
          {...register("birthDate")}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.birthDate && (
          <p className="text-red-500 text-sm mt-1">{errors.birthDate.message}</p>
        )}
      </div>

      {/* Campo Imagen */}
      <div>
        <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
          URL de la Imagen
        </label>
        <input
          id="image"
          type="url"
          {...register("image")}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://ejemplo.com/imagen-del-autor.jpg"
        />
        {errors.image && (
          <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
        )}
      </div>

      {/* Botón de Envío */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200"
      >
        {isSubmitting ? "Guardando..." : submitText}
      </button>
    </form>
  );
}