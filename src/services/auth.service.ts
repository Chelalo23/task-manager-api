import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
    createUser,
    findUserByEmail
} from "../persistence/user.repository";
import { config } from "../config/env";

export async function registerUser(
    nombre: string,
    email: string,
    password: string
) {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        throw new Error("El correo ya está registrado");
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await createUser(
        nombre,
        email,
        passwordHash
    );

    return {
        id: user.id,
        nombre: user.nombre,
        email: user.email
    };
}

export async function loginUser(
    email: string,
    password: string
) {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error("Credenciales inválidas");
    }

    const passwordIsValid = await bcrypt.compare(
        password,
        user.password_hash
    );
    if (!passwordIsValid) {
        throw new Error("Credenciales inválidas");
    }

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email
        },
        config.jwtSecret,
        {
            expiresIn: "1h"
        }
    );

    return {
        message: "Inicio de sesión exitoso",
        user: {
            id: user.id,
            nombre: user.nombre,
            email: user.email
        },
        token
    };
}

