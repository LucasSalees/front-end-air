import { useState, useEffect } from 'react';
import { Wind, Loader2 } from 'lucide-react'; //icones
import api from './services/api';

function App() {

  const [agendamentos, setAgendamentos] = useState ([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const response = await api.get('/agendamentos');
        setAgendamentos(response.data);
      } catch (err) {
        console.error("Erro ao buscar:", err);
      } finally {
        setLoading(false); //desliga o loading independente de sucesso ou não
      }
    };
    fetchDados();
  }, []);

  // tela de loading (UX)
  if (loading) {
    return (
      <div className='h-screen w-full flex flex-col itens-center justify-center bg-slate-50'>
        <Loader2 className='w-12 h-12 text-blue-500 animate-spin' />
          <h2 className='mt-4 text-xl font-semibold text-slate-700'> Acordando o servidor... </h2>
            <p className='text-slate-500'> Isso pode levar até um minuto </p>
      </div>
    )
  }

  //tela principal (UI)
  return (
    <div className="min-h-screen bg-slate-100 p-4 md:p-8">
      <header className="max-w-4xl mx-auto mb-8 flex items-center gap-3">
        <Wind className="w-8 h-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-slate-800">Air System Control</h1>
      </header>

      <main className="max-w-4xl mx-auto">
        {/* Aqui entrará o formulário e a lista */}
        <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
           <p className="text-slate-600">Servidor Online! Agendamentos: {agendamentos.length}</p>
        </div>
      </main>
    </div>
  );

}

export default App;