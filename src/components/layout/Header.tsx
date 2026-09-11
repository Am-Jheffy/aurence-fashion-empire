import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { primaryNav } from "@/lib/navigation";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useNotifications } from "@/lib/notifications";

function CartIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M6 8h12l-1 12H7L6 8z" strokeLinejoin="round" />
      <path d="M9 8V6a3 3 0 0 1 6 0v2" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
        strokeLinejoin="round"
      />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" strokeLinecap="round" />
    </svg>
  );
}

function IconBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-champagne px-1 text-[9px] font-bold text-obsidian">
      {count > 9 ? "9+" : count}
    </span>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const { totalItemCount } = useCart();
  const { notifications, unreadCount, markAllRead } = useNotifications();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setNotifOpen(false);
  }, [location.pathname]);

  function isActive(path: string) {
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  }

  function goToDressingRoom() {
    if (isLoggedIn) {
      navigate("/dressing-room");
    } else {
      navigate("/login", { state: { from: "/dressing-room" } });
    }
  }

  function handleBellClick() {
    if (!isLoggedIn) {
      navigate("/login", { state: { from: "/dressing-room" } });
      return;
    }
    setNotifOpen((prev) => !prev);
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-champagne/15 bg-obsidian/85 backdrop-blur-md light:bg-bone/85 py-3"
          : "border-b border-transparent bg-transparent py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link to="/" className="group flex flex-col leading-none">
          <span className="font-display text-xl tracking-[0.14em] text-bone light:text-ink sm:text-2xl">
            AURENCE
          </span>
          <span className="font-display text-[10px] italic tracking-[0.2em] text-champagne sm:text-xs">
            Fashion Empire
          </span>
        </Link>

        <nav className="hidden items-center gap-10 lg:flex">
          {primaryNav.map((item) => {
            const active = isActive(item.path);
            if (item.path === "/dressing-room") {
              return (
                <div className="flex">
                  <button
                    key={item.path}
                    type="button"
                    onClick={goToDressingRoom}
                    className={`eyebrow relative transition-colors ${
                      active
                        ? "text-champagne"
                        : "text-bone/80 hover:text-champagne light:text-ink/70"
                    }`}
                  >
                    {item.label}

                    {active && (
                      <motion.span
                        layoutId="active-nav-underline"
                        className="absolute -bottom-1.5 left-0 h-px w-full bg-champagne"
                      />
                    )}
                  </button>

                  <span className="mt-1 ml-2">
                    <button
                      type="button"
                      onClick={goToDressingRoom}
                      aria-label={`Cart, ${totalItemCount} item${totalItemCount === 1 ? "" : "s"}`}
                      className="relative text-bone/80 transition-colors hover:text-champagne light:text-ink/70"
                    >
                      <CartIcon />
                      <IconBadge count={totalItemCount} />
                    </button>
                    <button
                      type="button"
                      onClick={handleBellClick}
                      aria-label={`Notifications${isLoggedIn ? `, ${unreadCount} unread` : ""}`}
                      className="relative text-bone/80 transition-colors hover:text-champagne light:text-ink/70"
                    >
                      <BellIcon />
                      {isLoggedIn && <IconBadge count={unreadCount} />}
                    </button>
                  </span>
                </div>
              );
            }
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`eyebrow relative transition-colors ${
                  active
                    ? "text-champagne"
                    : "text-bone/80 hover:text-champagne light:text-ink/70 light:hover:text-bordeaux"
                }`}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="active-nav-underline"
                    className="absolute -bottom-1.5 left-0 h-px w-full bg-champagne"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          <div className="relative">
            <span className="lg:opacity-0">
              <button
                type="button"
                onClick={goToDressingRoom}
                aria-label={`Cart, ${totalItemCount} item${totalItemCount === 1 ? "" : "s"}`}
                className="relative text-bone/80 transition-colors hover:text-champagne light:text-ink/70"
              >
                <CartIcon />
                <IconBadge count={totalItemCount} />
              </button>
              <button
                type="button"
                onClick={handleBellClick}
                aria-label={`Notifications${isLoggedIn ? `, ${unreadCount} unread` : ""}`}
                className="relative text-bone/80 transition-colors hover:text-champagne light:text-ink/70"
              >
                <BellIcon />
                {isLoggedIn && <IconBadge count={unreadCount} />}
              </button>
            </span>
            <AnimatePresence>
              {notifOpen && isLoggedIn && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 top-full mt-3 w-72 rounded-lg border border-champagne/20 bg-obsidian-soft p-4 shadow-xl light:bg-bone-soft"
                >
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-champagne">
                      Notifications
                    </span>
                    {unreadCount > 0 && (
                      <button
                        type="button"
                        onClick={markAllRead}
                        className="text-[10px] text-bone/50 underline underline-offset-2 hover:text-champagne light:text-ink/50"
                      >
                        Mark all read
                      </button>
                    )}
                  </div>
                  <div className="mt-3 flex flex-col gap-3">
                    {notifications.map((n) => (
                      <div key={n.id} className="text-xs">
                        <p className="text-bone/80 light:text-ink/80">
                          {n.message}
                        </p>
                        <p className="mt-0.5 text-bone/40 light:text-ink/40">
                          {n.date}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <motion.span
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 4 : 0 }}
              className="h-px w-6 bg-champagne"
            />
            <motion.span
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -4 : 0 }}
              className="h-px w-6 bg-champagne"
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-champagne/15 bg-obsidian light:bg-bone lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-6">
              {primaryNav.map((item, i) => {
                const active = isActive(item.path);
                return (
                  <motion.li
                    key={item.path}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    {item.path === "/dressing-room" ? (
                      <button
                        type="button"
                        onClick={goToDressingRoom}
                        className={`eyebrow block py-3 text-left ${
                          active
                            ? "text-champagne"
                            : "text-bone/85 light:text-ink/80"
                        }`}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        to={item.path}
                        className={`eyebrow block py-3 ${
                          active
                            ? "text-champagne"
                            : "text-bone/85 light:text-ink/80"
                        }`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
