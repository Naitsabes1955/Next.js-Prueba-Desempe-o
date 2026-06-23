export type RecipeProps = {
  id: string;
  name: string;
  image: string;
  preparationTime: number;
  cookTime: number;
  difficulty: "Easy" | "Medium" | "Hard";
  description?: string;
  isFavorite?: boolean;
  onFavoriteChange?: (id: string, newState: boolean) => void;
};