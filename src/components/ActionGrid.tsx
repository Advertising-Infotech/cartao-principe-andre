import { MessageCircle, Linkedin, Mail, Globe } from 'lucide-react';

interface ButtonItemProps {
  icon: React.ReactNode;
  href: string;
}

function ButtonItem({ icon, href }: ButtonItemProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center p-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-300 group backdrop-blur-sm transform hover:scale-105"
    >
      <div className="text-[#D4AF37] group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
    </a>
  );
}

const buttons = [
  { icon: <MessageCircle size={20} />, href: 'https://wa.me/5562991599031' },
  { icon: <Linkedin size={20} />, href: 'https://www.linkedin.com/in/advertising-propaganda-162220185/' },
  { icon: <Mail size={20} />, href: 'mailto:advertisingpropaganda@gmail.com' },
  { icon: <Globe size={20} />, href: 'https://advertisinginfotech.com.br' },
];

export function ActionGrid() {
  return (
    <div className="grid grid-cols-4 gap-3 w-full mb-2">
      {buttons.map((button, index) => (
        <ButtonItem key={index} icon={button.icon} href={button.href} />
      ))}
    </div>
  );
}
