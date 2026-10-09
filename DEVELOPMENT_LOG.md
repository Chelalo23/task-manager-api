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

Se utilizó ChatGPT como herramienta de apoyo para comprender conceptos, implementar funcionalidades, analizar errores y verificar el comportamiento de la API. Las sugerencias se revisaron antes de incorporarlas al proyecto y se contrastaron con pruebas de compilación y solicitudes HTTP.

### 3.1. Consultas y prompts

El historial disponible no constituye una transcripción literal completa de todas las consultas realizadas durante el desarrollo. Por transparencia, no se presentan reconstrucciones como si fueran citas exactas.

Los principales temas de consulta fueron:

- Implementación y comprobación del CRUD de tareas.
- Validación de solicitudes mediante Zod.
- Protección de rutas con JWT y comprobación de permisos por usuario.
- Manejo centralizado de errores.
- Configuración y documentación de Swagger.
- Diagnóstico de errores de compilación y configuración de variables de entorno.
- Preparación de la documentación del proyecto.

Para la entrega, las consultas que puedan recuperarse literalmente del historial deben registrarse como prompts exactos, indicando qué parte del código se aceptó, modificó o rechazó y cómo se verificó el resultado.

### 3.2. Decisiones sobre las sugerencias de IA

**Decisión 1. Corrección de la configuración JWT**

- **Problema:** La configuración inicial no leía correctamente la variable `JWT_EXPIRES_IN` y presentaba un error al generar tokens.
- **Acción:** Se corrigió la inicialización del patrón Singleton y la lectura de la variable de expiración. También se ajustó la opción `expiresIn` al generar el token.
- **Resultado:** Se ejecutó la compilación de TypeScript y se comprobó que el inicio de sesión generara un token correctamente.
- **Evaluación:** Se aceptó la corrección después de verificar su funcionamiento.

**Decisión 2. Protección de las tareas por propietario**

- **Problema:** Era necesario evitar que un usuario pudiera consultar, modificar o eliminar las tareas de otra cuenta.
- **Acción:** Se verificó el comportamiento de las operaciones protegidas utilizando dos usuarios diferentes y sus respectivos tokens.
- **Resultado:** Las solicitudes del segundo usuario para consultar, modificar y eliminar una tarea ajena devolvieron `404 Tarea no encontrada`. El propietario pudo consultar la tarea y se comprobó que continuaba intacta.
- **Evaluación:** Se mantuvo la implementación después de comprobar su comportamiento mediante solicitudes HTTP.

### 3.3. Verificación del código

Las verificaciones realizadas durante el desarrollo incluyeron:

- `npm.cmd run build` para comprobar la compilación de TypeScript.
- Registro e inicio de sesión de usuarios.
- Acceso a rutas protegidas con y sin token.
- Validación de datos incorrectos en las tareas.
- Pruebas de creación, consulta, actualización y eliminación.
- Pruebas de aislamiento de tareas entre usuarios.
- Consulta de la documentación Swagger.
- Comprobación del endpoint principal y de la conexión con PostgreSQL.

Las verificaciones descritas corresponden a pruebas ejecutadas durante el desarrollo. No implican que se haya realizado una suite automatizada completa.


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
- Actualización correcta de una tarea propia mediante PUT.
- Persistencia de los cambios al consultar mediante GET.
- Eliminación correcta de una tarea temporal mediante DELETE.
- Respuesta 404 al consultar la tarea eliminada.
- Confirmación de que las tareas de otros usuarios están protegidas.
- Compilación final exitosa con npm.cmd run build.
- Repositorio sincronizado con GitHub y sin cambios pendientes.

Estos resultados corresponden a las verificaciones realizadas durante el desarrollo. 
Las pruebas manuales principales, la compilación final y la revisión del estado del repositorio se completaron. 
Queda pendiente preparar y grabar el video explicativo de la prueba técnica y añadir su enlace cuando esté disponible.

## 6. Tareas pendientes para la entrega

- [x] Revisar el archivo `.env.example` para comprobar que contiene las variables necesarias sin exponer credenciales reales.
- [x] Revisar la coherencia del `README.md` con la estructura y el funcionamiento de la API.
- [x] Completar las pruebas manuales principales de autenticación, validaciones, CRUD y aislamiento entre usuarios.
- [x] Ejecutar la compilación final mediante `npm.cmd run build`.
- [x] Verificar que el repositorio esté sincronizado con GitHub y sin cambios pendientes.
- [ ] Revisar el historial de conversación disponible para recuperar los prompts literales de IA que puedan documentarse con certeza. No inventar citas textuales.
- [ ] Preparar y grabar el video explicativo de la prueba técnica.
- [ ] Añadir al registro el enlace del video cuando esté disponible.

