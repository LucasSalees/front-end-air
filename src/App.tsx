import { useState, useEffect } from 'react';
import { Wind, CheckCircle2, Loader2, Server } from 'lucide-react';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando o tempo de resposta do Render para vermos o loading bonito
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); 

    return () => clearTimeout(timer);
  }, []);

  // TELA 1: LOADING (Acordando o Render)
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
        <p className="text-slate-500 mt-2">Conectando ao Render & Supabase</p>
      </div>
    );
  }

  // TELA 2: PRINCIPAL (Sistema Carregado)
  return (
    <div className="min-h-screen bg-slate-50 font-sans antialiased text-slate-900">
      {/* Header Estilizado */}
      <header className="bg-white border-b border-slate-200 py-4 shadow-sm">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Wind className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-800">AirControl</span>
          </div>
          
          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full border border-emerald-100">
            <CheckCircle2 className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Sistema Online</span>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="max-w-5xl mx-auto py-16 px-6 text-center">
        <div className="bg-white border border-slate-200 rounded-3xl p-12 shadow-xl shadow-slate-200/50">
          <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Server className="w-10 h-10 text-blue-600" />
          </div>
          
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
            Pronto para Agendar!
          </h2>
          <p className="text-slate-600 max-w-md mx-auto mb-8 text-lg">
            O backend no Render e o banco Supabase foram carregados com sucesso. 
            Sua infraestrutura Full Stack está operacional.
          </p>

          <div className="flex justify-center gap-4">
             <div className="h-2 w-24 bg-blue-600 rounded-full"></div>
             <div className="h-2 w-8 bg-slate-200 rounded-full"></div>
             <div className="h-2 w-8 bg-slate-200 rounded-full"></div>
          </div>
        </div>

        <p className="mt-8 text-slate-400 text-sm">
          Ambiente de Desenvolvimento: {import.meta.env.MODE}
        </p>
      </main>
    </div>
  );
}

export default App;