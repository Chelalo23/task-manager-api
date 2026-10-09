import express from "express";
import { pool } from "./config/db";
import { config } from "./config/env";
import authRoutes from "./api/auth.routes";
import { authenticateToken, AuthRequest } from "./middlewares/auth.middleware";
import taskRoutes from "./api/task.routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRoutes);

app.use("/tasks", taskRoutes);

app.get("/auth/profile", authenticateToken, (req, res) => {
  const authReq = req as AuthRequest;

  return res.json({
    message: "Autenticación correcta",
    user: authReq.user
  });
});

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      message: "Task Manager API funcionando",
      databaseTime: result.rows[0].now
    });
  } catch (error) {
    console.error("Error conectando con PostgreSQL:", error);

    res.status(500).json({
      message: "Error de conexión con la base de datos"
    });
  }
});

app.use(errorMiddleware);

app.listen(config.port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${config.port}`);
});