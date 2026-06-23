import { NextResponse } from "next/server";
import { getRecipeById } from "@/services/recipes";
import { isFavorite } from "@/services/favorites";
import { verifyAccessToken } from "@/services/auth";
import { cookies } from "next/headers";

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const recipe = await getRecipeById(id);
        if (!recipe) {
            return NextResponse.json({ message: "Receta no encontrada" }, { status: 404 });
        }

        let favStatus = false;
        const cookieStore = await cookies();
        const token = cookieStore.get("accessToken")?.value;

        if (token) {
            try {
                const payload = verifyAccessToken(token);
                favStatus = await isFavorite(payload.sub, id);
            } catch {
                // Silent Failure Concept - continue without favorite status
            }
        }

        const recipeData = {
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
            isFavorite: favStatus,
        };

        return NextResponse.json({ recipe: recipeData }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: (error as Error).message }, { status: 500 });
    }
}