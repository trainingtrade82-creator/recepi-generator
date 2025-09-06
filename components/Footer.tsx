
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white mt-12 py-6">
      <div className="container mx-auto px-4 text-center text-slate-500">
        <p>&copy; {new Date().getFullYear()} Gemini Recipe Generator. Powered by AI, crafted for your kitchen.</p>
      </div>
    </footer>
  );
};
