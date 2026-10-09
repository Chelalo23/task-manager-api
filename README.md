# Task Manager API

API REST para la gestión de tareas, desarrollada con Node.js, Express, TypeScript y PostgreSQL. Incluye autenticación mediante JWT, validación de datos y documentación con Swagger.

## Tecnologías utilizadas

- Node.js
- Express
- TypeScript
- PostgreSQL
- JSON Web Tokens (JWT)
- bcrypt para el hash de contraseñas
- Zod para la validación de datos
- Swagger UI y JSDoc para la documentación

## Funcionalidades

- Registro de usuarios.
- Inicio de sesión con correo y contraseña.
- Contraseñas almacenadas mediante hash.
- Autenticación con JWT.
- Crear, consultar, actualizar y eliminar tareas.
- Acceso restringido a las tareas del usuario autenticado.
- Validación de los datos de entrada.
- Manejo centralizado de errores.
- Documentación interactiva con Swagger.

## Requisitos previos

Antes de ejecutar el proyecto, instala:

- Node.js y npm.
- PostgreSQL.
- Git, si deseas clonar el repositorio.

## Instalación

Clona el repositorio:

```bash
git clone https://github.com/Chelalo23/task-manager-api.git
cd task-manager-api
```

Instala las dependencias:

```bash
npm install
```

## Configuración de PostgreSQL

Crea una base de datos llamada `task_manager_db` en PostgreSQL.

Después, crea las tablas `users` y `tasks` con la estructura definida para el proyecto. La tabla `tasks` debe relacionarse con `users` mediante una clave foránea y almacenar el identificador del propietario de cada tarea.

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto tomando como referencia `.env.example`.

Configura las siguientes variables con los datos de tu entorno local:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=task_manager_db
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
JWT_SECRET=tu_secreto_seguro
JWT_EXPIRES_IN=1h
```

Ajusta los nombres de las variables para que coincidan con la configuración que utiliza el proyecto.

**Importante:** no publiques el archivo `.env`, contraseñas ni secretos JWT en el repositorio.

## Ejecutar el proyecto

Para iniciar el servidor en modo desarrollo:

```bash
npm run dev
```

Para compilar TypeScript:

```bash
npm run build
```

Para ejecutar la versión compilada:

```bash
npm start
```

## Documentación de la API

Con el servidor en ejecución, abre:

http://localhost:3000/api-docs

Swagger permite consultar los endpoints, sus parámetros, las respuestas y probar las solicitudes.

## Endpoints

### Autenticación

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/auth/register` | Registrar un usuario |
| POST | `/auth/login` | Iniciar sesión y obtener un JWT |
| GET | `/auth/profile` | Consultar el perfil autenticado |

### Tareas

Todas las rutas de tareas requieren autenticación mediante un token JWT.

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/tasks` | Crear una tarea |
| GET | `/tasks` | Listar las tareas propias |
| GET | `/tasks/:id` | Consultar una tarea |
| PUT | `/tasks/:id` | Actualizar una tarea |
| DELETE | `/tasks/:id` | Eliminar una tarea |

Para las rutas protegidas, envía el encabezado:

```http
Authorization: Bearer TU_TOKEN_JWT
```

Los estados permitidos para una tarea son `pendiente`, `en curso` y `completada`.

## Arquitectura

El proyecto utiliza una arquitectura por capas para separar responsabilidades:

- `src/api`: definición de rutas.
- `src/controllers`: recepción de solicitudes y respuestas HTTP.
- `src/services`: lógica de negocio.
- `src/persistence`: consultas y acceso a PostgreSQL.
- `src/config`: configuración de la aplicación y la base de datos.
- `src/middlewares`: autenticación y manejo de errores.
- `src/validators`: esquemas de validación.

## Autor

Proyecto desarrollado como parte de una prueba técnica de desarrollo backend.