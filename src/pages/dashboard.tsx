import { useState, useEffect } from 'react';
import { Calendar, Users, Server, Plus, X } from 'lucide-react';
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
        <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
            {/* CABEÇALHO DA PÁGINA ESPECÍFICA */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Visão Geral</h1>
                    <p className="text-slate-500 text-sm">Métricas e agendamentos recentes.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded-xl flex items-center gap-2 text-sm shadow-lg shadow-yellow-500/20">
                    <Plus size={18} /> Novo Serviço
                </button>
            </div>

            {/* CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <StatCard title="Total Serviços" value={agendamentos.length} icon={<Calendar className="text-yellow-500" />} />
                <StatCard title="Clientes Ativos" value="08" icon={<Users className="text-blue-500" />} />
                <StatCard title="Faturamento" value="R$ 12.4k" icon={<Server className="text-green-500" />} />
            </div>

            {/* TABELA */}
            <div className="bg-[#121214] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
                <div className="p-6 border-b border-white/5">
                    <h3 className="text-lg font-bold text-white">Últimos Agendamentos</h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-white/[0.02]">
                            <tr className="text-slate-500 text-xs uppercase tracking-wider">
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
                                    <td className="px-6 py-4 text-right"><span className="text-xs bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full border border-yellow-500/20">Pendente</span></td>
                                </tr>
                            )) : (
                                <tr><td colSpan={4} className="px-6 py-12 text-center text-slate-600">Nada encontrado.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL (Pode ficar aqui ou ser um componente separado) */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
                    <div className="bg-[#121214] border border-white/10 p-6 rounded-3xl w-full max-w-md relative">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white"><X size={24} /></button>
                        <h2 className="text-2xl font-bold text-white mb-6">Novo Agendamento</h2>
                        <form onSubmit={handleSaveService} className="space-y-4">
                            <input type="text" placeholder="Nome do Cliente" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-yellow-500" onChange={e => setNovoAgendamento({ ...novoAgendamento, clienteNome: e.target.value })} />
                            <input type="text" placeholder="Descrição" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-yellow-500" onChange={e => setNovoAgendamento({ ...novoAgendamento, descricao: e.target.value })} />
                            <input type="date" required className="w-full bg-black/40 border border-white/10 rounded-xl p-3 text-white outline-none focus:border-yellow-500" onChange={e => setNovoAgendamento({ ...novoAgendamento, data: e.target.value })} />
                            <button type="submit" className="w-full bg-yellow-500 text-black font-bold py-3 rounded-xl hover:bg-yellow-400 mt-2">CONFIRMAR</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatCard({ title, value, icon }: any) {
    return (
        <div className="bg-[#121214] border border-white/5 p-6 rounded-3xl">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-2xl border border-white/5">{icon}</div>
            </div>
            <h4 className="text-slate-500 text-xs font-bold uppercase">{title}</h4>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    );
}