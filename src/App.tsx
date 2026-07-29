import { useCallback, useState } from "react";
import { FiClock, FiMapPin, FiNavigation, FiPhone } from "react-icons/fi";
import { ActionButtons } from "./components/ActionButtons";
import { BusinessHeader } from "./components/BusinessHeader";
import { BusinessStatus } from "./components/BusinessStatus";
import { Footer } from "./components/Footer";
import { MenuModal } from "./components/MenuModal";
import { QRSection } from "./components/QRSection";
import { SocialLinks } from "./components/SocialLinks";
import { businessConfig } from "./config";
import { menuIngredients, menuItems } from "./data/menu";
import { useBusinessStatus } from "./hooks/useBusinessStatus";
import { createWhatsAppUrl, isValidPhoneNumber } from "./utils/whatsapp";

const configuredOrPending = (value: string) => value || "Pendiente de configurar";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const status = useBusinessStatus({
    openHour: businessConfig.openHour,
    closeHour: businessConfig.closeHour,
    timezone: businessConfig.timezone,
    serviceDays: businessConfig.serviceDays,
  });
  const whatsappUrl = createWhatsAppUrl(businessConfig.whatsappNumber);

  return (
    <>
      <div className="brand-intro" aria-hidden="true">
        <img
          className="brand-intro__logo"
          src="/logo-patitas.png"
          alt=""
          width="500"
          height="500"
          loading="eager"
          fetchPriority="high"
        />
      </div>

      <main className="page-shell">
        <article className="digital-card">
          <BusinessHeader
            name={businessConfig.name}
            description={businessConfig.description}
          />

          <div className="card-content">
            <BusinessStatus
              isOpen={status.isOpen}
              daysConfigured={status.daysConfigured}
              serviceDaysLabel={businessConfig.serviceDaysLabel}
            />

            <ActionButtons
              businessName={businessConfig.name}
              description={businessConfig.description}
              whatsappUrl={whatsappUrl}
              isOpen={status.isOpen}
              phone={businessConfig.phone}
              mapsUrl={businessConfig.mapsUrl}
              onOpenMenu={() => setMenuOpen(true)}
            />

            <section className="section-card business-info" aria-labelledby="info-title">
              <p className="eyebrow">Estamos para servirte</p>
              <h2 id="info-title">Información del negocio</h2>
              <dl>
                <div>
                  <dt><FiClock aria-hidden="true" /> Horario</dt>
                  <dd>{businessConfig.serviceDaysLabel}<br />2:00 p. m. a 7:00 p. m.</dd>
                </div>
                <div>
                  <dt><FiPhone aria-hidden="true" /> Teléfono</dt>
                  <dd>{isValidPhoneNumber(businessConfig.phone) ? businessConfig.phone : "Pendiente de configurar"}</dd>
                </div>
                <div>
                  <dt><FiMapPin aria-hidden="true" /> Dirección</dt>
                  <dd>{configuredOrPending(businessConfig.address)}</dd>
                </div>
                <div>
                  <dt><FiNavigation aria-hidden="true" /> Zona de servicio</dt>
                  <dd>{configuredOrPending(businessConfig.deliveryArea)}</dd>
                </div>
              </dl>
              <p className="delivery-note">
                Servicio a domicilio sujeto a disponibilidad y cotización de envío.
              </p>
            </section>

            <QRSection value={businessConfig.siteUrl} />

            <SocialLinks
              facebookUrl={businessConfig.facebookUrl}
              instagramUrl={businessConfig.instagramUrl}
              tiktokUrl={businessConfig.tiktokUrl}
            />
          </div>

          <Footer />
        </article>

        <MenuModal
          isOpen={menuOpen}
          onClose={closeMenu}
          items={menuItems}
          ingredients={menuIngredients}
          menuImageUrl={businessConfig.menuImageUrl}
        />
      </main>
    </>
  );
}

export default App;
