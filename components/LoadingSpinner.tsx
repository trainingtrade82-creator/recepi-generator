
import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center mt-12">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      <p className="mt-4 text-slate-600 font-semibold">Generating your culinary masterpiece...</p>
      <p className="text-sm text-slate-500">The AI chef is preheating the oven!</p>
    </div>
  );
};
