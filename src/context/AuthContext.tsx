import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface AuthUser {
  name: string;
  email: string;
}

interface AuthContextValue {
  isLoggedIn: boolean;
  user: AuthUser | null;
  /**
   * Mock login — there is no backend yet, so this never actually checks a
   * password against anything. Any input that passes client-side
   * validation (see pages/Auth.tsx) succeeds. Do not treat this as real
   * authentication.
   */
  login: (email: string, name?: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "aurence-auth-user";

function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readStoredUser);

  useEffect(() => {
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (email: string, name?: string) => {
    setUser({ email, name: name || email.split("@")[0] });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ isLoggedIn: Boolean(user), user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
