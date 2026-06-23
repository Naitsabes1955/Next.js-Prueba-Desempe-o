import mongoose, { Document, Model, Schema } from "mongoose";

export interface IRecipes extends Document {
    name: string;
    description?: string;
    portions: string;
    ingredients: string;
    difficulty: "Easy" | "Medium" | "Hard"
    preparationTime: number;
    cookTime: number;
    image:string;
    steps: string;
    createdAt: Date;
}

const RecipeSchema = new Schema<IRecipes>(
    {
    name: { 
        type: String, 
        required: true, 
        trim: true 
    },
    description: { 
        type: String, 
        trim: true 
    },
    portions: { 
        type: String, 
        required: true 
    },
    ingredients: { 
        type: String, 
        required: true 
    },
    difficulty: { 
      type: String, 
      required: true, 
      enum: ["Easy" , "Medium" , "Hard"],
      default: "Easy"
    },
    preparationTime: { 
        type: Number, 
        required: true 
    },
    cookTime: { 
        type: Number, 
        required: true 
    },
    image: { 
        type: String, 
        required: true 
    },
    steps: { 
        type: 
        String, 
        required: true 
    },
},{
    timestamps: true, // creation automaticaly 'createdAt' y 'updatedAt'
  }
)
const Recipe: Model<IRecipes> =
  mongoose.models.Recipe || mongoose.model<IRecipes>("Recipe", RecipeSchema);

export default Recipe;