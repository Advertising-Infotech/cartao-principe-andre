import React from 'react';
import { MessageCircle, Linkedin, Mail, Globe } from 'lucide-react';

const ButtonItem: React.FC<{ icon: React.ReactNode; onClick?: () => void }> = ({ icon, onClick }) => (
  <button 
    onClick={onClick}
    className="flex items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 group backdrop-blur-sm transform hover:scale-105"
  >
    <div className="text-[#D4AF37] group-hover:text-white transition-colors duration-300">
      {icon}
    </div>
  </button>
);

export const ActionGrid: React.FC = () => {
  const handleWhatsapp = () => window.open('https://wa.me/5562991599031', '_blank');
  const handleLinkedin = () => window.open('https://www.linkedin.com/in/advertising-propaganda-162220185/', '_blank');
  const handleEmail = () => window.location.href = 'mailto:advertisingpropaganda@gmail.com';
  const handleSite = () => window.open('mailto:advertisingpropaganda@gmail.com', '_blank');

  return (
    <div className="grid grid-cols-4 gap-3 w-full mb-6">
      <ButtonItem 
        icon={<MessageCircle size={20} />} 
        onClick={handleWhatsapp} 
      />
      <ButtonItem 
        icon={<Linkedin size={20} />} 
        onClick={handleLinkedin} 
      />
      <ButtonItem 
        icon={<Mail size={20} />} 
        onClick={handleEmail} 
      />
      <ButtonItem 
        icon={<Globe size={20} />} 
        onClick={handleSite} 
      />
    </div>
  );
};