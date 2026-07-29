import { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FiDownload } from "react-icons/fi";

interface QRSectionProps {
  value: string;
}

export const QRSection = ({ value }: QRSectionProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [feedback, setFeedback] = useState("");

  const downloadQr = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = "qr-patitas-de-puerco.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
    setFeedback("QR descargado");
  };

  return (
    <section className="section-card qr-section" aria-labelledby="qr-title">
      <p className="eyebrow">Tarjeta digital</p>
      <h2 id="qr-title">Escanea para abrir esta tarjeta</h2>
      {value ? (
        <>
          <a
            className="qr-frame"
            data-qr-target={value}
            href={value}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Abrir la tarjeta digital en una nueva pestaña"
          >
            <QRCodeCanvas
              ref={canvasRef}
              value={value}
              size={240}
              bgColor="#FFFFFF"
              fgColor="#351313"
              level="M"
              marginSize={4}
              title="Código QR para abrir la tarjeta digital"
            />
          </a>
          <p className="qr-help">Apunta la cámara de tu celular para abrir la tarjeta completa.</p>
          <button className="download-button" type="button" onClick={downloadQr}>
            <FiDownload aria-hidden="true" />
            Descargar QR
          </button>
          <span className="sr-only" role="status" aria-live="polite">{feedback}</span>
        </>
      ) : (
        <div className="empty-state">
          <span aria-hidden="true">QR</span>
          <p>El código aparecerá cuando configures la dirección web de la tarjeta.</p>
        </div>
      )}
    </section>
  );
};
