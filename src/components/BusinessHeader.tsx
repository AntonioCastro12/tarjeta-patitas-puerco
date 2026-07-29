import { useState } from "react";
import { FaPiggyBank } from "react-icons/fa6";

interface BusinessHeaderProps {
  name: string;
  description: string;
}

export const BusinessHeader = ({ name, description }: BusinessHeaderProps) => {
  const [logoAvailable, setLogoAvailable] = useState(true);

  return (
    <header className="business-header">
      <div className="header-accent header-accent--one" aria-hidden="true" />
      <div className="header-accent header-accent--two" aria-hidden="true" />
      <div className="logo-frame">
        {logoAvailable ? (
          <img
            className="business-logo"
            src="/logo-patitas.png"
            alt={`Logotipo de ${name}`}
            onError={() => setLogoAvailable(false)}
          />
        ) : (
          <div className="logo-fallback" aria-label="Logotipo pendiente">
            <FaPiggyBank aria-hidden="true" />
            <span>Logo</span>
          </div>
        )}
      </div>
      <p className="eyebrow">Sabor tradicional</p>
      <h1>{name}</h1>
      <p className="hero-description">{description} <span aria-hidden="true">🐷</span></p>
      <p className="hero-support">Haz tu pedido y disfruta nuestro sabor tradicional.</p>
    </header>
  );
};
