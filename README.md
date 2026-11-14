<div align="center">

# NEXUS AI

### Plataforma DevSecOps para organizar proyectos e inspeccionar repositorios públicos

Aplicación web construida con Next.js y Supabase. Permite iniciar sesión, guardar proyectos propios y consultar metadatos de repositorios públicos de GitHub.

[![Next.js](https://img.shields.io/badge/Next.js-16.4.5-000000?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20Postgres-3ECF8E?logo=supabase)](https://supabase.com/)

</div>

## Contenido

- [Funciones disponibles](#funciones-disponibles)
- [Tecnologías](#tecnologías)
- [Requisitos](#requisitos)
- [Configuración local](#configuración-local)
- [Despliegue en Vercel](#despliegue-en-vercel)
- [Estado y limitaciones](#estado-y-limitaciones)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Comandos](#comandos)

## Funciones disponibles

- **Autenticación:** inicio de sesión con correo y contraseña; OAuth con GitHub mediante Supabase cuando el proveedor está configurado.
- **Proyectos:** guarda repositorios en la cuenta del usuario. La migración incluida aplica Row Level Security (RLS) para limitar cada fila a su propietario.
- **Inspector de GitHub:** consulta datos básicos de repositorios públicos, sin token y sin acceso a repositorios privados.
- **Panel:** navegación a los módulos de proyectos, calidad, seguridad y asistente.

## Tecnologías

| Área | Tecnología |
| --- | --- |
| Aplicación | Next.js 16 · React 19 · TypeScript |
| Estilos | Tailwind CSS 4 |
| Autenticación y datos | Supabase Auth · PostgreSQL · `@supabase/ssr` |
| Validación de solicitudes | Zod |
| Despliegue previsto | Vercel |

## Requisitos

- Node.js **20.9 o posterior**.
- npm.
- Un proyecto Supabase para autenticación y almacenamiento de proyectos.

## Configuración local

1. Clona el repositorio e instala las dependencias:

   ```bash
   git clone https://github.com/josemanuelsuarez110/nexus-ai.git
   cd nexus-ai
   npm ci
   ```

2. Crea `.env.local` a partir de `.env.example` y configura las credenciales públicas del proyecto Supabase:

   ```dotenv
   NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<publishable-or-anon-key>
   ```

   No uses una clave `service_role` en variables `NEXT_PUBLIC_*` ni la guardes en el repositorio.

3. En el SQL Editor de Supabase, ejecuta [`supabase/migrations/20261111030000_create_projects.sql`](./supabase/migrations/20261111030000_create_projects.sql). La migración crea `public.projects`, habilita RLS y concede a usuarios autenticados acceso únicamente a sus propias filas.

4. Inicia el servidor de desarrollo:

   ```bash
   npm run dev
   ```

   Abre [http://localhost:3000](http://localhost:3000).

### OAuth con GitHub

Para habilitar el botón de acceso con GitHub:

1. Activa GitHub como proveedor en **Supabase → Authentication → Sign In / Providers**.
2. Configura la aplicación OAuth de GitHub con la URL de callback de Supabase que muestra ese panel.
3. Añade `http://localhost:3000/auth/callback` a las URL de redirección permitidas de Supabase para desarrollo local.

## Despliegue en Vercel

1. Importa el repositorio en Vercel y conserva **Next.js** como framework. No se requiere `vercel.json`.
2. Define `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` en los entornos de Vercel que vayas a utilizar. Usa únicamente la clave pública/anon.
3. Aplica la migración de Supabase antes de permitir que usuarios guarden proyectos.
4. En Supabase, configura el dominio de producción como **Site URL** y añade `https://<tu-dominio>/auth/callback` a las URL de redirección permitidas. Configura también los dominios de Preview solo si vas a probar OAuth en ellos.
5. Si habilitas OAuth con GitHub, añade la URL de callback de Supabase en la configuración de la aplicación OAuth de GitHub.
6. Despliega y comprueba los logs de compilación y de las funciones, además de los flujos de inicio de sesión y guardado de proyectos.

Antes de desplegar, ejecuta:

```bash
npm run lint
npm run build
```

## Estado y limitaciones

Este proyecto todavía **no ejecuta análisis reales de calidad ni escaneos de seguridad**. Esos módulos son interfaces y no deben interpretarse como resultados de auditoría o certificaciones. El asistente responde con un error de servicio no configurado; no hay proveedor de IA conectado.

La inspección de GitHub se limita a repositorios públicos y depende de la API pública de GitHub. No usa un token ni permite inspeccionar repositorios privados.

Antes de abrir la aplicación a tráfico público, configura y prueba el proyecto de Supabase y las URL de autenticación en producción. También se recomienda incorporar pruebas automatizadas, integración continua y límites de uso por cuenta.

## Estructura del proyecto

```text
src/
├── proxy.ts              # Intercepta solicitudes y actualiza la sesión de Supabase
├── app/
│   ├── (dashboard)/       # Panel y módulos de proyectos, calidad, seguridad y asistente
│   ├── api/               # Endpoints del asistente y del inspector de GitHub
│   ├── auth/callback/     # Intercambio del código OAuth de Supabase
│   └── login/             # Inicio de sesión
├── components/            # Componentes compartidos de interfaz
├── lib/supabase/          # Clientes de Supabase para navegador y servidor
└── utils/supabase/        # Helpers de sesión de Supabase
supabase/
└── migrations/            # Esquema y políticas de base de datos
```

## Comandos

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia Next.js en modo desarrollo |
| `npm run lint` | Ejecuta ESLint |
| `npm run build` | Genera la compilación de producción |
| `npm run start` | Sirve la compilación de producción |

---

Desarrollado por [Jose Manuel Suarez](https://github.com/josemanuelsuarez110).
