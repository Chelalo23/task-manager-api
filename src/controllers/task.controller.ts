
import { Request, Response, NextFunction } from "express";
import {
    createTaskService,
    getTasksService,
    getTaskService,
    updateTaskService,
    deleteTaskService
} from "../services/task.service";
import {
    createTaskSchema,
    updateTaskSchema
} from "../validators/task.validator";
import { AppError } from "../middlewares/error.middleware";

export async function createTaskController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const validation = createTaskSchema.safeParse(req.body);

        if (!validation.success) {
            return res.status(400).json({
                message: "Datos de la tarea inválidos",
                errors: validation.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message
                }))
            });
        }

        const { titulo, descripcion, fecha_vencimiento } = validation.data;
        const usuarioId = (req as any).user.userId;

        const task = await createTaskService(
            usuarioId,
            titulo,
            descripcion ?? null,
            fecha_vencimiento ?? null
        );

        return res.status(201).json(task);
    } catch (error) {
        return next(error);
    }
}

export async function getTasksController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const usuarioId = (req as any).user.userId;
        const tasks = await getTasksService(usuarioId);

        return res.status(200).json(tasks);
    } catch (error) {
        return next(error);
    }
}

export async function getTaskController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const taskId = Number(req.params.id);
        const usuarioId = (req as any).user.userId;
        const task = await getTaskService(taskId, usuarioId);

        if (!task) {
            return next(new AppError("Tarea no encontrada", 404));
        }

        return res.status(200).json(task);
    } catch (error) {
        return next(error);
    }
}

export async function updateTaskController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const taskId = Number(req.params.id);
        const usuarioId = (req as any).user.userId;

        const validation = updateTaskSchema.safeParse({
            ...req.body,
            titulo: typeof req.body.titulo === "string"
                ? req.body.titulo.trim()
                : req.body.titulo
        });

        if (!validation.success) {
            return res.status(400).json({
                message: "Datos de la tarea inválidos",
                errors: validation.error.issues.map((issue) => ({
                    field: issue.path.join("."),
                    message: issue.message
                }))
            });
        }

        const {
            titulo,
            descripcion,
            fecha_vencimiento,
            estado
        } = validation.data;

        const task = await updateTaskService(
            taskId,
            usuarioId,
            titulo,
            descripcion ?? null,
            fecha_vencimiento ?? null,
            estado
        );

        if (!task) {
            return next(new AppError("Tarea no encontrada", 404));
        }

        return res.status(200).json(task);
    } catch (error) {
        return next(error);
    }
}

export async function deleteTaskController(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const taskId = Number(req.params.id);
        const usuarioId = (req as any).user.userId;
        const deleted = await deleteTaskService(taskId, usuarioId);

        if (!deleted) {
            return next(new AppError("Tarea no encontrada", 404));
        }

        return res.status(200).json({
            message: "Tarea eliminada correctamente"
        });
    } catch (error) {
        return next(error);
    }
}
