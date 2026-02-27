import React from 'react';

export const ProfileHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center mb-8">
      <div className="relative mb-4 group">
        <div className="absolute inset-0 rounded-full bg-[#D4AF37] blur opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>
        <img 
          src="https://www.facebook.com/photo.php?fbid=9901341889934383&set=pb.100001760114261.-2207520000&type=3" 
          alt="Agent Profile" 
          className="relative w-32 h-32 rounded-full object-cover border-4 border-[#D4AF37] shadow-2xl"
        />
      </div>
      
      <h1 className="text-3xl font-bold text-white tracking-wide mb-1 drop-shadow-lg">
        Príncipe André Luís
      </h1>
      
      <h2 className="text-[#D4AF37] text-sm font-semibold uppercase tracking-widest mb-3">
        Criador; Decisor; Orquestrador
      </h2>
      
      <p className="text-gray-200 text-lg font-light max-w-xs leading-relaxed italic">
        "Criando novos mundos."
      </p>
    </div>
  );
};