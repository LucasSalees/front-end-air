import { useState, useEffect } from 'react';
import { Wind, Loader2, Server } from 'lucide-react';
import api from '../services/api';

export default function LoginPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/agendamentos').finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
     <div className="card-tech-login rounded-3xl p-12 shadow-2xl">
        <div className="relative flex items-center justify-center">
          <Loader2 className="w-16 h-16 text-yellow-500 animate-spin" strokeWidth={1.5} />
          <Wind className="w-6 h-6 text-yellow-500/50 absolute" />
          <div className="absolute w-20 h-20 bg-yellow-500/10 rounded-full blur-xl" />
        </div>
        <h2 className="mt-8 text-xl font-bold text-white animate-pulse tracking-tight uppercase font-syncopate">
          Iniciando <span className="text-yellow-500">Servidor</span>
        </h2>
        <p className="text-slate-500 mt-2 text-sm font-light tracking-widest uppercase">Conectando ao Render & Supabase...</p>
      </div>
    );
  }

  return (
    <div className="card-tech-login rounded-3xl p-12 shadow-2xl">
      <div className="w-20 h-20 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-yellow-500/20">
        <Server className="w-8 h-8 text-yellow-500" />
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-4">Login do Sistema</h2>
      <div className="p-4 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg mb-8 text-sm font-medium uppercase tracking-wider">
        ● Servidor Online
      </div>
      <form className="space-y-4 text-left">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Usuário</label>
          <input type="text" disabled className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none" placeholder="Seu usuário" />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Senha</label>
          <input type="password" disabled className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none" placeholder="••••••••" />
        </div>
        <button type="button" disabled className="w-full bg-[#e6a206] text-black font-bold py-3 rounded-lg opacity-50 mt-4">ENTRAR</button>
      </form>
    </div>
  );
}