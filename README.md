# Bitácora del Aventurero

Aplicación web RPG de hábitos. Frontend separado (HTML, CSS y JS), backend Express y base de datos SQLite.

## Requisitos
- Node.js 20 o superior (recomendado)
- npm

## Ejecutar en tu computadora
1. Descomprimí el proyecto.
2. Abrí una terminal dentro de la carpeta `bitacora-aventurero`.
3. Instalá dependencias: `npm install`
4. (Recomendado) Copiá `.env.example` a `.env` y configurá `SESSION_SECRET` con un valor aleatorio largo. Para cargar `.env`, ejecutá `npm install dotenv` y agregá `require('dotenv').config()` al inicio de `server.js`, o definí las variables de entorno desde la terminal.
5. Iniciá: `npm start`
6. Abrí http://localhost:3000

Los perfiles se guardan en `data/bitacora.sqlite`. No borres esa carpeta si querés conservar los datos.

## Funcionalidades
- Registro e inicio de sesión por email y contraseña (hash bcrypt).
- Sesiones HTTP con cookie HttpOnly y SameSite Lax.
- Datos separados por cuenta: personaje, XP, nivel, estadísticas, racha, misiones y diario.
- API protegida por sesión para todas las operaciones de perfil.

## Antes de publicarla en internet
- Definí `SESSION_SECRET` como secreto aleatorio fuerte y único.
- Usá HTTPS y `NODE_ENV=production`.
- Configurá límites de intentos de login, backups de SQLite y política de privacidad.
- Para despliegues con varias instancias, reemplazá sesiones SQLite por un almacén compartido y usá una base de datos administrada.
- SQLite requiere almacenamiento persistente en el hosting; los sistemas de archivos efímeros pueden borrar perfiles al reiniciar.

La versión incluida es una base funcional para desarrollo local, no una configuración de producción auditada.
