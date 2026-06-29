# API de autenticación con JWT

Proyecto backend educativo que implementa registro, inicio de sesión y acceso a rutas protegidas. La API persiste usuarios en MongoDB, cifra contraseñas y valida sesiones mediante tokens JWT y Passport.

## Funcionalidades

- Registro de usuarios con contraseña cifrada.
- Inicio de sesión y generación de JWT.
- Ruta protegida mediante estrategia `passport-jwt`.
- Persistencia de usuarios con MongoDB y Mongoose.
- Configuración separada para conexión y autenticación.

## Stack

- Node.js y JavaScript
- Express
- MongoDB y Mongoose
- Passport y Passport JWT
- JSON Web Tokens
- bcrypt
- dotenv

## Estructura

- `src/app.js`: configuración y arranque del servidor.
- `src/routes/`: endpoints de usuarios y rutas protegidas.
- `src/models/`: modelo de usuario.
- `src/config/`: conexión a MongoDB y estrategia Passport.

## Ejecución local

```bash
npm install
npm run dev
```

Crear un archivo `.env` con:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/auth-api
JWT_SECRET=una_clave_segura
```

Comandos disponibles: `npm start` para ejecución normal y `npm run dev` para desarrollo con Nodemon.

> Proyecto realizado con fines educativos. No se deben versionar credenciales reales.