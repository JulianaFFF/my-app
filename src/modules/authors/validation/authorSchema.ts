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
});

export type AuthorFormData = z.infer<typeof authorSchema>;