
import { z } from "zod";

export const createTaskSchema = z.object({
    titulo: z.string()
        .trim()
        .min(1, "El título es obligatorio")
        .max(200, "El título no puede superar los 200 caracteres"),

    descripcion: z.string()
        .nullable()
        .optional(),

    fecha_vencimiento: z.string()
        .date("La fecha debe tener el formato YYYY-MM-DD")
        .nullable()
        .optional()
});

export const updateTaskSchema = createTaskSchema.extend({
    estado: z.enum(
        ["pendiente", "en curso", "completada"],
        "El estado debe ser pendiente, en curso o completada"
    )
});
