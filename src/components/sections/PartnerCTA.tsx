import { motion } from "framer-motion";
import { partnerTypes } from "@/lib/mockData";
import { useWaitlistModal } from "@/context/WaitlistModalContext";

const easeCouture = [0.16, 1, 0.3, 1] as const;

export function PartnerCTA() {
  const { openModal } = useWaitlistModal();

  return (
    <section className="relative overflow-hidden bg-bordeaux">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-champagne/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeCouture }}
          className="eyebrow text-champagne"
        >
          Join the House
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeCouture, delay: 0.05 }}
          className="font-display mt-3 max-w-xl text-3xl text-bone sm:text-4xl"
        >
          Bring your brand, your craft, or your fleet to Aurence.
        </motion.h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {partnerTypes.map((partner, i) => (
            <motion.div
              key={partner.path}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: easeCouture, delay: i * 0.07 }}
            >
              <button
                type="button"
                onClick={() => openModal(partner.audienceType)}
                className="group flex h-full w-full flex-col justify-between rounded-lg border border-bone/20 bg-bordeaux-bright/20 p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-champagne/60 hover:bg-bordeaux-bright/35 cursor-pointer"
              >
                <div>
                  <span className="font-display text-xl text-bone">
                    {partner.label}
                  </span>
                  <p className="mt-2 text-sm leading-relaxed text-bone/70">
                    {partner.description}
                  </p>
                </div>
                <span className="eyebrow mt-6 text-champagne">
                  Apply →
                </span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}