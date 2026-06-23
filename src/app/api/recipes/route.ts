import { NextResponse } from "next/server";
import { getRecipes } from "@/services/recipes";
import { verifyAccessToken } from "@/services/auth";
import { cookies } from "next/headers";
import { getUserFavoriteIds } from "@/services/favorites";

export async function GET() {
  try {
    const recipes = await getRecipes();

    let favoriteIds: string[] = [];
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("accessToken")?.value;

      if (token) {
        const payload = verifyAccessToken(token);
        favoriteIds = await getUserFavoriteIds(payload.sub);
      }
    } catch {
      // Silent failure - continue without favorites
    }

    const recipesWithFavorites = recipes.map((recipe: any) => ({
      id: recipe._id?.toString() || recipe.id,
      name: recipe.name,
      image: recipe.image,
      description: recipe.description,
      preparationTime: recipe.preparationTime,
      cookTime: recipe.cookTime,
      difficulty: recipe.difficulty,
      portions: recipe.portions,
      ingredients: recipe.ingredients,
      steps: recipe.steps,
      isFavorite: favoriteIds.includes(recipe._id?.toString() || recipe.id),
    }));

    return NextResponse.json({ recipes: recipesWithFavorites }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: (error as Error).message },
      { status: 500 }
    );
  }
}
