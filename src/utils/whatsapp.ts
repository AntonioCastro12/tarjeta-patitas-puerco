export const WHATSAPP_MESSAGE =
  "Hola, buenas tardes. Quiero hacer un pedido en Patitas de Puerco Doña Imelda.";

export const isValidPhoneNumber = (phone: string) => /^\d{10,15}$/.test(phone);

export const createWhatsAppUrl = (phone: string, message = WHATSAPP_MESSAGE) => {
  if (!isValidPhoneNumber(phone)) return "";
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
