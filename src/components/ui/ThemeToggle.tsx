import { motion } from "framer-motion";
import { useTheme } from "@/context/ThemeContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === "light";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isLight ? "dark" : "light"} mode`}
      aria-pressed={isLight}
      className="relative flex h-7 w-12 items-center rounded-full border border-champagne/40 bg-obsidian-soft/60 px-0.5 transition-colors duration-300 light:bg-bone-soft"
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="flex h-5 w-5 items-center justify-center rounded-full bg-champagne text-[10px] text-obsidian"
        style={{ marginLeft: isLight ? "auto" : 0 }}
      >
        {isLight ? "☼" : "☾"}
      </motion.span>
    </button>
  );
}
