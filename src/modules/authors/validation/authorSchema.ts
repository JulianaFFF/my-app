import { z } from "zod";

export const authorSchema = z.object({
  name: z
    .string()
    .min(3, { message: "El nombre debe tener al menos 3 caracteres." })
    .max(100, { message: "El nombre no puede tener más de 100 caracteres." }),
  description: z
    .string()
    .min(10, { message: "La descripción debe tener al menos 10 caracteres." })
    .max(500, { message: "La descripción no puede tener más de 500 caracteres." }),
  birthDate: z
    .string()
    .min(1, { message: "La fecha de nacimiento es requerida." })
    .refine((date) => {
      const birthDate = new Date(date);
      const today = new Date();
      return birthDate < today;
    }, { message: "La fecha de nacimiento debe ser anterior a hoy." }),
  image: z
    .string()
    .min(1, { message: "La URL de la imagen es requerida." })
    .url({ message: "Debe ser una URL válida." }),

  book: z.object({
    name: z.string().min(1, "El nombre del libro es requerido"),
    isbn: z.string().min(10, "El ISBN debe tener al menos 10 caracteres"),
    image: z.string().url("Debe ser una URL válida para la imagen del libro"),
    publishingDate: z.string().min(1, "La fecha de publicación es requerida"),
    description: z.string().min(10, "La descripción del libro debe tener al menos 10 caracteres"),
  }),

  prize: z.object({
    premiationDate: z.string().min(1, "La fecha de premiación es requerida"),
    name: z.string().min(1, "El nombre del premio es requerido"),
    description: z.string().min(10, "La descripción del premio debe tener al menos 10 caracteres"),
    organizationId: z.number().min(1, "Debe seleccionar una organización"),
  }),
});

export type AuthorFormData = z.infer<typeof authorSchema>;