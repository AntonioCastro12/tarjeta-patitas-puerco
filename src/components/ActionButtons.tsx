import { FaWhatsapp } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa6";
import { FiMapPin, FiPhone } from "react-icons/fi";
import { ShareButton } from "./ShareButton";

interface ActionButtonsProps {
  businessName: string;
  description: string;
  whatsappUrl: string;
  isOpen: boolean;
  phone: string;
  mapsUrl: string;
  onOpenMenu: () => void;
}

const validUrl = (url: string) => {
  try {
    return ["http:", "https:"].includes(new URL(url).protocol);
  } catch {
    return false;
  }
};

export const ActionButtons = ({
  businessName,
  description,
  whatsappUrl,
  isOpen,
  phone,
  mapsUrl,
  onOpenMenu,
}: ActionButtonsProps) => {
  const startWhatsAppOrder = () => {
    if (!whatsappUrl) return;
    if (
      !isOpen &&
      !window.confirm(
        "Por el momento estamos cerrados. Nuestro horario es de 2:00 p. m. a 7:00 p. m. Puedes dejarnos tu mensaje y te responderemos en nuestro siguiente horario de servicio.",
      )
    ) {
      return;
    }
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const phoneReady = /^\d{10,15}$/.test(phone);
  const mapsReady = validUrl(mapsUrl);

  return (
    <section className="actions" aria-label="Acciones rápidas">
      <button
        className="whatsapp-button"
        type="button"
        onClick={startWhatsAppOrder}
        disabled={!whatsappUrl}
        aria-describedby={!whatsappUrl ? "whatsapp-pending" : undefined}
      >
        <FaWhatsapp aria-hidden="true" />
        <span>Pedir por WhatsApp</span>
      </button>
      {!whatsappUrl && (
        <p id="whatsapp-pending" className="config-note">
          Agrega el número real de WhatsApp para activar los pedidos y el QR.
        </p>
      )}

      <div className="secondary-actions">
        <button className="action-button action-button--secondary" type="button" onClick={onOpenMenu}>
          <FaUtensils aria-hidden="true" />
          <span>Ver menú y precios</span>
        </button>
        {phoneReady && (
          <a className="action-button action-button--secondary" href={`tel:${phone}`}>
            <FiPhone aria-hidden="true" />
            <span>Llamar</span>
          </a>
        )}
        {mapsReady && (
          <a
            className="action-button action-button--secondary"
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiMapPin aria-hidden="true" />
            <span>Ubicación</span>
          </a>
        )}
        <ShareButton name={businessName} description={description} />
      </div>
    </section>
  );
};
