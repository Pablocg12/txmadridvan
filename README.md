# TX CLASS MADRID — Taxi Premium

Aplicación web y PWA para el servicio de taxi premium TX CLASS MADRID.

---

## Despliegue en Vercel + Neon (gratis, con dominio propio)

### Paso 1 — Sube el código a GitHub

1. Ve a [github.com](https://github.com) y crea una cuenta (si no tienes)
2. Haz clic en **New repository** → ponle un nombre (ej: `txclass-madrid`) → **Create repository**
3. Sube todos los ficheros del proyecto a ese repositorio

---

### Paso 2 — Crea la base de datos en Neon (gratis)

1. Ve a [neon.tech](https://neon.tech) y crea una cuenta gratuita
2. Haz clic en **Create Project** → elige un nombre y la región `EU Frankfurt`
3. Una vez creado, copia la **Connection string** — tiene este formato:
   ```
   postgresql://usuario:contraseña@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```
4. Guarda ese texto, lo necesitarás en el siguiente paso

---

### Paso 3 — Crea las tablas en la base de datos

En Neon, ve a **SQL Editor** y ejecuta este código:

```sql
CREATE TABLE IF NOT EXISTS bookings (
  id SERIAL PRIMARY KEY,
  origen TEXT NOT NULL,
  destino TEXT NOT NULL,
  fecha TEXT NOT NULL,
  hora TEXT NOT NULL,
  pasajeros INTEGER NOT NULL,
  equipaje INTEGER NOT NULL,
  estado VARCHAR(20) NOT NULL DEFAULT 'pendiente',
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

### Paso 4 — Despliega en Vercel

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta (puedes entrar con GitHub)
2. Haz clic en **Add New Project** → selecciona tu repositorio de GitHub
3. Antes de desplegar, ve a **Environment Variables** y añade estas dos variables:

   | Nombre | Valor |
   |---|---|
   | `DATABASE_URL` | La connection string de Neon (del paso 2) |
   | `SESSION_SECRET` | Cualquier texto largo, ej: `txclassmadrid-secreto-2024` |

4. Haz clic en **Deploy** — Vercel construirá y desplegará todo automáticamente

---

### Paso 5 — Conecta tu dominio

1. En Vercel, ve a tu proyecto → **Settings → Domains**
2. Escribe tu dominio (ej: `txclassmadrid.com`) y haz clic en **Add**
3. Vercel te dirá qué registros DNS tienes que añadir en tu proveedor de dominio
4. Añade esos registros y en unos minutos tu dominio estará activo con HTTPS

---

## Variables de Entorno Necesarias

| Variable | Descripción |
|---|---|
| `DATABASE_URL` | URL de conexión PostgreSQL (de Neon) |
| `SESSION_SECRET` | Texto secreto para sesiones |

---

## Personalización

### Cambiar el número de WhatsApp
Edita estas dos líneas en dos ficheros:
- `client/src/components/BookingForm.tsx` → busca `whatsappNumber`
- `client/src/components/WhatsAppButton.tsx` → busca `whatsappNumber`

### Cambiar las imágenes
Sustituye los ficheros en `client/public/images/`

### Cambiar textos (español/inglés)
Todo está en `client/src/hooks/use-language.ts`

---

## Stack Técnico

- **Frontend:** React 18 + TypeScript + Tailwind CSS (Vite)
- **Backend:** Node.js + Express 5 (serverless en Vercel)
- **Base de datos:** PostgreSQL con Drizzle ORM (Neon)
- **Idiomas:** Español / Inglés (toggle en la navbar)
- **WhatsApp:** Botón flotante + mensajes de reserva con emojis

---

## Contacto
**TX CLASS MADRID** — Taxi Premium en Madrid
WhatsApp: +34 611 089 440
