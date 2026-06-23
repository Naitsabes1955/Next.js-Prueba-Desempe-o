"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

interface Recipe {
  id: string;
  name: string;
  description?: string;
  image: string;
  difficulty: "Easy" | "Medium" | "Hard";
  preparationTime: number;
  cookTime: number;
  portions: string;
  ingredients: string;
  steps: string;
  isFavorite: boolean;
}

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

export default function RecipeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const id = params.id as string;

  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [savingFavorite, setSavingFavorite] = useState(false);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const response = await fetch(`/api/recipes/${id}`, {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch recipe: ${response.status}`);
        }
        const data = await response.json();
        setRecipe(data.recipe);
        setIsFavorite(data.recipe.isFavorite || false);
      } catch (err) {
        setError((err as Error).message || "Failed to load recipe");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  const handleToggleFavorite = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    setSavingFavorite(true);
    try {
      const endpoint = isFavorite ? `/api/favorites/${id}` : "/api/favorites";
      const method = isFavorite ? "DELETE" : "POST";
      const body = !isFavorite ? JSON.stringify({ recipeId: id }) : undefined;

      const response = await fetch(endpoint, {
        method,
        headers: body ? { "Content-Type": "application/json" } : undefined,
        body,
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to update favorite");
      }

      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error("Error updating favorite:", err);
    } finally {
      setSavingFavorite(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-yellow-400 border-t-transparent mx-auto mb-4"></div>
          <p className="text-white">Cargando receta...</p>
        </div>
      </main>
    );
  }

  if (error || !recipe) {
    return (
      <main className="min-h-screen bg-dark flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-red-400 mb-2">Error</h1>
          <p className="text-white/60 mb-6">{error || "Receta no encontrada"}</p>
          <Link
            href="/recipes"
            className="inline-block px-6 py-2 bg-yellow-400 text-dark font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
          >
            Volver a recetas
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-dark px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link
          href="/recipes"
          className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 transition-colors mb-8"
        >
          ← Volver a recetas
        </Link>

        <div className="relative rounded-2xl overflow-hidden mb-8 h-96">
          {recipe.image && (
            <img
              src={recipe.image}
              alt={recipe.name}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-linear-to-t from-dark via-transparent to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white">{recipe.name}</h1>
                {recipe.description && (
                  <p className="mt-3 text-white/80 max-w-2xl">
                    {recipe.description}
                  </p>
                )}
              </div>
              <button
                onClick={handleToggleFavorite}
                disabled={savingFavorite || !user}
                className="shrink-0 ml-4 text-5xl hover:scale-110 transition-transform disabled:opacity-50"
                title={!user ? "Login para guardar favoritos" : undefined}
              >
                {isFavorite ? "⭐" : "☆"}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Info */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-white/60 mb-1">Dificultad</p>
            <p className={`font-semibold ${difficultyColor[recipe.difficulty]}`}>
              {difficultyLabel[recipe.difficulty]}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-white/60 mb-1">Preparación</p>
            <p className="font-semibold text-white">{recipe.preparationTime}m</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-white/60 mb-1">Cocción</p>
            <p className="font-semibold text-white">{recipe.cookTime}m</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs text-white/60 mb-1">Porciones</p>
            <p className="font-semibold text-white">{recipe.portions}</p>
          </div>
        </div>

        {/* Ingredients */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Ingredientes</h2>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="space-y-3 whitespace-pre-wrap text-white/80">
              {recipe.ingredients}
            </div>
          </div>
        </section>

        {/* Steps */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">Pasos</h2>
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="space-y-4 whitespace-pre-wrap text-white/80">
              {recipe.steps}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
