import React from 'react';

export const ProfileHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center mb-8">
      <div className="relative mb-4 group">
        <div className="absolute inset-0 rounded-3xl bg-[#D4AF37] blur opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
        <img 
          src="/foto_oficial.jpg" 
          alt="Agent Profile" 
          className="relative w-40 h-40 rounded-3xl object-cover border-4 border-[#D4AF37] shadow-2xl"
        />
      </div>
      
      <h1 className="text-3xl font-bold text-white tracking-wide mb-1 drop-shadow-lg">
        <span className="italic">Príncipe</span> André Luís
      </h1>
      
      <h2 className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-3">
        Criador &gt; Decisor &gt; Orquestrador
      </h2>
      
      <p className="text-white text-sm font-light w-full max-w-xs leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis">
        Criando novos mundos reciclando sentimentos.
      </p>
    </div>
  );
};