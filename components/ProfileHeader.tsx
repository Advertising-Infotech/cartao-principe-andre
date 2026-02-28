import React from 'react';
import { Instagram, Twitter, Facebook, Send } from 'lucide-react';

const RedditIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
  >
    <path d="M16.5 12c0-1.1-.9-2-2-2-.3 0-.6.1-.9.2-.7-.5-1.7-.8-2.8-.9l.6-2.6 1.9.4c.1.5.5.9 1 .9 1.1 0 2-.9 2-2s-.9-2-2-2c-.8 0-1.5.5-1.8 1.2l-2.1-.5c-.2 0-.4.1-.5.3l-.7 3.1c-1.1.1-2.1.4-2.8.9-.3-.1-.6-.2-.9-.2-1.1 0-2 .9-2 2 0 .8.5 1.5 1.2 1.8-.1.2-.1.4-.1.6 0 2.2 2.7 4 6 4s6-1.8 6-4c0-.2 0-.4-.1-.6.7-.3 1.2-1 1.2-1.8zm-10 0c0-.6.4-1 1-1s1 .4 1 1-.4 1-1 1-1-.4-1-1zm6.7 3.1c-.5.5-1.4.8-2.2.8s-1.7-.3-2.2-.8c-.2-.2-.2-.5 0-.7s.5-.2.7 0c.3.3.9.5 1.5.5s1.2-.2 1.5-.5c.2-.2.5-.2.7 0s.2.5 0 .7zm.3-2.1c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z"/>
  </svg>
);

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
      
      <p className="text-white text-[15px] font-light w-full max-w-xs leading-relaxed whitespace-nowrap overflow-hidden text-ellipsis mb-4">
        Criando novos mundos reciclando sentimentos.
      </p>

      <div className="flex gap-6 mb-2">
        <a href="https://www.instagram.com/tiranossaurusrex/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 hover:scale-110 transform">
            <Instagram size={20} />
        </a>
        <a href="https://x.com/Tiranossaurus" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 hover:scale-110 transform">
            <Twitter size={20} />
        </a>
        <a href="https://www.facebook.com/t.rex.hacker" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 hover:scale-110 transform">
            <Facebook size={20} />
        </a>
        <a href="https://t.me/+5562991599031" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 hover:scale-110 transform">
            <Send size={20} />
        </a>
        <a href="https://www.reddit.com/user/Tiranossaurus_Rex/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 hover:scale-110 transform">
            <RedditIcon size={20} />
        </a>
      </div>
    </div>
  );
};