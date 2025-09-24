import { z } from "zod";

export const bookSchema = z.object({
  name: z.string().min(1, "El nombre del libro es requerido"),
  isbn: z.string().min(10, "El ISBN debe tener al menos 10 caracteres"),
  image: z.string().url("Debe ser una URL válida"),
  publishingDate: z.string().min(1, "La fecha de publicación es requerida"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
});

export const reviewSchema = z.object({
  rating: z.number().min(1, "La calificación mínima es 1").max(5, "La calificación máxima es 5"),
  comment: z.string().min(10, "El comentario debe tener al menos 10 caracteres"),
  reviewer: z.string().min(1, "El nombre del reviewer es requerido"),
});

export type BookFormData = z.infer<typeof bookSchema>;
export type ReviewFormData = z.infer<typeof reviewSchema>;