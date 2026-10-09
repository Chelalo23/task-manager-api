# Registro de desarrollo

## 1. Información general del proyecto

**Nombre:** Task Manager API

**Objetivo:** Desarrollar una API REST que permita a los usuarios registrarse, iniciar sesión y administrar sus propias tareas mediante endpoints protegidos.

**Tecnologías utilizadas:**
- Node.js
- Express
- TypeScript
- PostgreSQL
- JSON Web Token (JWT)
- bcrypt
- Zod
- Swagger

## 2. Decisiones técnicas

### 2.1. Arquitectura por capas

**Decisión:** Organizar el proyecto en módulos separados para rutas, controladores, servicios, persistencia, configuración, middlewares y validaciones.

**Justificación:** Separar las responsabilidades facilita la comprensión, el mantenimiento y las futuras modificaciones del código.

**Implementación:** Las rutas definen los endpoints; los controladores gestionan las solicitudes y respuestas HTTP; los servicios contienen la lógica de negocio; los módulos de persistencia ejecutan las consultas a la base de datos.

### 2.2. Uso de PostgreSQL y consultas parametrizadas

**Decisión:** Utilizar PostgreSQL como sistema de gestión de base de datos y consultas parametrizadas para las operaciones.

**Justificación:** PostgreSQL permite relacionar usuarios con sus tareas mediante claves foráneas. Las consultas parametrizadas ayudan a prevenir ataques de inyección SQL.

**Implementación:** Cada tarea está relacionada con un usuario mediante el campo `usuario_id`. Las consultas de búsqueda, actualización y eliminación verifican el identificador del usuario propietario.

### 2.3. Autenticación mediante JWT y cifrado de contraseñas

**Decisión:** Utilizar JWT para autenticar las solicitudes y bcrypt para almacenar las contraseñas de forma segura mediante hashes.

**Justificación:** Es necesario verificar la identidad de los usuarios y evitar almacenar sus contraseñas en texto plano.

**Implementación:** Durante el registro, la contraseña se procesa con bcrypt. Durante el inicio de sesión, se compara la contraseña ingresada con el hash almacenado. Si las credenciales son correctas, se genera un token JWT.

### 2.4. Validación de datos con Zod

**Decisión:** Utilizar Zod para validar los datos recibidos al crear y actualizar tareas.

**Justificación:** Validar las solicitudes antes de procesarlas ayuda a evitar datos incorrectos y facilita la devolución de mensajes de error comprensibles.

**Implementación:** Se crearon esquemas para validar el título, la fecha de vencimiento y el estado de las tareas.

### 2.5. Manejo centralizado de errores

**Decisión:** Implementar una clase personalizada `AppError` y un middleware centralizado para gestionar errores.

**Justificación:** Centralizar el manejo de errores permite mantener respuestas consistentes y separar la lógica de negocio de la gestión de errores HTTP.

**Implementación:** Los controladores envían los errores al middleware mediante `next(error)`, donde se determina la respuesta correspondiente.

### 2.6. Documentación con Swagger

**Decisión:** Utilizar Swagger UI y anotaciones JSDoc para documentar los endpoints.

**Justificación:** La documentación interactiva facilita la comprensión y las pruebas de la API sin depender exclusivamente de herramientas externas.

**Implementación:** Se documentaron las rutas de autenticación y las operaciones CRUD de tareas. La documentación se encuentra disponible en `/api-docs` cuando el servidor está en ejecución.

## 3. Uso de inteligencia artificial

Se utilizó inteligencia artificial como herramienta de apoyo durante el desarrollo para comprender conceptos, revisar implementaciones, resolver errores y mejorar la documentación.

Las sugerencias se aplicaron al proyecto y se verificaron mediante la compilación de TypeScript y solicitudes HTTP de prueba.

### 3.1. Consultas realizadas durante el desarrollo

A continuación se describen los temas consultados durante el proceso. Esta sección contiene resúmenes de las consultas, no una transcripción literal completa del historial.

1. Implementación y pruebas de las operaciones CRUD de tareas.
2. Integración de validaciones con Zod en los controladores.
3. Implementación de un sistema centralizado de manejo de errores.
4. Configuración de Swagger y documentación de los endpoints.
5. Corrección de la configuración de variables de entorno y expiración del JWT.
6. Elaboración y revisión del archivo README.
7. Verificación de la autenticación y protección de rutas mediante JWT.

### 3.2. Revisión y verificación del código generado con apoyo de IA

Las modificaciones se comprobaron mediante diferentes verificaciones:

- Ejecución de `npm.cmd run build` para comprobar la compilación de TypeScript.
- Pruebas de registro e inicio de sesión.
- Pruebas de acceso a una ruta protegida sin token y con token.
- Pruebas de creación, consulta, actualización y eliminación de tareas.
- Envío de datos inválidos para verificar las respuestas de validación.
- Consulta de tareas inexistentes para verificar el manejo de errores.
- Revisión de la documentación de Swagger.
- Consulta del endpoint principal para comprobar la conexión con PostgreSQL.

## 4. Dificultades encontradas y soluciones aplicadas

### 4.1. Configuración de variables de entorno

**Dificultad:** La configuración inicial presentaba problemas en la implementación del patrón Singleton y en la lectura de la variable de expiración del token JWT.

**Solución:** Se corrigió la inicialización de la configuración y se ajustó la lectura de `JWT_EXPIRES_IN`.

### 4.2. Validación de los datos de las tareas

**Dificultad:** Era necesario impedir que se procesaran tareas con información inválida.

**Solución:** Se implementaron esquemas de validación con Zod para controlar el título, la fecha de vencimiento y los estados permitidos.

### 4.3. Manejo de errores

**Dificultad:** Era necesario evitar que cada controlador gestionara de manera independiente todos los errores inesperados.

**Solución:** Se creó un middleware centralizado y una clase `AppError` para manejar los errores de la aplicación de manera consistente.

### 4.4. Documentación de Swagger

**Dificultad:** Inicialmente, Swagger no mostraba las operaciones disponibles de la API.

**Solución:** Se agregaron anotaciones JSDoc a las rutas y se ajustó la configuración para que Swagger pudiera identificar y mostrar los endpoints.

### 4.5. Ejecución de comandos en PowerShell

**Dificultad:** PowerShell impedía ejecutar directamente algunos comandos de npm debido a las restricciones de ejecución de scripts.

**Solución:** Se utilizó `npm.cmd` para ejecutar los comandos necesarios, como la compilación y las pruebas de desarrollo.

## 5. Resultados de las verificaciones

Durante el desarrollo se obtuvieron los siguientes resultados:

- La compilación de TypeScript finalizó sin errores en las verificaciones realizadas.
- El endpoint principal respondió correctamente y devolvió una marca de tiempo de PostgreSQL.
- El registro y el inicio de sesión de usuarios fueron probados.
- Las rutas protegidas rechazaron las solicitudes sin token de autenticación.
- Las validaciones rechazaron datos de tareas incorrectos.
- La consulta de una tarea inexistente devolvió el mensaje de error esperado.
- Swagger mostró las operaciones documentadas de autenticación y gestión de tareas.

Estos resultados corresponden a las verificaciones realizadas durante el desarrollo. Antes de la entrega final se debe completar una revisión general de los endpoints y del repositorio.

## 6. Tareas pendientes para la entrega

- Revisar que `.env.example` coincida con las variables utilizadas por la aplicación.
- Ejecutar una ronda final de pruebas de los endpoints.
- Verificar que el README corresponda con la configuración actual.
- Revisar los cambios pendientes en Git.
- Crear el commit final y subir los cambios a GitHub.
- Preparar el video explicativo de la solución.

