import { useState } from "react";
import { Link } from "react-router-dom";
import { StitchLine } from "@/components/ui/StitchLine";
import { footerHouseLinks, footerShopLinks, socialLinks } from "@/lib/navigation";
import { submitWaitlistEntry } from "@/lib/submitWaitlistEntry";

type NewsletterState = "idle" | "submitting" | "success" | "error";

export function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<NewsletterState>("idle");

  async function handleNewsletterSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("submitting");

    const result = await submitWaitlistEntry({
      name: "Newsletter Subscriber",
      email,
      audienceType: "Customer",
      message: "",
      source: "footer_newsletter",
    });

    if (result.success) {
      setStatus("success");
      setEmail("");
    } else {
      setStatus("error");
    }
  }

  return (
    <footer className="relative bg-obsidian-soft light:bg-bone-soft">
      <StitchLine orientation="horizontal" className="text-champagne/50" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <span className="font-display text-2xl tracking-[0.14em] text-bone light:text-ink">
              AURENCE
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-bone/60 light:text-ink/60">
              One house, every atelier. Aurence brings the world's finest
              fashion brands together under a single roof — for women who
              dress with intention.
            </p>
          </div>

          <div>
            <h3 className="eyebrow text-champagne">Shop</h3>
            <ul className="mt-5 space-y-3">
              {footerShopLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-bone/70 transition-colors hover:text-champagne light:text-ink/70 light:hover:text-bordeaux"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-champagne">The House</h3>
            <ul className="mt-5 space-y-3">
              {footerHouseLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-bone/70 transition-colors hover:text-champagne light:text-ink/70 light:hover:text-bordeaux"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow text-champagne">Stay Informed</h3>
            <p className="mt-5 text-sm text-bone/60 light:text-ink/60">
              Be first to enter the dressing room when it opens.
            </p>
            <form
              className="mt-4 flex items-center border-b border-champagne/40 focus-within:border-champagne"
              onSubmit={handleNewsletterSubmit}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "submitting" || status === "success"}
                placeholder="Your email"
                className="w-full bg-transparent py-2 text-sm text-bone placeholder:text-bone/40 focus:outline-none disabled:opacity-60 light:text-ink light:placeholder:text-ink/40"
              />
              <button
                type="submit"
                disabled={status === "submitting" || status === "success" || !email}
                className="eyebrow shrink-0 pl-3 text-champagne disabled:opacity-60 cursor-pointer disabled:cursor-not-allowed"
              >
                {status === "submitting"
                  ? "..."
                  : status === "success"
                    ? "Joined"
                    : "Join"}
              </button>
            </form>
            {status === "error" && (
              <p className="mt-2 text-xs text-champagne">
                Something went wrong — please try again.
              </p>
            )}

            <div className="mt-8 flex gap-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="eyebrow text-bone/50 transition-colors hover:text-champagne light:text-ink/50 light:hover:text-bordeaux"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-champagne/10 pt-6 text-xs text-bone/40 sm:flex-row sm:items-center sm:justify-between light:text-ink/40">
          <p>© {new Date().getFullYear()} Aurence Fashion Empire. All rights reserved.</p>
          <p className="font-display italic">Crafted for the modern couture house.</p>
        </div>
      </div>
    </footer>
  );
}