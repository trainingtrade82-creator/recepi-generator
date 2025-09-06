
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { IngredientForm } from './components/IngredientForm';
import { RecipeCard } from './components/RecipeCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { generateRecipes } from './services/geminiService';
import type { Recipe } from './types';
import { Footer } from './components/Footer';

const App: React.FC = () => {
  const [apiKey, setApiKey] = useState<string>('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateRecipes = useCallback(async (ingredients: string, mealType: string, dietaryRestrictions: string) => {
    if (!apiKey) {
      setError("Please enter your Google Gemini API key above to generate recipes.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecipes([]);

    try {
      const generatedRecipes = await generateRecipes(ingredients, mealType, dietaryRestrictions, apiKey);
      setRecipes(generatedRecipes);
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to generate recipes: ${err.message}. Please check your API key and try again.`);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  }, [apiKey]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8">
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-slate-600 mb-8">
            Tired of staring at a full fridge with no idea what to make? Enter the ingredients you have, and let our AI chef whip up some delicious recipe ideas for you!
          </p>

          <div className="bg-white p-6 rounded-xl shadow-lg space-y-4 border border-slate-200 mb-8">
            <h2 className="text-xl font-semibold text-slate-800">Settings</h2>
            <div>
              <label htmlFor="api-key" className="block text-sm font-medium text-slate-700 mb-2">
                Google Gemini API Key
              </label>
              <input
                id="api-key"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key here"
                className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              />
              <p className="text-xs text-slate-500 mt-1">
                You can get your API key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Google AI Studio</a>.
              </p>
            </div>
          </div>

          <IngredientForm onSubmit={handleGenerateRecipes} isLoading={isLoading} />

          {isLoading && <LoadingSpinner />}
          
          {error && (
            <div className="mt-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg" role="alert">
              <strong className="font-bold">Oops!</strong>
              <span className="block sm:inline ml-2">{error}</span>
            </div>
          )}

          {!isLoading && recipes.length > 0 && (
            <div className="mt-10 space-y-8">
              <h2 className="text-3xl font-bold text-slate-800 text-center">Your Custom Recipes</h2>
              {recipes.map((recipe, index) => (
                <RecipeCard key={index} recipe={recipe} />
              ))}
            </div>
          )}

           {!isLoading && recipes.length === 0 && !error && (
            <div className="mt-10 text-center text-slate-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-slate-900">No recipes yet</h3>
                <p className="mt-1 text-sm text-slate-500">Enter your ingredients and API key to get started!</p>
            </div>
           )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;
