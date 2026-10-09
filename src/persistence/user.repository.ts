import { pool } from "../config/db";

export interface User {
    id: number;
    nombre: String;
    email: String;
    password_hash: string;
}

export async function findUserByEmail(email: string): Promise<User | null> {
    const result = await pool.query(
        "SELECT id, nombre, email, password_hash FROM users WHERE email = $1",
       [email] 
    );

    return result.rows[0] ?? null;
}

export async function createUser(
    nombre: string,
    email: string,
    passwordHash: string,
): Promise<User> {
const result = await pool.query(
`INSERT INTO users (nombre, email, password_hash)
VALUES ($1, $2, $3)
RETURNING id, nombre, email, password_hash`,
[nombre, email, passwordHash]
);

    return result.rows[0];
}