import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import type { ReactNode } from "react";

interface SocialLinksProps {
  facebookUrl: string;
  instagramUrl: string;
  tiktokUrl: string;
}

const isWebUrl = (url: string) => {
  try {
    return ["http:", "https:"].includes(new URL(url).protocol);
  } catch {
    return false;
  }
};

export const SocialLinks = ({
  facebookUrl,
  instagramUrl,
  tiktokUrl,
}: SocialLinksProps) => {
  const links: Array<{ name: string; url: string; icon: ReactNode }> = [
    { name: "Facebook", url: facebookUrl, icon: <FaFacebookF aria-hidden="true" /> },
    { name: "Instagram", url: instagramUrl, icon: <FaInstagram aria-hidden="true" /> },
    { name: "TikTok", url: tiktokUrl, icon: <FaTiktok aria-hidden="true" /> },
  ].filter((link) => isWebUrl(link.url));

  if (links.length === 0) return null;

  return (
    <section className="section-card social-section" aria-labelledby="social-title">
      <h2 id="social-title">Síguenos</h2>
      <div className="social-links">
        {links.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Abrir ${link.name} en una nueva pestaña`}
          >
            {link.icon}
            <span>{link.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
};
