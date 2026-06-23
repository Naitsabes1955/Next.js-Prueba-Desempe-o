"use client";

import { useAuth } from "@/context/AuthContext";
import { RecipeProps } from "@/types/recipeCard";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const difficultyLabel: Record<string, string> = {
  Easy: "Fácil",
  Medium: "Media",
  Hard: "Difícil",
};

const difficultyColor: Record<string, string> = {
  Easy: "text-emerald-400 bg-emerald-400/10",
  Medium: "text-yellow-400 bg-yellow-400/10",
  Hard: "text-red-400 bg-red-400/10",
};

export default function RecipeCard({
  id,
  name,
  image,
  preparationTime,
  cookTime,
  difficulty,
  description,
  isFavorite = false,
  onFavoriteChange,
}: RecipeProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [fav, setFav] = useState(isFavorite);
  const [loading, setLoading] = useState(false);

  const handleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const method = fav ? "DELETE" : "POST";
      const endpoint = fav ? `/api/favorites/${id}` : "/api/favorites";
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: method === "POST" ? JSON.stringify({ recipeId: id }) : undefined,
        credentials: "include",
      });

      if (res.ok) {
        const next = !fav;
        setFav(next);
        onFavoriteChange?.(id, next);
      }
    } catch {
      // Silent failure
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link href={`/recipes/${id}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl border border-white/5 bg-white/3 transition-all duration-300 hover:border-white/15 hover:scale-[1.02] hover:shadow-xl">
        <div className="relative h-52 w-full overflow-hidden">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />

          <button
            onClick={handleFavorite}
            disabled={loading}
            className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200 ${
              fav
                ? "bg-yellow-400 text-dark"
                : "bg-white/10 text-white hover:bg-white/20"
            }`}
            title={fav ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill={fav ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth={fav ? 0 : 2}
              className="h-5 w-5"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
            </svg>
          </button>
        </div>

        <div className="p-4">
          <h3 className="line-clamp-2 text-base font-bold text-white group-hover:text-yellow-400 transition-colors">
            {name}
          </h3>
          {description && (
            <p className="mt-2 line-clamp-2 text-xs text-white/60">{description}</p>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <span
              className={`rounded-full px-2.5 py-1 text-xs font-medium ${difficultyColor[difficulty]}`}
            >
              {difficultyLabel[difficulty]}
            </span>
            <span className="text-xs text-white/50">⏱️ {preparationTime}m prep</span>
            <span className="text-xs text-white/50">🔥 {cookTime}m cook</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
