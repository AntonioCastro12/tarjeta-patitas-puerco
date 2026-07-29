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
      <p className="eyebrow">Pedido rápido</p>
      <h2 id="qr-title">Escanea para hacer tu pedido</h2>
      {value ? (
        <>
          <div className="qr-frame" data-qr-target={value}>
            <QRCodeCanvas
              ref={canvasRef}
              value={value}
              size={240}
              bgColor="#FFFFFF"
              fgColor="#351313"
              level="M"
              marginSize={4}
              title="Código QR para pedir por WhatsApp"
            />
          </div>
          <p className="qr-help">Abre la cámara de tu celular y apunta al código.</p>
          <button className="download-button" type="button" onClick={downloadQr}>
            <FiDownload aria-hidden="true" />
            Descargar QR
          </button>
          <span className="sr-only" role="status" aria-live="polite">{feedback}</span>
        </>
      ) : (
        <div className="empty-state">
          <span aria-hidden="true">QR</span>
          <p>El código aparecerá cuando configures el número real de WhatsApp.</p>
        </div>
      )}
    </section>
  );
};
