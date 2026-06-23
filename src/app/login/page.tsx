"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { login } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import FormAlert from "@/components/ui/FormAlert";

const initialState = { email: "", password: "" };

export default function Login() {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { signIn } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await login(form);
      signIn(result);
      router.push("/");
    } catch (err) {
      setError((err as Error).message || "No se pudo iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="pointer-events-none fixed inset-0 flex items-center justify-center">
        <div className="h-96 w-96 opacity-10 rounded-full bg-gold blur-[160px]" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="mb-10 text-center">
          <Link href="/" className="inline-block">
            <span className="text-2xl font-extrabold text-gold">Nait's</span>
            <span className="text-2xl font-light text-cream"> Recipes</span>
          </Link>
          <p className="mt-2 text-xs uppercase tracking-widest text-muted">
            Bienvenido de vuelta
          </p>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/5 bg-surface p-8 shadow-2xl">
          <h1 className="mb-1 text-xl font-bold text-white">Iniciar sesión</h1>
          <p className="mb-8 text-sm text-muted">
            ¿No tienes cuenta?{" "}
            <Link
              href="/register"
              className="text-gold transition-colors hover:text-gold-light"
            >
              Regístrate gratis
            </Link>
          </p>

          {error && (
            <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={handleChange}
                placeholder="tu@email.com"
                className="w-full rounded-xl border border-white/10 bg-dark px-4 py-3 text-sm text-cream placeholder-muted/50 outline-none ring-0 transition-all focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted"
              >
                Contraseña
              </label>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                required
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-dark px-4 py-3 text-sm text-cream placeholder-muted/50 outline-none ring-0 transition-all focus:border-gold/50 focus:ring-1 focus:ring-gold/30"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 w-full rounded-xl bg-gold px-6 py-3.5 text-sm font-bold text-dark shadow-lg shadow-gold/10 transition-all hover:bg-gold-light hover:translate-y disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-dark border-t-transparent" />
                  Entrando…
                </span>
              ) : (
                "Entrar"
              )}
            </button>
          </form>
        </div>

        <p className="mt-8 text-center text-xs text-muted/40">
          © 2026 Ecommerce Publicidad. Todos los derechos reservados.
        </p>
      </div>
    </main>
  );
}
