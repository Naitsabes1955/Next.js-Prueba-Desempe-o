"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import type { AuthResponse } from "@/types/auth";
import { getCurrentUser, logout as apiLogout } from "@/services/api";

export type AuthContextValue = {
  user: AuthResponse["user"] | null;
  token: string | null;
  signIn: (data: AuthResponse) => void;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const AUTH_STORAGE_KEY = "ecommerce-auth-token";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthResponse["user"] | null>(null);

  const clearSession = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as AuthResponse;
        setToken(parsed.token);
        setUser(parsed.user);
      } catch {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }

    const verifySession = async () => {
      try {
        const data = await getCurrentUser();
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
      } catch {
        clearSession();
      }
    };

    verifySession();
  }, [pathname]);

  useEffect(() => {
    const handleFocus = () => {
      getCurrentUser().catch(clearSession).then((data) => {
        if (data) {
          setToken(data.token);
          setUser(data.user);
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
        }
      });
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      signIn: (data: AuthResponse) => {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
      },
      signOut: async () => {
        try {
          await apiLogout();
        } catch {
          // ignore network failures on logout
        }
        clearSession();
      },
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
