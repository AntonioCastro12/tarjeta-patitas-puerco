interface BusinessStatusProps {
  isOpen: boolean;
  daysConfigured: boolean;
  serviceDaysLabel: string;
}

export const BusinessStatus = ({
  isOpen,
  daysConfigured,
  serviceDaysLabel,
}: BusinessStatusProps) => (
  <section className={`status-card ${isOpen ? "status-card--open" : ""}`} aria-live="polite">
    <div className="status-line">
      <span className="status-dot" aria-hidden="true" />
      <strong>{isOpen ? "Abierto ahora" : "Cerrado por el momento"}</strong>
    </div>
    <p>Horario de pedidos: 2:00 p. m. a 7:00 p. m.</p>
    <small>{daysConfigured ? serviceDaysLabel : "Días de servicio por confirmar."}</small>
  </section>
);
