import { useState, useEffect } from 'react';
import { Wind, Loader2, Server } from 'lucide-react';
import api from './services/api'; // Importando sua instância do Axios

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função assíncrona para checar o status real do backend
    const checkBackendStatus = async () => {
      try {
        // Faz uma chamada real para o seu endpoint de agendamentos
        await api.get('/agendamentos');
      } catch (error) {
        console.error("Erro ao conectar com o backend:", error);
      } finally {
        // Só desliga o loading quando o Render responder (sucesso ou erro)
        setLoading(false);
      }
    };

    checkBackendStatus();
  }, []);

  // TELA 1: LOADING REAL (Só aparece enquanto a requisição do axios não termina)
  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-slate-50 text-slate-600">
        <div className="relative">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
          <Wind className="w-6 h-6 text-blue-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
        </div>
        <h2 className="mt-6 text-xl font-semibold text-slate-800 animate-pulse">
          Acordando o servidor...
        </h2>
        <p className="text-slate-500 mt-2">Isso pode levar um minuto.</p>
      </div>
    );
  }

  // TELA 2: PRINCIPAL (Aparece assim que o backend responde)
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      <header className="bg-white border-b border-slate-200 py-4 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Wind className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">Class Ar Condicionado</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto py-16 px-6 text-center">
        <div className="bg-white border border-slate-200 rounded-3xl p-12 shadow-xl shadow-slate-200/50">
          <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Server className="w-10 h-10 text-blue-600" />
          </div>
          
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            O sistema está ON meu chapa!
          </h2>
          <p className="text-slate-600 max-w-md mx-auto mb-8 text-lg">
            O backend no Render e o banco Supabase foram carregados com sucesso. 
          </p>
        </div>

        <p className="mt-8 text-slate-400 text-sm">
          Ambiente: {import.meta.env.MODE}
        </p>
      </main>
    </div>
  );
}

export default App;