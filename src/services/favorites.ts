import connectDb from "@/lib/db";
import Favorite from "@/database/models/Favorites";
import Recipe from "@/database/models/Recipes";

export const getFavoritesByUser = async (userId: string) => {
  await connectDb();
  const favorites = await Favorite.find({ userId }).lean();
  const recipeIds = favorites.map((f) => f.recipeId);
  const recipes = await Recipe.find({ _id: { $in: recipeIds } }).lean(); //$in search in each document where _id is in the array recipeIDs, thats very util for performance
return recipes;                                                          //.lean() return objects only in JSON totally
};

export const addFavorite = async (userId: string, recipeId: string) => {
  await connectDb();
  await Favorite.create({ userId, recipeId });
};

export const removeFavorite = async (userId: string, recipeId: string) => {
  await connectDb();
  await Favorite.deleteOne({ userId, recipeId });
};

export const isFavorite = async (userId: string, recipeId: string) => {
  await connectDb();
  const fav = await Favorite.findOne({ userId, recipeId }).lean();
  return !!fav; //transform any value in boolean El primer ! convierte el objeto en false o el null en true (invierte el valor de verdad).
};

export const getUserFavoriteIds = async (userId: string): Promise<string[]> => {
  await connectDb();
  const favs = await Favorite.find({ userId }).lean();
  return favs.map((f) => f.recipeId.toString()); //transform id in normal String IDs
};