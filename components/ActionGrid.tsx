import React from 'react';
import { MessageCircle, Linkedin, Mail, Globe } from 'lucide-react';

const ButtonItem: React.FC<{ icon: React.ReactNode; label: string; onClick?: () => void }> = ({ icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 group backdrop-blur-sm transform hover:scale-105"
  >
    <div className="text-[#D4AF37] group-hover:text-white transition-colors duration-300 mb-2">
      {icon}
    </div>
    <span className="text-xs font-medium text-gray-200 uppercase tracking-wider group-hover:text-white">
      {label}
    </span>
  </button>
);

export const ActionGrid: React.FC = () => {
  const handleWhatsapp = () => window.open('https://wa.me/5562991599031', '_blank');
  const handleLinkedin = () => window.open('https://www.linkedin.com/in/advertising-propaganda-162220185/', '_blank');
  const handleEmail = () => window.location.href = 'mailto:advertisingpropaganda@gmail.com';
  const handleSite = () => window.open('mailto:advertisingpropaganda@gmail.com', '_blank');

  return (
    <div className="grid grid-cols-2 gap-4 w-full mb-6">
      <ButtonItem 
        icon={<MessageCircle size={24} />} 
        label="WhatsApp" 
        onClick={handleWhatsapp} 
      />
      <ButtonItem 
        icon={<Linkedin size={24} />} 
        label="LinkedIn" 
        onClick={handleLinkedin} 
      />
      <ButtonItem 
        icon={<Mail size={24} />} 
        label="E-mail" 
        onClick={handleEmail} 
      />
      <ButtonItem 
        icon={<Globe size={24} />} 
        label="Website" 
        onClick={handleSite} 
      />
    </div>
  );
};