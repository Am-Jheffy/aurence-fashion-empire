import { motion } from "framer-motion";

const easeCouture = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    number: "01",
    title: "Curate across houses",
    description: "Pick pieces from any brand in the Aurence network — gowns from one, shoes from another.",
  },
  {
    number: "02",
    title: "One cart, one checkout",
    description: "Everything you've chosen comes together in a single order, no matter how many ateliers it came from.",
  },
  {
    number: "03",
    title: "Delivered as one",
    description: "A single delivery experience, coordinated across every brand in your order.",
  },
];

export function HowItWorks() {
  return (
    <section className="border-y border-champagne/10 bg-obsidian-soft light:bg-bone-soft">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: easeCouture }}
          className="eyebrow text-champagne"
        >
          How Aurence Works
        </motion.p>

        <div className="mt-10 grid gap-10 sm:grid-cols-3 sm:gap-8">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeCouture, delay: i * 0.1 }}
            >
              <span className="font-display text-3xl italic text-bordeaux light:text-bordeaux-bright">
                {step.number}
              </span>
              <h3 className="font-display mt-3 text-xl text-bone light:text-ink">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-bone/60 light:text-ink/60">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}