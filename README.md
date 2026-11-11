<div align="center">

# NEXUS AI — Plataforma DevSecOps

Panel web basado en Next.js para autenticación, consulta de proyectos propios e inspección de repositorios públicos de GitHub.

</div>

## Estado actual

La autenticación Supabase y la consulta de metadatos de repositorios públicos están implementadas. El análisis de calidad, escaneo de seguridad y Copilot todavía no están conectados a servicios reales; la interfaz los presenta como no disponibles y no debe usarse como evidencia de una auditoría.

## Requisitos

- Node.js 20.9 o posterior.
- Un proyecto Supabase.
- Una cuenta Vercel para el despliegue.

## Desarrollo local

1. Instala dependencias con `npm ci`.
2. Copia `.env.example` a `.env.local` y completa las variables de Supabase.
3. Ejecuta la migración `supabase/migrations/20261111030000_create_projects.sql` en el SQL Editor de Supabase.
4. Ejecuta `npm run dev`.

Antes de desplegar, valida con `npm run lint` y `npm run build`.

## Despliegue en Vercel

1. Importa el repositorio en Vercel y deja el framework como **Next.js**; no se necesita `vercel.json`.
2. Configura `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` en los entornos donde ejecutarás la app (Production, Preview y Development, según corresponda). Usa solo la clave pública/anon; nunca pongas una `service_role` en variables `NEXT_PUBLIC_*`.
3. Aplica la migración de Supabase antes de permitir que usuarios guarden proyectos. Incluye políticas RLS; cada usuario solo puede operar sobre sus propias filas.
4. En Supabase Auth, configura el dominio desplegado como **Site URL** y añade `https://TU-DOMINIO/auth/callback` como URL de redirección permitida. Añade también los dominios de Preview solo si vas a probar OAuth allí.
5. Si habilitas el acceso con GitHub, configura GitHub como proveedor OAuth en Supabase y usa la URL de callback de Supabase que muestra su panel como **Authorization callback URL** en la app OAuth de GitHub.
6. Despliega y revisa los logs de build y de funciones antes de compartir el sitio.

## Verificación y límites

- La inspección de GitHub consulta solo repositorios públicos; no usa un token ni accede a repositorios privados.
- La tabla `projects` requiere aplicar la migración incluida. Si ya existe una tabla con ese nombre, revisa su esquema y adapta la migración antes de ejecutarla.
- Copilot devuelve un error de servicio no configurado hasta que se integre un proveedor de IA. No envíes código sensible antes de definir proveedor, autorización y retención.
- Los paneles de seguridad y calidad no ejecutan escaneos. No representan un estado de seguridad ni una certificación.
- No hay todavía límites de uso por cuenta, pruebas automatizadas ni integración CI; añádelos antes de abrir el servicio a usuarios o tráfico no confiable.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Supabase Auth/PostgreSQL · Vercel
