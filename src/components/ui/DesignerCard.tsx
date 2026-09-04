import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { Designer } from "@/lib/mockData";

const easeCouture = [0.16, 1, 0.3, 1] as const;

export function DesignerCard({ designer, index = 0 }: { designer: Designer; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: easeCouture, delay: index * 0.08 }}
    >
      <Link
        to={`/designers/${designer.slug}`}
        className="group flex flex-col items-center rounded-lg border border-champagne/15 bg-obsidian-soft/60 px-5 py-8 text-center transition-all duration-300 hover:-translate-y-1 hover:border-champagne/50 light:bg-bone-soft/80"
      >
        <span className="font-display flex h-16 w-16 items-center justify-center rounded-full bg-bordeaux text-xl italic text-champagne">
          {designer.initials}
        </span>
        <span className="font-display mt-4 text-lg text-bone light:text-ink">
          {designer.name}
        </span>
        <span className="eyebrow mt-1 text-[10px] text-bone/45 light:text-ink/45">
          {designer.specialty}
        </span>
        <span className="eyebrow mt-4 text-champagne opacity-0 transition-opacity group-hover:opacity-100">
          Book Appointment
        </span>
      </Link>
    </motion.div>
  );
}
