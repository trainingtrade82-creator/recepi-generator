
import React, { useState } from 'react';

interface IngredientFormProps {
  onSubmit: (ingredients: string, mealType: string, dietaryRestrictions: string) => void;
  isLoading: boolean;
}

export const IngredientForm: React.FC<IngredientFormProps> = ({ onSubmit, isLoading }) => {
  const [ingredients, setIngredients] = useState<string>('chicken breast, tomatoes, onion, garlic, rice');
  const [mealType, setMealType] = useState<string>('Dinner');
  const [dietaryRestrictions, setDietaryRestrictions] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredients.trim()) {
      onSubmit(ingredients, mealType, dietaryRestrictions);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg space-y-6 border border-slate-200">
      <div>
        <label htmlFor="ingredients" className="block text-sm font-medium text-slate-700 mb-2">
          What ingredients do you have?
        </label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="e.g., chicken breast, broccoli, carrots, soy sauce"
          className="w-full h-28 px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          required
        />
        <p className="text-xs text-slate-500 mt-1">Separate ingredients with commas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="mealType" className="block text-sm font-medium text-slate-700 mb-2">
            Meal Type (optional)
          </label>
          <input
            type="text"
            id="mealType"
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            placeholder="e.g., Breakfast, Lunch, Dinner"
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          />
        </div>
        <div>
          <label htmlFor="dietaryRestrictions" className="block text-sm font-medium text-slate-700 mb-2">
            Dietary Restrictions (optional)
          </label>
          <input
            type="text"
            id="dietaryRestrictions"
            value={dietaryRestrictions}
            onChange={(e) => setDietaryRestrictions(e.target.value)}
            placeholder="e.g., Vegan, Gluten-Free"
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex justify-center items-center bg-emerald-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 disabled:bg-slate-400 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          'Generate Recipes'
        )}
      </button>
    </form>
  );
};
