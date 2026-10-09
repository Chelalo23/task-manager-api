
import { Router } from "express";
import {
    createTaskController,
    getTasksController,
    getTaskController,
    updateTaskController,
    deleteTaskController
} from "../controllers/task.controller";
import { authenticateToken } from "../middlewares/auth.middleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tareas
 *   description: Gestión de tareas del usuario autenticado
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         usuario_id:
 *           type: integer
 *         titulo:
 *           type: string
 *         descripcion:
 *           type: string
 *           nullable: true
 *         fecha_vencimiento:
 *           type: string
 *           format: date
 *           nullable: true
 *         estado:
 *           type: string
 *           enum: [pendiente, en curso, completada]
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Crear una tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Estudiar TypeScript
 *               descripcion:
 *                 type: string
 *                 nullable: true
 *                 example: Repasar interfaces y tipos
 *               fecha_vencimiento:
 *                 type: string
 *                 format: date
 *                 nullable: true
 *                 example: "2026-10-20"
 *     responses:
 *       201:
 *         description: Tarea creada correctamente
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: Token requerido o inválido
 */
router.post("/", authenticateToken, createTaskController);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Listar las tareas del usuario autenticado
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de tareas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: "#/components/schemas/Task"
 *       401:
 *         description: Token requerido o inválido
 */
router.get("/", authenticateToken, getTasksController);

/**
 * @swagger
 * /tasks/{id}:
 *   get:
 *     summary: Consultar una tarea por ID
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador de la tarea
 *     responses:
 *       200:
 *         description: Tarea encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/Task"
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: Token requerido o inválido
 */
router.get("/:id", authenticateToken, getTaskController);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Actualizar una tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador de la tarea
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - estado
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: Terminar la prueba técnica
 *               descripcion:
 *                 type: string
 *                 nullable: true
 *               fecha_vencimiento:
 *                 type: string
 *                 format: date
 *                 nullable: true
 *                 example: "2026-10-25"
 *               estado:
 *                 type: string
 *                 enum: [pendiente, en curso, completada]
 *                 example: en curso
 *     responses:
 *       200:
 *         description: Tarea actualizada correctamente
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: Token requerido o inválido
 */
router.put("/:id", authenticateToken, updateTaskController);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Eliminar una tarea
 *     tags: [Tareas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Identificador de la tarea
 *     responses:
 *       200:
 *         description: Tarea eliminada correctamente
 *       404:
 *         description: Tarea no encontrada
 *       401:
 *         description: Token requerido o inválido
 */
router.delete("/:id", authenticateToken, deleteTaskController);

export default router;
