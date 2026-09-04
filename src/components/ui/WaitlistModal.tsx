import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useWaitlistModal } from "@/context/WaitlistModalContext";
import { audienceOptions, type AudienceType } from "@/lib/waitlist";
import { submitWaitlistEntry } from "@/lib/submitWaitlistEntry";

const easeCouture = [0.16, 1, 0.3, 1] as const;

const titleByAudience: Record<AudienceType, string> = {
  Customer: "Join the Waitlist",
  Brand: "Apply as a Brand",
  Designer: "Apply as a Designer",
  Logistics: "Apply as a Logistics Partner",
  Advertising: "Apply as an Advertising Partner",
};

const subtitleByAudience: Record<AudienceType, string> = {
  Customer: "Be first through the door when Aurence opens.",
  Brand: "List your collections alongside the houses we carry.",
  Designer: "Take bookings and bespoke commissions through Aurence.",
  Logistics: "Handle fulfillment and delivery across our network.",
  Advertising: "Put your campaigns in front of ready-to-buy shoppers.",
};

export function WaitlistModal() {
  const { isOpen, audienceType, prefillMessage, closeModal } = useWaitlistModal();
  const [selected, setSelected] = useState<AudienceType>(audienceType);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sync the selector to whichever audience the trigger button requested,
  // pre-fill the message if one was given, and reset the form each time
  // the modal is freshly opened.
  useEffect(() => {
    if (isOpen) {
      setSelected(audienceType);
      setName("");
      setEmail("");
      setMessage(prefillMessage);
      setSubmitted(false);
      setIsSubmitting(false);
      setSubmitError(null);
    }
  }, [isOpen, audienceType, prefillMessage]);

  // ESC to close, and lock body scroll while open.
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, closeModal]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const result = await submitWaitlistEntry({
      name,
      email,
      audienceType: selected,
      message,
      source: "waitlist_modal",
    });

    setIsSubmitting(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setSubmitError(result.error ?? "Something went wrong. Please try again.");
    }
  }

  const currentOption = audienceOptions.find((opt) => opt.value === selected);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-100 flex items-center justify-center bg-black/70 backdrop-blur-sm px-6"
          onClick={closeModal}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="waitlist-modal-title"
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.35, ease: easeCouture }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md rounded-xl border border-champagne/20 bg-obsidian-soft p-8 light:bg-bone-soft"
          >
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-5 top-5 text-bone/50 transition-colors hover:text-champagne light:text-ink/50"
            >
              ✕
            </button>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: easeCouture }}
                className="flex flex-col items-center py-6 text-center"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-bordeaux text-2xl text-champagne">
                  ✓
                </span>
                <h2 className="font-display mt-5 text-2xl text-bone light:text-ink">
                  You're on the list
                </h2>
                <p className="mt-3 max-w-xs text-sm leading-relaxed text-bone/60 light:text-ink/60">
                  Thank you, {name.split(" ")[0] || "friend"}. We'll be in
                  touch as Aurence gets closer to opening its doors.
                </p>
                <button
                  type="button"
                  onClick={closeModal}
                  className="mt-7 rounded-full bg-bordeaux px-6 py-2.5 text-sm font-semibold text-bone transition-colors hover:bg-bordeaux-bright"
                >
                  Done
                </button>
              </motion.div>
            ) : (
              <>
                <p className="eyebrow text-champagne">Early Access</p>
                <h2
                  id="waitlist-modal-title"
                  className="font-display mt-2 text-2xl text-bone light:text-ink"
                >
                  {titleByAudience[selected]}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-bone/60 light:text-ink/60">
                  {subtitleByAudience[selected]}
                </p>

                <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
                  <label className="flex flex-col gap-1.5 text-sm">
                    <span className="eyebrow text-bone/60 light:text-ink/60">
                      Name
                    </span>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your full name"
                      disabled={isSubmitting}
                      className="rounded-md border border-champagne/25 bg-obsidian px-3.5 py-2.5 text-bone placeholder:text-bone/35 focus:border-champagne focus:outline-none disabled:opacity-60 light:bg-bone light:text-ink light:placeholder:text-ink/35"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-sm">
                    <span className="eyebrow text-bone/60 light:text-ink/60">
                      Email
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      disabled={isSubmitting}
                      className="rounded-md border border-champagne/25 bg-obsidian px-3.5 py-2.5 text-bone placeholder:text-bone/35 focus:border-champagne focus:outline-none disabled:opacity-60 light:bg-bone light:text-ink light:placeholder:text-ink/35"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5 text-sm">
                    <span className="eyebrow text-bone/60 light:text-ink/60">
                      I am a...
                    </span>
                    <select
                      value={selected}
                      onChange={(e) =>
                        setSelected(e.target.value as AudienceType)
                      }
                      disabled={isSubmitting}
                      className="rounded-md border border-champagne/25 bg-obsidian px-3.5 py-2.5 text-bone focus:border-champagne focus:outline-none disabled:opacity-60 light:bg-bone light:text-ink"
                    >
                      {audienceOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="flex flex-col gap-1.5 text-sm">
                    <span className="eyebrow text-bone/60 light:text-ink/60">
                      Message{" "}
                      <span className="normal-case tracking-normal text-bone/35 light:text-ink/35">
                        (optional)
                      </span>
                    </span>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={currentOption?.prompt}
                      rows={3}
                      disabled={isSubmitting}
                      className="resize-none rounded-md border border-champagne/25 bg-obsidian px-3.5 py-2.5 text-bone placeholder:text-bone/35 focus:border-champagne focus:outline-none disabled:opacity-60 light:bg-bone light:text-ink light:placeholder:text-ink/35"
                    />
                  </label>

                  {submitError && (
                    <p className="-mt-1 text-sm text-champagne">{submitError}</p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-2 rounded-full bg-bordeaux px-6 py-3 text-sm font-semibold text-bone transition-colors hover:bg-bordeaux-bright disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting
                      ? "Sending..."
                      : selected === "Customer"
                        ? "Join the Waitlist"
                        : "Request Access"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
