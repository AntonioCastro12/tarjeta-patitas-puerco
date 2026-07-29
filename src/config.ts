const value = (key: keyof ImportMetaEnv, fallback = "") =>
  (import.meta.env[key] ?? fallback).trim();

const integer = (key: keyof ImportMetaEnv, fallback: number) => {
  const parsed = Number.parseInt(value(key), 10);
  return Number.isInteger(parsed) ? parsed : fallback;
};

export const businessConfig = {
  name: value("VITE_BUSINESS_NAME", "Patitas de Puerco Doña Imelda"),
  description: value(
    "VITE_BUSINESS_DESCRIPTION",
    "Patitas de puerco preparadas con sabor casero",
  ),
  whatsappNumber: value("VITE_WHATSAPP_NUMBER"),
  phone: value("VITE_BUSINESS_PHONE"),
  address: value("VITE_BUSINESS_ADDRESS"),
  mapsUrl: value("VITE_MAPS_URL"),
  deliveryArea: value("VITE_DELIVERY_AREA"),
  openHour: integer("VITE_OPEN_HOUR", 14),
  closeHour: integer("VITE_CLOSE_HOUR", 19),
  timezone: value("VITE_BUSINESS_TIMEZONE", "America/Mexico_City"),
  serviceDays: value("VITE_SERVICE_DAYS"),
  menuImageUrl: value("VITE_MENU_IMAGE_URL"),
  facebookUrl: value("VITE_FACEBOOK_URL"),
  instagramUrl: value("VITE_INSTAGRAM_URL"),
  tiktokUrl: value("VITE_TIKTOK_URL"),
};
