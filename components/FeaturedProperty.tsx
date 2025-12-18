import React from 'react';
import { ArrowRight } from 'lucide-react';

export const FeaturedProperty: React.FC = () => {
  return (
    <div className="w-full mt-6 mb-8">
      <div className="flex items-center justify-between mb-3 px-1">
        <h3 className="text-white text-sm font-semibold uppercase tracking-wider">
          Oportunidade do Mês
        </h3>
        <span className="text-[#D4AF37] text-xs">Ver todas</span>
      </div>
      
      <div className="relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-transform hover:scale-[1.02] duration-300">
        <div className="relative h-48 w-full overflow-hidden">
            <div className="absolute top-3 right-3 z-10 bg-[#D4AF37] text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                Venda
            </div>
            <img 
                src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800&h=600" 
                alt="Luxury Mansion" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90" />
        </div>

        <div className="p-4 relative -mt-12">
            <h4 className="text-lg font-bold text-white mb-1">Mansão Horizon</h4>
            <p className="text-gray-300 text-xs mb-3 flex items-center">
                Jardins, São Paulo
            </p>
            
            <div className="flex items-center justify-between mt-2">
                <span className="text-[#D4AF37] font-bold text-lg">R$ 12.500.000</span>
                <button className="flex items-center gap-1 text-white text-xs bg-white/10 hover:bg-[#D4AF37] hover:text-black px-3 py-2 rounded-lg transition-colors duration-300 backdrop-blur-md border border-white/20">
                    Detalhes <ArrowRight size={14} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};