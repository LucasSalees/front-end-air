import { useState, useEffect } from 'react';
import { Server, User, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/dashboard');
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate(response.data.primeiroAcesso ? '/reset-password' : '/dashboard');
    } catch (err) {
      alert("Erro no login.");
    }
  };

  return (
    // CONTAINER CENTRALIZADO (Padrão de Tela Cheia)
    <div className="min-h-screen flex items-center justify-center p-4">
      
      {/* CARD DE LOGIN (Padrão Visual do Sistema) */}
      <div className="bg-[#121214] border border-white/5 rounded-3xl p-8 md:p-12 w-full max-w-md shadow-2xl relative overflow-hidden">
        
        {/* Efeito de luz de fundo (Opcional, mas dá charme) */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

        <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-8 border border-yellow-500/20">
          <Server className="w-8 h-8 text-yellow-500" />
        </div>

        <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2 tracking-tight">Bem-vindo</h2>
            <p className="text-slate-500 text-sm">Insira suas credenciais para acessar o painel.</p>
        </div>

        {/* Status do Servidor */}
        <div className="flex items-center gap-3 p-3 bg-green-500/5 border border-green-500/10 rounded-xl mb-8">
            <span className="relative flex h-2.5 w-2.5 ml-1">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
            </span>
            <span className="text-xs font-medium text-green-400 uppercase tracking-wider">Sistema Online</span>
        </div>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Usuário</label>
            <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-500 transition-colors">
                    <User size={20} />
                </div>
                {/* INPUT PADRÃO DO SISTEMA */}
                <input 
                  type="text" 
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition-all"
                  placeholder="Digite seu usuário"
                  required
                />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Senha</label>
            <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-yellow-500 transition-colors">
                    <Lock size={20} />
                </div>
                {/* INPUT PADRÃO DO SISTEMA */}
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-slate-600 outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition-all"
                  placeholder="••••••••"
                  required
                />
            </div>
          </div>

          {/* BOTÃO PADRÃO DO SISTEMA */}
          <button 
            type="submit" 
            className="w-full bg-yellow-500 text-black font-bold py-4 rounded-xl hover:bg-yellow-400 transition-all mt-4 shadow-lg shadow-yellow-500/20 active:scale-95 flex items-center justify-center gap-2 group"
          >
            ENTRAR NO SISTEMA
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
}