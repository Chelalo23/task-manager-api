
import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { AppError } from "../middlewares/error.middleware";

export async function register(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { nombre, email, password } = req.body;

        const user = await registerUser(nombre, email, password);

        return res.status(201).json({
            message: "Usuario registrado correctamente",
            user
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === "El correo ya está registrado"
        ) {
            return next(new AppError(error.message, 409));
        }

        return next(error);
    }
}

export async function login(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { email, password } = req.body;

        const result = await loginUser(email, password);

        return res.status(200).json(result);
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === "Credenciales inválidas"
        ) {
            return next(new AppError("Correo o contraseña incorrectos", 401));
        }

        return next(error);
    }
}
