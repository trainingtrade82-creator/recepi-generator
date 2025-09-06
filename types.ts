
export interface Ingredient {
  name: string;
  amount: string;
  provided: boolean;
}

export interface Recipe {
  recipeName: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: string;
  ingredients: Ingredient[];
  instructions: string[];
}
