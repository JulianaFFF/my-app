import { z } from "zod";

export const prizeSchema = z.object({
  premiationDate: z.string().min(1, "La fecha de premiación es requerida"),
  name: z.string().min(1, "El nombre del premio es requerido"),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  organization: z.object({
    id: z.number(),
    name: z.string(),
    tipo: z.string(),
  }),
});

export type PrizeFormData = z.infer<typeof prizeSchema>;