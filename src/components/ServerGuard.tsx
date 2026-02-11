import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom'; // Importante!
import { Wind, Loader2 } from 'lucide-react';
import api from '../services/api';

export default function ServerGuard() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkServerHealth = async () => {
      try {
        // Tenta bater no health check
        await api.get('/login/health');
        if (mounted) setLoading(false);
      } catch (err) {
        console.log("Servidor dormindo... pingando novamente em 3s");
        if (mounted) {
          setTimeout(checkServerHealth, 3000);
        }
      }
    };

    checkServerHealth();

    return () => { mounted = false; };
  }, []);

  if (loading) {
    // A SUA TELA DE LOADING BONITA AQUI:
    return (
      <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-6">
          <div className="card-tech-login rounded-3xl p-12 shadow-2xl bg-[#121214] border border-white/5">
            <div className="relative flex items-center justify-center">
              <Loader2 className="w-16 h-16 text-yellow-500 animate-spin" strokeWidth={1.5} />
              <Wind className="w-6 h-6 text-yellow-500/50 absolute" />
              <div className="absolute w-20 h-20 bg-yellow-500/10 rounded-full blur-xl" />
            </div>
            <div className="text-center">
                <h2 className="mt-8 text-xl font-bold text-white animate-pulse tracking-tight uppercase">
                Iniciando <span className="text-yellow-500">Servidor</span>
                </h2>
                <p className="text-slate-500 mt-2 text-sm font-light tracking-widest uppercase">
                Conectando ao Render & Supabase...
                </p>
                <p className="text-xs text-slate-600 mt-4">Isso pode levar até 1 minuto.</p>
            </div>
          </div>
      </div>
    );
  }

  // Se o servidor respondeu, renderiza as rotas filhas
  return <Outlet />;
}