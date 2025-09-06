
import React from 'react';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
}

const InfoPill: React.FC<{ icon: JSX.Element; label: string }> = ({ icon, label }) => (
    <div className="flex items-center space-x-2 bg-emerald-50 text-emerald-800 rounded-full px-3 py-1 text-sm">
        {icon}
        <span>{label}</span>
    </div>
);


export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  return (
    <article className="bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 transition hover:shadow-xl">
      <div className="p-6">
        <h3 className="text-2xl font-bold text-slate-800 mb-2">{recipe.recipeName}</h3>
        <p className="text-slate-600 mb-4">{recipe.description}</p>
        
        <div className="flex flex-wrap gap-3 mb-6">
           <InfoPill icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 7.586V6z" clipRule="evenodd" /></svg>} label={`Prep: ${recipe.prepTime}`} />
           <InfoPill icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M11 18H9V2h2v16zM15 13H5V7h10v6z" /></svg>} label={`Cook: ${recipe.cookTime}`} />
           <InfoPill icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zm-1.559 5.559a1.5 1.5 0 10-2.882 0l-3.3 5.72A1.5 1.5 0 002.5 20h10a1.5 1.5 0 001.24-2.278l-3.3-5.72z" /></svg>} label={`${recipe.servings}`} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h4 className="text-lg font-semibold text-slate-700 mb-3 border-b pb-2">Ingredients</h4>
                <ul className="space-y-2">
                {recipe.ingredients.map((ing, index) => (
                    <li key={index} className="flex items-start space-x-3">
                        {ing.provided ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        )}
                        <span className="text-slate-600">
                           <span className="font-medium text-slate-800">{ing.amount}</span> {ing.name}
                           {ing.provided && <span className="text-xs text-green-600 ml-1">(You have this)</span>}
                        </span>
                    </li>
                ))}
                </ul>
            </div>
            <div>
                <h4 className="text-lg font-semibold text-slate-700 mb-3 border-b pb-2">Instructions</h4>
                <ol className="list-decimal list-inside space-y-3 text-slate-600">
                    {recipe.instructions.map((step, index) => (
                        <li key={index}>{step}</li>
                    ))}
                </ol>
            </div>
        </div>
      </div>
    </article>
  );
};
