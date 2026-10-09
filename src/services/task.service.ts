import {
    createTask,
    findTasksByUser,
    findTaskById,
    updateTask,
    deleteTask,
    Task
} from "../persistence/task.repository";

export async function createTaskService(
    usuarioId: number,
    titulo: string,
    descripcion: string | null,
    fechaVencimiento: string | null
): Promise<Task> {
    return await createTask(
        usuarioId,
        titulo,
        descripcion,
        fechaVencimiento
    );
}

export async function getTasksService(
    usuarioId: number
): Promise<Task[]>{
    return await findTasksByUser(usuarioId);
}

export async function getTaskService(
    taskId: number,
    usuarioId: number
): Promise<Task | null> {
    return await findTaskById(taskId, usuarioId);
}

export async function updateTaskService(
    taskId: number,
    usuarioId: number,
    titulo: string,
    descripcion: string | null,
    fechaVencimiento: string | null,
    estado: Task["estado"]
): Promise<Task | null> {
    return await updateTask(
        taskId,
        usuarioId,
        titulo,
        descripcion,
        fechaVencimiento,
        estado
    );
}

export async function deleteTaskService(
    taskId: number,
    usuarioId: number
): Promise<boolean> {
    return await deleteTask(taskId, usuarioId);
}