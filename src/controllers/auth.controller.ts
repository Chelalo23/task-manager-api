import { Request, Response } from "express";
import { registerUser, loginUser } from "../services/auth.service";

export async function register(req: Request, res: Response) {
    try {
        const {nombre, email, password} = req.body;

        const user = await registerUser(nombre, email, password);

        return res.status(201).json({
            message: "Usuario registrado correctamente",
            user
        });
    }catch (error) {
        if (
            error instanceof Error && error.message === "El correo ya está registrado") {
            return res.status(409).json({
                message: error.message
            });
        }

        console.error(error);

        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}

export async function login(req: Request, res: Response) {
    try {
        const {email, password} = req.body;

        const result = await loginUser(email, password);

        return res.status(200).json(result);
    }catch (error) {
        if (
            error instanceof Error &&
            error.message === "Credenciales inválidas"
        ) {
            return res.status(401).json({
                message: "Correo o contraseña incorrectos"
            });
        }

        console.error(error);

        return res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}