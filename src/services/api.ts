import type { AuthForm, AuthResponse } from "@/types/auth";

const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? "";

const getHeaders = () => ({
  "Content-Type": "application/json",
});

const buildUrl = (path: string) => {
  if (baseUrl) {
    return `${baseUrl}${path}`;
  }

  return path.startsWith("/") ? path : `/${path}`;
};

const request = async <T>(path: string, body?: unknown, method: string = "POST"): Promise<T> => {
  const init: RequestInit = {
    method,
    headers: getHeaders(),
    credentials: "include",
  };

  if (body !== undefined) {
    init.body = JSON.stringify(body);
  }

  const response = await fetch(buildUrl(path), init);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data?.message || "Error en la petición");
  }

  return data as T;
};

export const register = (payload: AuthForm) => request<AuthResponse>("/api/register", payload);
export const login = (payload: AuthForm) => request<AuthResponse>("/api/login", payload);
export const refreshToken = () => request<{ token: string }>("/api/refresh", undefined, "POST");
export const getCurrentUser = () => request<{ token: string; user: AuthResponse["user"] }>("/api/me", undefined, "GET");
export const logout = () => request<{ success: boolean }>("/api/logout", undefined, "POST");
