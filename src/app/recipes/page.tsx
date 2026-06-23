"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RecipeCard from "@/components/RecipeCard";
import { RecipeProps } from "@/types/recipeCard";

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<RecipeProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>("All");

  useEffect(() => {
    fetch("/api/recipes", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        setRecipes(data.recipes ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleFavoriteChange = (id: string, newState: boolean) => {
    setRecipes((prev) =>
      prev.map((r) => (r.id === id ? { ...r, isFavorite: newState } : r))
    );
  };

  const difficulties = ["All", "Easy", "Medium", "Hard"];
  const filtered =
    filter === "All" ? recipes : recipes.filter((r) => r.difficulty === filter);

  return (
    <main className="min-h-screen bg-dark text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/5 bg-dark/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-xl font-bold tracking-tight">
            <span className="text-yellow-400 font-extrabold">Nait's</span>
            <span className="text-white font-light"> Recipes</span>
          </Link>
          <div className="flex gap-4">
            <Link href="/favorites" className="text-sm text-white/60 hover:text-white transition-colors">
              Mis Favoritos
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-16">
        {/* Título */}
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-yellow-400">
            Catálogo
          </span>
          <h1 className="mt-3 text-4xl font-extrabold text-white">
            Todas las Recetas
          </h1>
          <p className="mt-3 text-white/50">
            Descubre nuestras recetas. Guarda tus favoritas para encontrarlas rápido.
          </p>
        </div>

        {/* Filtros */}
        <div className="mb-8 flex justify-center gap-3">
          {difficulties.map((d) => (
            <button
              key={d}
              onClick={() => setFilter(d)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition-all ${
                filter === d
                  ? "bg-yellow-400 text-black"
                  : "border border-white/10 text-white/60 hover:border-white/30 hover:text-white"
              }`}
            >
              {d === "All" ? "Todas" : d === "Easy" ? "Fácil" : d === "Medium" ? "Media" : "Difícil"}
            </button>
          ))}
        </div>

        {/* Grid */}
        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-white/40 py-20">No hay recetas disponibles.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                id={recipe.id}
                name={recipe.name}
                image={recipe.image}
                preparationTime={recipe.preparationTime}
                cookTime={recipe.cookTime}
                difficulty={recipe.difficulty}
                description={recipe.description}
                isFavorite={recipe.isFavorite}
                onFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}