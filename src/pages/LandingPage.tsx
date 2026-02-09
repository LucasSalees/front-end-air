import { useEffect } from 'react';
import { Server } from 'lucide-react';
import api from '../services/api';

export default function LandingPage() {
  useEffect(() => {
    const wakeServer = async () => {
      try {
        await api.get('/agendamentos');
      } catch (error) {
        console.log("Servidor acordando...");
      }
    };
    wakeServer();
  }, []);

  return (
    <div className="card-tech rounded-3xl py-12 px-6 md:px-20 shadow-2xl">
      <div className="w-20 h-20 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-yellow-500/20 shadow-[0_0_15px_rgba(230,162,6,0.1)]">
        <Server className="w-10 h-10 text-yellow-500" />
      </div>
      
      <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight leading-tight">
        Bem-vindo à <br className="block md:hidden" />
        <span className="text-yellow-500 break-words">
          Class Ar Condicionado
        </span>
      </h2>
      
      <p className="text-slate-400 max-w-md mx-auto mb-8 text-lg font-light leading-relaxed">
        O sistema de climatização inteligente para o seu conforto.
      </p>
    </div>
  );
}