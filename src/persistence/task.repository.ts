import { pool } from "../config/db";

export interface Task {
    id: number;
    usuario_id: number;
    titulo: string;
    descripcion: string | null;
    fecha_vencimiento: string | null;
    estado: "pendiente" | "en curso" | "completada";
    created_at: Date;
    updated_at: Date;
}

export async function createTask(
    usuarioId: number,
    titulo: string,
    descripcion: string | null,
    fechaVencimiento: string | null
): Promise<Task> {
    const result = await pool.query(
    `INSERT INTO tasks (
    usuario_id,
    titulo,
    descripcion,
    fecha_vencimiento
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *`,
    [usuarioId, titulo, descripcion, fechaVencimiento]
    );

    return result.rows[0];  
}

export async function findTasksByUser(
    usuarioId: number
): Promise<Task[]> {
    const result = await pool.query(
        `SELECT * FROM tasks
        WHERE usuario_id = $1
        ORDER BY created_at DESC`,
        [usuarioId]
    );

    return result.rows;
}

export async function findTaskById(
    taskId: number,
    usuarioId: number
): Promise<Task | null> {
    const result = await pool.query(
        `SELECT *
        FROM tasks
        WHERE id = $1 and usuario_id = $2`,
        [taskId, usuarioId]
    );

    return result.rows[0] ?? null;
}


export async function updateTask(
    taskId: number,
    usuarioId: number,
    titulo: string,
    descripcion: string | null,
    fechaVencimiento: string | null,
    estado: Task["estado"]
): Promise<Task | null> {
    const result = await pool.query(
        `UPDATE tasks
         SET titulo = $1,
             descripcion = $2,
             fecha_vencimiento = $3,
             estado = $4,
             updated_at = NOW()
         WHERE id = $5 AND usuario_id = $6
         RETURNING *`,
        [
            titulo,
            descripcion,
            fechaVencimiento,
            estado,
            taskId,
            usuarioId
        ]
    );

    return result.rows[0] ?? null;
}

export async function deleteTask(
    taskId: number,
    usuarioId: number
): Promise<boolean> {
    const result = await pool.query(
        `DELETE FROM tasks
        WHERE id = $1 AND usuario_id = $2
        RETURNING id`,
        [taskId, usuarioId]
    );

    return (result.rowCount ?? 0) > 0;
}

