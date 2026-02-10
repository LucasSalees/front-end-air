import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, ShieldCheck, Loader2 } from 'lucide-react';
import api from '../services/api';

export default function ResetPasswordPage() {
  const [novaSenha, setNovaSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (novaSenha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    setLoading(true);
    try {
      await api.put('/login/alterar-senha', { novaSenha });
      alert("Senha atualizada com sucesso! Bem-vindo.");
      navigate('/dashboard');
    } catch (err) {
      alert("Erro ao alterar senha. O tempo da sessão pode ter expirado.");
      navigate('/login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="card-tech-login rounded-3xl p-10 shadow-2xl w-full max-w-md border border-white/10 backdrop-blur-xl">
        <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-yellow-500/20">
          <KeyRound className="w-8 h-8 text-yellow-500" />
        </div>

        <h2 className="text-2xl font-bold text-white text-center mb-2">Segurança de Acesso</h2>
        <p className="text-slate-400 text-sm text-center mb-8">
          Detectamos seu primeiro acesso. <br />
          <span className="text-yellow-500/80">Por favor, escolha uma senha segura.</span>
        </p>

        <form onSubmit={handleReset} className="space-y-5 text-left">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Nova Senha</label>
            <input 
              type="password" 
              value={novaSenha}
              onChange={(e) => setNovaSenha(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-yellow-500 text-white transition-all" 
              placeholder="••••••••"
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-slate-500 uppercase ml-1">Confirmar Senha</label>
            <input 
              type="password" 
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 outline-none focus:border-yellow-500 text-white transition-all" 
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-yellow-500 text-black font-extrabold py-4 rounded-xl hover:bg-white transition-all mt-4 flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <ShieldCheck className="w-5 h-5" />}
            ATUALIZAR E ACESSAR
          </button>
        </form>
      </div>
    </div>
  );
}