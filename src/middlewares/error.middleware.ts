
import { Request, Response, NextFunction } from "express";

export class AppError extends Error {
    statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        this.name = "AppError";
    }
}

export function errorMiddleware(
    error: Error,
    req: Request,
    res: Response,
    next: NextFunction
) {
    if (res.headersSent) {
        return next(error);
    }

    if (error instanceof AppError) {
        return res.status(error.statusCode).json({
            message: error.message
        });
    }

    console.error("Error inesperado:", error);

    return res.status(500).json({
        message: "Error interno del servidor"
    });
}
