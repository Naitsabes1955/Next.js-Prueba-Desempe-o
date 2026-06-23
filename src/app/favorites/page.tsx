"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import RecipeCard from "@/components/RecipeCard";

type Recipe = {
  _id: string;
  name: string;
  image: string;
  preparationTime: number;
  cookTime: number;
  difficulty: "Easy" | "Medium" | "Hard";
  description?: string;
};

export default function FavoritesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchFavorites = () => {
    fetch("/api/favorites", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        setRecipes(data.recipes ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  const handleFavoriteChange = (_id: string, newState: boolean) => {
    if (!newState) {
      setRecipes((prev) => prev.filter((r) => r._id !== _id));
    }
  };

  return (
    <main className="min-h-screen bg-dark text-white">
      <header className="sticky top-0 z-50 border-b border-white/5 bg-dark/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link href="/recipes" className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Catálogo
          </Link>
          <Link href="/" className="text-xl font-bold">
            <span className="text-yellow-400">Nait's</span>
            <span className="font-light"> Recipes</span>
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10 text-center">
          <span className="text-xs font-bold uppercase tracking-widest text-yellow-400">
            Mi colección
          </span>
          <h1 className="mt-3 text-4xl font-extrabold text-white">Mis Favoritos</h1>
          <p className="mt-3 text-white/50">Las recetas que guardaste para volver a hacer.</p>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-80 rounded-2xl bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : recipes.length === 0 ? (
          <div className="flex flex-col items-center gap-6 py-24 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-white/10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
            </svg>
            <p className="text-white/40">Aún no tienes recetas guardadas.</p>
            <Link href="/recipes" className="rounded-full bg-yellow-400 px-6 py-3 text-sm font-bold text-black transition-all hover:bg-yellow-300">
              Explorar recetas
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                id={recipe._id}
                name={recipe.name}
                image={recipe.image}
                preparationTime={recipe.preparationTime}
                cookTime={recipe.cookTime}
                difficulty={recipe.difficulty}
                description={recipe.description}
                isFavorite={true}
                onFavoriteChange={handleFavoriteChange}
              />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}