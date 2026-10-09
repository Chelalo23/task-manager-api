import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/env";

export interface AuthRequest extends Request {
    user?: {
        userId: number;
        email: string;
    };
}

export function authenticateToken(
    req: AuthRequest,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Token de autenticación requerido"
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, config.jwtSecret);

        if (
            typeof decoded === "string" ||
            typeof decoded.userId !== "number" ||
            typeof decoded.email !== "string"
        ) {
            return res.status(401).json({
                message: "Token inválido"
            });
        }

        req.user = {
            userId: decoded.userId,
            email: decoded.email
        };

        return next();
    } catch {
        return res.status(401).json({
            message: "Token inválido o expirado"
        });
    }
}