import { motion } from "framer-motion";

interface StitchLineProps {
  orientation?: "vertical" | "horizontal";
  className?: string;
  delay?: number;
}

/**
 * A hand-stitched seam line, drawn on with a dash-offset animation.
 * Doubles as the brand's tailoring motif wherever a divider is needed.
 */
export function StitchLine({
  orientation = "vertical",
  className = "",
  delay = 0,
}: StitchLineProps) {
  const isVertical = orientation === "vertical";

  return (
    <svg
      className={className}
      width={isVertical ? 2 : "100%"}
      height={isVertical ? "100%" : 2}
      viewBox={isVertical ? "0 0 2 100" : "0 0 100 2"}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <motion.line
        x1={isVertical ? 1 : 0}
        y1={isVertical ? 0 : 1}
        x2={isVertical ? 1 : 100}
        y2={isVertical ? 100 : 1}
        stroke="currentColor"
        strokeWidth={isVertical ? 2 : 1.5}
        strokeLinecap="round"
        className="stitch-divider text-champagne"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay }}
      />
    </svg>
  );
}
