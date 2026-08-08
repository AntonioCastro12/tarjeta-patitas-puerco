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
  siteUrl: value(
    "VITE_SITE_URL",
    "https://tarjeta-patitas-puerco.netlify.app",
  ),
  whatsappNumber: value("VITE_WHATSAPP_NUMBER", "524623361636"),
  phone: value("VITE_BUSINESS_PHONE", "524623361636"),
  address: value(
    "VITE_BUSINESS_ADDRESS",
    "Rey Alfonso XIII No. 367, Fraccionamiento Los Reyes",
  ),
  mapsUrl: value(
    "VITE_MAPS_URL",
    "https://maps.app.goo.gl/EKk1fCkLX5RE8T4e9",
  ),
  deliveryArea: value("VITE_DELIVERY_AREA", "Irapuato, Guanajuato"),
  openHour: integer("VITE_OPEN_HOUR", 14),
  closeHour: integer("VITE_CLOSE_HOUR", 19),
  timezone: value("VITE_BUSINESS_TIMEZONE", "America/Mexico_City"),
  serviceDays: value("VITE_SERVICE_DAYS", "0,1,2,3,4,5,6"),
  serviceDaysLabel: value("VITE_SERVICE_DAYS_LABEL", "Lunes a domingo"),
  menuImageUrl: value("VITE_MENU_IMAGE_URL"),
  facebookUrl: value(
    "VITE_FACEBOOK_URL",
    "https://www.facebook.com/profile.php?id=100086958105021",
  ),
  instagramUrl: value("VITE_INSTAGRAM_URL"),
  tiktokUrl: value("VITE_TIKTOK_URL"),
};
