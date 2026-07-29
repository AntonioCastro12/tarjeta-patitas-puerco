import { useEffect, useRef, useState } from "react";
import { FiCheck, FiX, FiXCircle } from "react-icons/fi";
import type { MenuItem } from "../data/menu";
import { formatCurrency } from "../utils/currency";

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: MenuItem[];
  ingredients: string[];
  menuImageUrl?: string;
}

export const MenuModal = ({
  isOpen,
  onClose,
  items,
  ingredients,
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
            <p className="menu-intro">
              Elige tu presentación favorita y arma tu pedido con nuestros ingredientes.
            </p>
            {categories.map((category) => (
              <section className="menu-category" key={category}>
                <h3>{category}</h3>
                {items
                  .filter((item) => item.category === category)
                  .map((item) => (
                    <article className={`menu-item ${!item.available ? "menu-item--unavailable" : ""}`} key={item.id}>
                      <div className="menu-item-copy">
                        <div className="menu-item-heading">
                          <h4>{item.name}</h4>
                          <strong className="menu-price">{formatCurrency(item.price)}</strong>
                        </div>
                        {item.description && <p>{item.description}</p>}
                        {!item.available && (
                          <span className="availability">
                            <FiXCircle aria-hidden="true" />
                            No disponible
                          </span>
                        )}
                      </div>
                    </article>
                  ))}
              </section>
            ))}

            <section className="ingredients-panel" aria-labelledby="ingredients-title">
              <p className="eyebrow">Combina a tu gusto</p>
              <h3 id="ingredients-title">Ingredientes disponibles</h3>
              <p>
                Para tostadas y contenedores.
              </p>
              <ul className="ingredients-grid">
                {ingredients.map((ingredient) => (
                  <li key={ingredient}>
                    <FiCheck aria-hidden="true" />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </div>
    </div>
  );
};
