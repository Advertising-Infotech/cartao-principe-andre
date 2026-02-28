import React from 'react';
import { Instagram, Twitter, Facebook, Send, Youtube } from 'lucide-react';

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

const DiscordIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
  >
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.23 10.23 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.419-2.157 2.419z"/>
  </svg>
);

const TikTokIcon = ({ size = 20 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.31-.75.42-1.24 1.25-1.33 2.1-.1.7.1 1.41.57 1.94.6.68 1.55 1.02 2.44.94 1.15-.07 2.13-.81 2.59-1.85.1-.25.14-.53.15-.81.01-4.06 0-8.12.01-12.19z"/>
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
        <a href="https://www.youtube.com/@Desnecessaurospodcast" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 hover:scale-110 transform">
            <Youtube size={20} />
        </a>
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
        <a href="https://discord.com/" target="_blank" rel="noopener noreferrer" title="Discord: poisonsource" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 hover:scale-110 transform">
            <DiscordIcon size={20} />
        </a>
        <a href="https://www.tiktok.com/@tiranossaurus_rex" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#D4AF37] transition-colors duration-300 hover:scale-110 transform">
            <TikTokIcon size={20} />
        </a>
      </div>
    </div>
  );
};