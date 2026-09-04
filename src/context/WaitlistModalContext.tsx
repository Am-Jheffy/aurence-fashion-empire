import { createContext, useContext, useState, type ReactNode } from "react";
import type { AudienceType } from "@/lib/waitlist";

interface WaitlistModalContextValue {
  isOpen: boolean;
  audienceType: AudienceType;
  /** Pre-fills the modal's message field — still editable by the visitor. */
  prefillMessage: string;
  openModal: (type?: AudienceType, message?: string) => void;
  closeModal: () => void;
}

const WaitlistModalContext = createContext<WaitlistModalContextValue | undefined>(
  undefined,
);

export function WaitlistModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [audienceType, setAudienceType] = useState<AudienceType>("Customer");
  const [prefillMessage, setPrefillMessage] = useState("");

  const openModal = (type: AudienceType = "Customer", message: string = "") => {
    setAudienceType(type);
    setPrefillMessage(message);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <WaitlistModalContext.Provider
      value={{ isOpen, audienceType, prefillMessage, openModal, closeModal }}
    >
      {children}
    </WaitlistModalContext.Provider>
  );
}

export function useWaitlistModal() {
  const context = useContext(WaitlistModalContext);
  if (!context) {
    throw new Error(
      "useWaitlistModal must be used within a WaitlistModalProvider",
    );
  }
  return context;
}
