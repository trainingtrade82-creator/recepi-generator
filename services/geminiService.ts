import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const recipeSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        recipeName: { type: Type.STRING, description: "The name of the recipe." },
        description: { type: Type.STRING, description: "A short, enticing description of the dish." },
        prepTime: { type: Type.STRING, description: "Preparation time, e.g., '15 minutes'." },
        cookTime: { type: Type.STRING, description: "Cooking time, e.g., '30 minutes'." },
        servings: { type: Type.STRING, description: "Number of servings, e.g., '4 servings'." },
        ingredients: {
          type: Type.ARRAY,
          description: "List of all ingredients required for the recipe.",
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING, description: "The name of the ingredient." },
              amount: { type: Type.STRING, description: "The quantity of the ingredient, e.g., '2 cups' or '1 tbsp'." },
              provided: { type: Type.BOOLEAN, description: "Set to true if this ingredient was in the user's provided list, otherwise false." },
            },
            required: ["name", "amount", "provided"],
          },
        },
        instructions: {
          type: Type.ARRAY,
          description: "Step-by-step cooking instructions.",
          items: {
            type: Type.STRING,
            description: "A single step in the cooking instructions.",
          },
        },
      },
      required: ["recipeName", "description", "prepTime", "cookTime", "servings", "ingredients", "instructions"],
    },
};

export const generateRecipes = async (
    ingredients: string,
    mealType: string,
    dietaryRestrictions: string
): Promise<Recipe[]> => {
    
    let prompt = `You are a creative and experienced chef. Your task is to generate 3 unique and delicious recipes.

    Available ingredients: ${ingredients}.
    
    Desired meal type: ${mealType || 'any'}.
    
    Dietary restrictions: ${dietaryRestrictions || 'none'}.
    
    Please create recipes that primarily use the available ingredients. You can include a few common pantry staples (like salt, pepper, oil, flour) that the user might have. For each ingredient in the recipes, identify whether it was part of the user-provided list.
    
    Return the response as a JSON array of 3 recipe objects.
    `;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: recipeSchema,
            },
        });
        
        const responseText = response.text.trim();

        if (!responseText) {
            throw new Error("Received an empty response from the API.");
        }
        
        const parsedRecipes: Recipe[] = JSON.parse(responseText);
        return parsedRecipes;

    } catch (error) {
        console.error("Error generating recipes:", error);
        throw new Error("Could not communicate with the Gemini API.");
    }
};