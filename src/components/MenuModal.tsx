import { useEffect, useRef, useState } from "react";
import { FiCheckCircle, FiX, FiXCircle } from "react-icons/fi";
import type { MenuItem } from "../data/menu";
import { formatCurrency } from "../utils/currency";

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  menuImageUrl?: string;
}

export const MenuModal = ({
  isOpen,
  onClose,
  items,
  menuImageUrl = "",
}: MenuModalProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    document.body.classList.add("modal-open");
    closeRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.classList.remove("modal-open");
      document.removeEventListener("keydown", handleKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  useEffect(() => setImageFailed(false), [menuImageUrl]);

  if (!isOpen) return null;

  const showImage = Boolean(menuImageUrl) && !imageFailed;
  const categories = [...new Set(items.map((item) => item.category))];

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        ref={dialogRef}
        className="menu-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="menu-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-handle" aria-hidden="true" />
        <div className="modal-heading">
          <div>
            <p className="eyebrow">Nuestro sabor</p>
            <h2 id="menu-title">Menú</h2>
          </div>
          <button ref={closeRef} className="icon-button" type="button" onClick={onClose} aria-label="Cerrar menú">
            <FiX aria-hidden="true" />
          </button>
        </div>

        {showImage ? (
          <img
            className="menu-image"
            src={menuImageUrl}
            alt="Menú de Patitas de Puerco Doña Imelda"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="menu-list">
            <p className="menu-placeholder-note">
              Productos de ejemplo. Confirma presentaciones y precios antes de publicar.
            </p>
            {categories.map((category) => (
              <section className="menu-category" key={category}>
                <h3>{category}</h3>
                {items
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <article className={`menu-item ${!item.available ? "menu-item--unavailable" : ""}`} key={item.id}>
                      <div className="menu-item-copy">
                        <div className="menu-item-title">
                          <h4>{item.name}</h4>
                          <span className={`availability ${item.available ? "availability--yes" : ""}`}>
                            {item.available ? <FiCheckCircle aria-hidden="true" /> : <FiXCircle aria-hidden="true" />}
                            {item.available ? "Disponible" : "No disponible"}
                          </span>
                        </div>
                        {item.description && <p>{item.description}</p>}
                      </div>
                      <strong className="menu-price">
                        {item.price > 0 ? formatCurrency(item.price) : "Precio por confirmar"}
                      </strong>
                    </article>
                  ))}
              </section>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
