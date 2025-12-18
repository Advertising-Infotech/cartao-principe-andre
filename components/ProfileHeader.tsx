import React from 'react';

export const ProfileHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center mb-8">
      <div className="relative mb-4 group">
        <div className="absolute inset-0 rounded-full bg-[#D4AF37] blur opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
        <img 
          src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200&h=200" 
          alt="Agent Profile" 
          className="relative w-32 h-32 rounded-full object-cover border-4 border-[#D4AF37] shadow-2xl"
        />
      </div>
      
      <h1 className="text-3xl font-bold text-white tracking-wide mb-1 drop-shadow-lg">
        Arthur Morgan
      </h1>
      
      <h2 className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-3">
        Corretor de Imóveis de Luxo
      </h2>
      
      <p className="text-gray-200 text-sm font-light max-w-xs leading-relaxed italic">
        "Transformando sonhos em endereços exclusivos."
      </p>
    </div>
  );
};