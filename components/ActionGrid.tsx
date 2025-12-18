import React from 'react';
import { Phone, MapPin, Mail, Globe } from 'lucide-react';

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
  const handleWhatsapp = () => window.open('https://wa.me/', '_blank');
  const handleMaps = () => window.open('https://maps.google.com', '_blank');
  const handleEmail = () => window.location.href = 'mailto:contact@luxestate.com';
  const handleSite = () => window.open('https://example.com', '_blank');

  return (
    <div className="grid grid-cols-2 gap-4 w-full mb-6">
      <ButtonItem 
        icon={<Phone size={24} />} 
        label="WhatsApp" 
        onClick={handleWhatsapp} 
      />
      <ButtonItem 
        icon={<MapPin size={24} />} 
        label="Localização" 
        onClick={handleMaps} 
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