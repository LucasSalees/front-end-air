import { useState, useEffect } from 'react';
import { Calendar, Users, Server, Plus, X, Search } from 'lucide-react';
import api from '../services/api';

export default function Dashboard() {
    const [agendamentos, setAgendamentos] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [novoAgendamento, setNovoAgendamento] = useState({ clienteNome: '', descricao: '', data: '' });

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const response = await api.get('/agendamentos');
            setAgendamentos(response.data);
        } catch (err) { console.error(err); }
    };

    const handleSaveService = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/agendamentos', novoAgendamento);
            setIsModalOpen(false);
            fetchDashboardData();
            alert("Sucesso!");
        } catch (err) { alert("Erro."); }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500 pb-10">
            {/* CABEÇALHO */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Visão Geral</h1>
                    <p className="text-slate-500 text-sm mt-1">Acompanhe suas métricas e serviços.</p>
                </div>
                <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl flex items-center gap-2 text-sm shadow-lg shadow-yellow-500/20 active:scale-95 transition-all"
                >
                    <Plus size={20} /> Novo Serviço
                </button>
            </div>

            {/* CARDS (Mesmo estilo visual do Login) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <StatCard title="Total Serviços" value={agendamentos.length} icon={<Calendar className="text-yellow-500" />} />
                <StatCard title="Clientes Ativos" value="08" icon={<Users className="text-blue-500" />} />
                <StatCard title="Faturamento" value="R$ 12.4k" icon={<Server className="text-green-500" />} />
            </div>

            {/* TABELA (Container igual ao do Login) */}
            <div className="bg-[#121214] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-white">Últimos Agendamentos</h3>
                    <div className="text-xs text-slate-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                        {agendamentos.length} registros
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-[#0a0a0c]">
                            <tr className="text-slate-400 text-xs uppercase tracking-wider">
                                <th className="px-6 py-4 font-semibold">Cliente</th>
                                <th className="px-6 py-4 font-semibold">Serviço</th>
                                <th className="px-6 py-4 font-semibold">Data</th>
                                <th className="px-6 py-4 font-semibold text-right">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {agendamentos.length > 0 ? agendamentos.map((item: any) => (
                                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                                    <td className="px-6 py-4 text-white font-medium">{item.clienteNome}</td>
                                    <td className="px-6 py-4 text-sm text-slate-300">{item.descricao}</td>
                                    <td className="px-6 py-4 text-sm text-slate-400 font-mono">{new Date(item.data).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                                            Pendente
                                        </span>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-600">Nenhum registro encontrado.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL (Padronizado igual ao Login) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200">
                    <div className="bg-[#121214] border border-white/10 p-8 rounded-3xl w-full max-w-md relative shadow-2xl animate-in zoom-in-95 duration-200">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
                            <X size={24} />
                        </button>
                        
                        <h2 className="text-2xl font-bold text-white mb-2">Novo Agendamento</h2>
                        <p className="text-slate-500 text-sm mb-6">Preencha os detalhes do serviço abaixo.</p>
                        
                        <form onSubmit={handleSaveService} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Cliente</label>
                                {/* INPUT PADRÃO */}
                                <input 
                                    type="text" 
                                    placeholder="Ex: João Silva" 
                                    required 
                                    className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-600 outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition-all" 
                                    onChange={e => setNovoAgendamento({ ...novoAgendamento, clienteNome: e.target.value })} 
                                />
                            </div>
                            
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Descrição</label>
                                {/* INPUT PADRÃO */}
                                <input 
                                    type="text" 
                                    placeholder="Ex: Instalação Split" 
                                    required 
                                    className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl p-4 text-white placeholder:text-slate-600 outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition-all" 
                                    onChange={e => setNovoAgendamento({ ...novoAgendamento, descricao: e.target.value })} 
                                />
                            </div>
                            
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Data</label>
                                {/* INPUT PADRÃO */}
                                <input 
                                    type="date" 
                                    required 
                                    className="w-full bg-[#0a0a0c] border border-white/10 rounded-xl p-4 text-white outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 transition-all calendar-picker-indicator:invert" 
                                    onChange={e => setNovoAgendamento({ ...novoAgendamento, data: e.target.value })} 
                                />
                            </div>

                            {/* BOTÃO PADRÃO */}
                            <button 
                                type="submit" 
                                className="w-full bg-yellow-500 text-black font-bold py-4 rounded-xl hover:bg-yellow-400 transition-all mt-4 shadow-lg shadow-yellow-500/20 active:scale-95"
                            >
                                CONFIRMAR AGENDAMENTO
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// Componente Card Auxiliar (Padronizado)
function StatCard({ title, value, icon }: any) {
    return (
        <div className="bg-[#121214] border border-white/5 p-6 rounded-3xl hover:border-yellow-500/30 transition-all group shadow-lg">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform group-hover:bg-yellow-500/10 border border-white/5 group-hover:border-yellow-500/20">
                    {icon}
                </div>
            </div>
            <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</h4>
            <p className="text-3xl font-bold text-white mt-1">{value}</p>
        </div>
    );
}