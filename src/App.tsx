import { useEffect, useState } from 'react';
import api from './services/api';

function App() {
  const [agendamentos, setAgendamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Função para buscar dados do seu backend no Render
    api.get('/agendamentos')
      .then(response => {
        setAgendamentos(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao conectar com o backend:", error);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Acordando o servidor no Render... ❄️</div>;

  return (
    <div>
      <h1>Sistema Project Air Conditioning</h1>
      <p>Agendamentos encontrados: {agendamentos.length}</p>
      {/* Aqui listaremos os agendamentos do seu Supabase */}
    </div>
  );
}

export default App;