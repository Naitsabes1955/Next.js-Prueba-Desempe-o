import connectDb from "@/lib/db";
import Recipe from "@/database/models/Recipes";

export const getRecipes = async () => {
  await connectDb();
  const recipes = await Recipe.find({}).lean();
  return recipes;
};

export const getRecipeById = async (id: string) => {
  await connectDb();
  const recipe = await Recipe.findById(id).lean();
  return recipe;
};