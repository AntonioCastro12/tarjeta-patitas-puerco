# Patitas de Puerco Doña Imelda

Tarjeta digital responsive desarrollada con React, Vite, TypeScript y CSS normal.

Incluye:

- Menú completo con precios e ingredientes.
- Pedido por WhatsApp.
- Estado abierto o cerrado.
- Código QR descargable.
- Llamada, ubicación, redes sociales y compartir.
- Diseño accesible y adaptable a celulares.
- Configuración para Netlify y Sites.

## Instalar y ejecutar

Requiere Node.js 20 o superior.

```bash
npm install
npm run dev
```

Para verificar y previsualizar la versión de producción:

```bash
npm run build
npm run preview
```

## Configuración del negocio

Los datos editables están en `.env`. El archivo se crea copiando `.env.example`.

```env
VITE_BUSINESS_NAME=Patitas de Puerco Doña Imelda
VITE_BUSINESS_DESCRIPTION=Patitas de puerco preparadas con sabor casero
VITE_SITE_URL=https://patitas-dona-imelda.carnifex9470.chatgpt.site
VITE_WHATSAPP_NUMBER=524623361636
VITE_BUSINESS_PHONE=524623361636
VITE_BUSINESS_ADDRESS=
VITE_MAPS_URL=https://maps.app.goo.gl/EKk1fCkLX5RE8T4e9
VITE_DELIVERY_AREA=Irapuato, Guanajuato
VITE_OPEN_HOUR=14
VITE_CLOSE_HOUR=19
VITE_BUSINESS_TIMEZONE=America/Mexico_City
VITE_SERVICE_DAYS=0,1,2,3,4,5,6
VITE_SERVICE_DAYS_LABEL=Lunes a domingo
VITE_FACEBOOK_URL=https://www.facebook.com/profile.php?id=100086958105021
VITE_INSTAGRAM_URL=
VITE_TIKTOK_URL=
```

El número de WhatsApp debe contener únicamente entre 10 y 15 dígitos, incluyendo el código de país. Los botones que no tengan un dato válido permanecen ocultos o desactivados.

## Menú

El menú se modifica en `src/data/menu.ts`.

Precios actuales:

- Orden entera de patita: $100 MXN.
- Media orden de patita: $60 MXN.
- Tostada sencilla: $30 MXN.
- Tostada doble: $60 MXN.
- Contenedor pequeño, de 1 a 3 ingredientes: $70 MXN.
- Contenedor grande, de 1 a 4 ingredientes: $100 MXN.

Ingredientes:

- Pata picada.
- Oreja.
- Cueritos.
- Queso de puerco.
- Ceviche.
- Carne tártara.

## Logotipo

El logotipo oficial se encuentra en `public/logo-patitas.png`. La interfaz conserva su proporción con `object-fit: contain`.

## Horario y días

El horario predeterminado es de 2:00 p. m. a 7:00 p. m. en la zona `America/Mexico_City`.

`VITE_SERVICE_DAYS` acepta números separados por comas:

- `0`: domingo.
- `1`: lunes.
- `2`: martes.
- `3`: miércoles.
- `4`: jueves.
- `5`: viernes.
- `6`: sábado.

Si queda vacío, la tarjeta muestra que los días de servicio están por confirmar.

## WhatsApp y QR

El botón y el QR se activan cuando `VITE_WHATSAPP_NUMBER` contiene un número válido. Ambos utilizan el mismo mensaje codificado.

El botón “Descargar QR” guarda el archivo:

```text
qr-patitas-de-puerco.png
```

## Publicar en Netlify

La configuración ya está incluida:

- Comando de compilación: `npm run build`.
- Directorio de publicación: `dist`.

Agrega en Netlify las mismas variables configuradas en `.env`.
