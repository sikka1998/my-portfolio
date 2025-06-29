// components/HireMeModal.tsx
import Modal from "react-modal";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

Modal.setAppElement("#root");

type HireMeModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

export default function HireMeModal({
  isOpen,
  onRequestClose,
}: HireMeModalProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasBooked, setHasBooked] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(true);
      setHasBooked(false);
    }
  }, [isOpen]);

  useEffect(() => {
    function handleMessage(e: MessageEvent) {
      if (
        e.origin.includes("calendly.com") &&
        e.data.event === "calendly.event_scheduled"
      ) {
        setHasBooked(true);
        toast.success("✅ Your meeting has been scheduled!");
        onRequestClose(); // Optional: close modal after booking
      }
    }
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [onRequestClose]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Hire Me"
      className="bg-white max-w-2xl w-full p-6 rounded-xl shadow-xl"
      overlayClassName="fixed inset-0 bg-white/10 backdrop-blur-md flex justify-center items-center z-50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Schedule a Call</h2>
        <button
          onClick={onRequestClose}
          className="text-gray-500 hover:text-black cursor-pointer transition-colors duration-200"
        >
          ✕
        </button>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center h-60">
          <span className="text-lg font-semibold text-blue-600 animate-pulse">
            Loading Calendly...
          </span>
        </div>
      )}

      <iframe
        src="https://calendly.com/sikkander1998"
        width="100%"
        height="600"
        allowTransparency
        className={`${isLoading ? "hidden" : "block"} rounded-lg`}
        title="Calendly Scheduler"
        onLoad={() => setIsLoading(false)}
      ></iframe>
    </Modal>
  );
}
