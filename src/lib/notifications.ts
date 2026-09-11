import { useCallback, useEffect, useState } from "react";

export interface AppNotification {
  id: string;
  type: "delivery" | "message" | "price";
  message: string;
  date: string;
}

/**
 * PLACEHOLDER DATA — these are illustrative examples of the kinds of
 * notifications Aurence will eventually generate (order updates, brand
 * messages, price drops on favorited items), not real events. Replace
 * with a real notifications feed once orders/messaging/accounts exist.
 */
const MOCK_NOTIFICATIONS: AppNotification[] = [
  { id: "n1", type: "delivery", message: "Your order from Vellamor has shipped.", date: "2 hours ago" },
  { id: "n2", type: "message", message: "Isabeau Atelier replied to your customization request.", date: "1 day ago" },
  { id: "n3", type: "price", message: "A brand you favorited, Kavir House, added new arrivals.", date: "3 days ago" },
];

const STORAGE_KEY = "aurence-notifications-read";

function readReadIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function useNotifications() {
  const [readIds, setReadIds] = useState<string[]>(readReadIds);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(readIds));
  }, [readIds]);

  const markAllRead = useCallback(() => {
    setReadIds(MOCK_NOTIFICATIONS.map((n) => n.id));
  }, []);

  const unreadCount = MOCK_NOTIFICATIONS.filter((n) => !readIds.includes(n.id)).length;

  return { notifications: MOCK_NOTIFICATIONS, unreadCount, markAllRead };
}
