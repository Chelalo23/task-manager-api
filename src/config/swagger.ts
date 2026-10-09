
import swaggerJsdoc from "swagger-jsdoc";

const swaggerOptions: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Task Manager API",
            version: "1.0.0",
            description: "API REST para gestionar tareas con autenticación JWT"
        },
        servers: [
            {
                url: "http://localhost:3000",
                description: "Servidor local de desarrollo"
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    description: "Introduce el token JWT obtenido al iniciar sesión"
                }
            }
        }
    },
    apis: ["./src/api/*.ts"]
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
