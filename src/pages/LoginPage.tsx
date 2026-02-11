import { useState, useEffect } from 'react';
import { Server } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Apenas verifica se já está logado
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.post('/login', { username, password });
      const { token, primeiroAcesso } = response.data;
      localStorage.setItem('token', token);

      if (primeiroAcesso) {
        navigate('/reset-password');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      alert("Erro no login. Verifique suas credenciais.");
    }
  };

  return (
    <div className="card-tech-login rounded-3xl p-12 shadow-2xl">
      <div className="w-20 h-20 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-yellow-500/20">
        <Server className="w-8 h-8 text-yellow-500" />
      </div>
      <h2 className="text-3xl font-extrabold text-white mb-4">Login do Sistema</h2>
      <div className="p-4 bg-green-500/10 text-green-400 border border-green-500/20 rounded-lg mb-8 text-sm font-medium uppercase tracking-wider text-center">
        ● Servidor Online
      </div>
      
      <form onSubmit={handleLogin} className="space-y-4 text-left">
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Usuário</label>
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-yellow-500 text-white transition-colors"
            placeholder="Seu usuário"
            required
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs font-bold text-slate-500 uppercase ml-1">Senha</label>
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-yellow-500 text-white transition-colors"
            placeholder="••••••••"
            required
          />
        </div>
        <button 
          type="submit" 
          className="w-full bg-[#e6a206] text-black font-bold py-3 rounded-lg hover:bg-white transition-all mt-4 active:scale-95"
        >
          ENTRAR
        </button>
      </form>
    </div>
  );
}