import { createContext, useContext, useState, type ReactNode } from "react";
import type { AudienceType } from "@/lib/waitlist";

interface WaitlistModalContextValue {
  isOpen: boolean;
  audienceType: AudienceType;
  openModal: (type?: AudienceType) => void;
  closeModal: () => void;
}

const WaitlistModalContext = createContext<WaitlistModalContextValue | undefined>(
  undefined,
);

export function WaitlistModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [audienceType, setAudienceType] = useState<AudienceType>("Customer");

  const openModal = (type: AudienceType = "Customer") => {
    setAudienceType(type);
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  return (
    <WaitlistModalContext.Provider
      value={{ isOpen, audienceType, openModal, closeModal }}
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