
import { Router } from "express";
import { register, login } from "../controllers/auth.controller";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Autenticación
 *   description: Registro e inicio de sesión de usuarios
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un usuario
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - email
 *               - password
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Jose Diaz
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jose.prueba@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: ClaveSegura123
 *     responses:
 *       201:
 *         description: Usuario registrado correctamente
 *       409:
 *         description: El correo ya está registrado
 */
router.post("/register", register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: jose.prueba@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: ClaveSegura123
 *     responses:
 *       200:
 *         description: Inicio de sesión correcto. Devuelve el token JWT.
 *       401:
 *         description: Correo o contraseña incorrectos
 */
router.post("/login", login);

export default router;
