import { useEffect, useState } from "react";
import { FiShare2 } from "react-icons/fi";

interface ShareButtonProps {
  name: string;
  description: string;
}

export const ShareButton = ({ name, description }: ShareButtonProps) => {
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (!feedback) return;
    const timer = window.setTimeout(() => setFeedback(""), 2400);
    return () => window.clearTimeout(timer);
  }, [feedback]);

  const share = async () => {
    const shareData = {
      title: name,
      text: description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setFeedback("Tarjeta compartida");
        return;
      }
      await navigator.clipboard.writeText(window.location.href);
      setFeedback("Enlace copiado");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return;
      setFeedback("No se pudo compartir");
    }
  };

  return (
    <>
      <button className="action-button action-button--secondary" type="button" onClick={share}>
        <FiShare2 aria-hidden="true" />
        <span>Compartir</span>
      </button>
      <span className="sr-only" role="status" aria-live="polite">
        {feedback}
      </span>
      {feedback && <span className="share-toast">{feedback}</span>}
    </>
  );
};
