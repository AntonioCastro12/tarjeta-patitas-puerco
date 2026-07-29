# Patitas de Puerco Doña Imelda — tarjeta digital

Tarjeta digital responsive creada con React, Vite, TypeScript y CSS normal. Incluye menú, pedido por WhatsApp, estado abierto/cerrado, QR descargable, llamada, ubicación, redes sociales y compartir.

> Importante: el logotipo oficial no llegó entre los archivos adjuntos. El recurso `public/logo-patitas.png` es un marcador temporal claramente identificado. Reemplázalo con el PNG oficial sin cambiar el nombre del archivo.

## 1. Instalar dependencias

Requiere Node.js 20 o superior.

```bash
npm install
```

## 2. Ejecutar el proyecto

```bash
npm run dev
```

Vite mostrará la URL local. Para compilar y revisar la versión final:

```bash
npm run build
npm run preview
```

## 3. Configurar `.env`

El archivo `.env` local ya se creó a partir de `.env.example` y no se sube a Git. Cambia únicamente los valores, sin renombrar las variables. Reinicia el servidor después de editarlo.

## 4. Cambiar teléfono y WhatsApp

- `VITE_WHATSAPP_NUMBER`: solo números, con código de país. Ejemplo de formato mexicano: `524621234567`.
- `VITE_BUSINESS_PHONE`: número que abrirá la llamada con `tel:`.

Mientras haya letras `X` o un valor incompleto, la tarjeta no genera enlaces rotos ni un QR falso.

## 5. Cambiar dirección y zona

Edita:

```env
VITE_BUSINESS_ADDRESS=Dirección real
VITE_DELIVERY_AREA=Zona real de servicio
```

Los campos vacíos se muestran como pendientes de configurar.

## 6. Agregar Google Maps

Copia el enlace para compartir de Google Maps en:

```env
VITE_MAPS_URL=https://maps.google.com/...
```

El botón Ubicación solo aparece cuando la URL es válida.

## 7. Cambiar el menú

Edita `src/data/menu.ts`. Cada elemento contiene:

- `category`: categoría.
- `name`: nombre.
- `description`: descripción opcional.
- `price`: número sin símbolo de moneda.
- `available`: disponibilidad.

También puedes definir `VITE_MENU_IMAGE_URL` con una URL HTTPS. Si existe, el modal muestra esa imagen; si falla, vuelve al menú construido en TypeScript.

## 8. Agregar precios

Los productos de ejemplo tienen `price: 0` y por eso muestran “Precio por confirmar”. Sustituye el `0` por el precio real, por ejemplo `120`, para mostrar `$120.00 MXN`.

## 9. Agregar redes sociales

Completa las URLs reales:

```env
VITE_FACEBOOK_URL=
VITE_INSTAGRAM_URL=
VITE_TIKTOK_URL=
```

Las redes vacías u otras URLs no válidas no generan botones.

## 10. Cambiar horario y días

```env
VITE_OPEN_HOUR=14
VITE_CLOSE_HOUR=19
VITE_BUSINESS_TIMEZONE=America/Mexico_City
VITE_SERVICE_DAYS=
```

`VITE_SERVICE_DAYS` acepta números separados por comas: `0` domingo, `1` lunes, …, `6` sábado. Si queda vacío, no se aplica restricción por día y la tarjeta indica que los días están por confirmar.

## 11. Generar el QR

El QR se genera automáticamente con `qrcode.react` cuando `VITE_WHATSAPP_NUMBER` contiene entre 10 y 15 dígitos. Incluye el mensaje inicial codificado correctamente.

## 12. Descargar el QR

Abre la tarjeta y presiona “Descargar QR”. El navegador guardará `qr-patitas-de-puerco.png`.

## 13. Publicar en Netlify

1. Sube el proyecto a un repositorio.
2. En Netlify selecciona el repositorio.
3. Usa `npm run build` como comando.
4. Usa `dist` como directorio de publicación.
5. Agrega en Netlify las mismas variables de `.env`.

`netlify.toml` y `public/_redirects` ya están configurados.

## 14. Reemplazar el logotipo

Sustituye `public/logo-patitas.png` por el PNG oficial. Conserva el nombre y la proporción. No necesita recorte ni edición interna; la interfaz usa `object-fit: contain`.

Para el favicon puedes reemplazar `public/favicon.png` por una versión cuadrada del recurso oficial.

## 15. Probar WhatsApp

1. Completa `VITE_WHATSAPP_NUMBER`.
2. Reinicia `npm run dev`.
3. Presiona “Pedir por WhatsApp”.
4. Confirma que el número y el mensaje sean correctos antes de publicar.

El QR usa exactamente el mismo enlace.

## Included Shape

- edit site code under `app/`
- `.openai/hosting.json` declares optional Sites D1 and R2 bindings
- `vite.config.ts` simulates declared bindings for local development
- `db/schema.ts` starts intentionally empty
- `examples/d1/` contains an optional D1 example surface
- `drizzle.config.ts` supports local migration generation when needed

## Workspace Auth Headers

OpenAI workspace sites can read the current user's email from
`oai-authenticated-user-email`.

SIWC-authenticated workspace sites may also receive
`oai-authenticated-user-full-name` when the user's SIWC profile has a non-empty
`name` claim. The full-name value is percent-encoded UTF-8 and is accompanied by
`oai-authenticated-user-full-name-encoding: percent-encoded-utf-8`.

Treat the full name as optional and fall back to email when it is absent:

```tsx
import { headers } from "next/headers";

export default async function Home() {
  const requestHeaders = await headers();
  const email = requestHeaders.get("oai-authenticated-user-email");
  const encodedFullName = requestHeaders.get("oai-authenticated-user-full-name");
  const fullName =
    encodedFullName &&
    requestHeaders.get("oai-authenticated-user-full-name-encoding") ===
      "percent-encoded-utf-8"
      ? decodeURIComponent(encodedFullName)
      : null;

  const displayName = fullName ?? email;
  // ...
}
```

## Optional Dispatch-Owned ChatGPT Sign-In

Import the ready-to-use helpers from `app/chatgpt-auth.ts` when the site needs
optional or required ChatGPT sign-in:

- Use `getChatGPTUser()` for optional signed-in UI.
- Use `requireChatGPTUser(returnTo)` for server-rendered pages that should send
  anonymous visitors through Sign in with ChatGPT.
- Use `chatGPTSignInPath(returnTo)` and `chatGPTSignOutPath(returnTo)` for
  browser links or actions.
- Pass a same-origin relative `returnTo` path for the destination after sign-in
  or sign-out. The helper validates and safely encodes it.
- Mark protected pages with `export const dynamic = "force-dynamic"` because
  they depend on per-request identity headers.

Dispatch owns `/signin-with-chatgpt`, `/signout-with-chatgpt`, `/callback`, the
OAuth cookies, and identity header injection. Do not implement app routes for
those reserved paths. Routes that do not import and call the helper remain
anonymous-compatible.

SIWC establishes identity only; it does not prove workspace membership. Use the
Sites hosting platform's access policy controls for workspace-wide restrictions,
or enforce explicit server-side membership or allowlist checks.

Use SIWC for account pages, user-specific dashboards, saved records, and write
actions tied to the current ChatGPT user. Leave public content anonymous.

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm test`: build the starter and verify its rendered loading skeleton
- `npm run db:generate`: generate Drizzle migrations after schema changes

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
- [Drizzle D1 Guide](https://orm.drizzle.team/docs/get-started/d1-new)
