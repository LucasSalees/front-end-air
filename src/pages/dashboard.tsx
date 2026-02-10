import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Calendar, Settings, LogOut, Plus, X, Server } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import api from '../services/api';

export default function Dashboard() {
    const navigate = useNavigate();
    const [agendamentos, setAgendamentos] = useState([]);
    const [userName, setUserName] = useState('Usuário');

    // Estados para o Modal de Novo Serviço
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [novoAgendamento, setNovoAgendamento] = useState({
        clienteNome: '',
        descricao: '',
        data: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        try {
            const decoded: any = jwtDecode(token);
            setUserName(decoded.sub || 'Usuário');
        } catch (e) {
            console.error("Erro ao decodificar token");
        }

        fetchDashboardData();
    }, [navigate]);

    const fetchDashboardData = async () => {
        try {
            const response = await api.get('/agendamentos');
            setAgendamentos(response.data);
        } catch (err) {
            console.error("Erro ao buscar agendamentos", err);
        }
    };

    const handleSaveService = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await api.post('/agendamentos', novoAgendamento);
            setIsModalOpen(false); // Fecha o modal
            fetchDashboardData(); // Recarrega a tabela
            alert("Serviço agendado com sucesso!");
        } catch (err) {
            alert("Erro ao salvar serviço no banco.");
        }
    };

    const handleLogout = async () => {
        try {
            // MUDOU AQUI: Tem que ser a URL do .logoutUrl() do SecurityConfig
            await api.post('/auth/logout');
        } catch (err) {
            console.warn("Sessão já encerrada no servidor.");
        } finally {
            localStorage.removeItem('token');
            navigate('/login', { replace: true });
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-slate-300 flex">
            {/* Sidebar Lateral */}
            <aside className="w-64 bg-black/40 border-r border-white/5 flex flex-col p-6 backdrop-blur-xl">
                <div className="flex items-center gap-3 mb-10 px-2">
                    <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center text-black font-bold">C</div>
                    <span className="text-xl font-bold text-white tracking-tighter">CLASS <span className="text-yellow-500">AR</span></span>
                </div>

                <nav className="flex-1 space-y-2">
                    <button className="flex items-center gap-3 w-full p-3 rounded-xl bg-yellow-500/10 text-yellow-500 font-medium">
                        <LayoutDashboard size={20} /> Dashboard
                    </button>
                    <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/5 transition-all">
                        <Calendar size={20} /> Agendamentos
                    </button>
                    <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/5 transition-all">
                        <Users size={20} /> Clientes
                    </button>
                    <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/5 transition-all">
                        <Settings size={20} /> Configurações
                    </button>
                </nav>

                <button onClick={handleLogout} className="flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all mt-auto">
                    <LogOut size={20} /> Sair do Sistema
                </button>
            </aside>

            {/* Área Principal */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-bold text-white">Olá, {userName}</h1>
                        <p className="text-slate-500 text-sm">Painel administrativo Class Ar.</p>
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-yellow-500 hover:bg-white text-black font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-2 text-sm"
                        >
                            <Plus size={18} /> Novo Serviço
                        </button>
                    </div>
                </header>

                {/* Grid de Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatCard title="Serviços" value={agendamentos.length} icon={<Calendar className="text-yellow-500" />} />
                    <StatCard title="Clientes" value="--" icon={<Users className="text-yellow-500" />} />
                    <StatCard title="Status" value="Online" icon={<Server className="text-green-500" />} />
                </div>

                {/* Tabela */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md">
                    <h3 className="text-lg font-bold text-white mb-6">Agendamentos Recentes</h3>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-slate-500 text-xs uppercase tracking-wider border-b border-white/5">
                                    <th className="pb-4">Cliente</th>
                                    <th className="pb-4">Descrição</th>
                                    <th className="pb-4">Data</th>
                                    <th className="pb-4">Ação</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {agendamentos.length > 0 ? agendamentos.map((item: any) => (
                                    <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="py-4 text-white font-medium">{item.clienteNome}</td>
                                        <td className="py-4">{item.descricao}</td>
                                        <td className="py-4">{item.data}</td>
                                        <td className="py-4">
                                            <span className="text-yellow-500 text-xs cursor-pointer hover:underline">Ver Detalhes</span>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan={4} className="py-10 text-center text-slate-600">Sem agendamentos no momento.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Modal de Novo Serviço */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-[#121214] border border-white/10 p-8 rounded-3xl w-full max-w-md shadow-2xl relative">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white">
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold text-white mb-6">Novo Agendamento</h2>

                        <form onSubmit={handleSaveService} className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Cliente</label>
                                <input
                                    type="text" required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 mt-1 outline-none focus:border-yellow-500 text-white"
                                    onChange={e => setNovoAgendamento({ ...novoAgendamento, clienteNome: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Serviço / Aparelho</label>
                                <input
                                    type="text" required
                                    placeholder="Ex: Manutenção Split 12k"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 mt-1 outline-none focus:border-yellow-500 text-white"
                                    onChange={e => setNovoAgendamento({ ...novoAgendamento, descricao: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase">Data</label>
                                <input
                                    type="date" required
                                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 mt-1 outline-none focus:border-yellow-500 text-white"
                                    onChange={e => setNovoAgendamento({ ...novoAgendamento, data: e.target.value })}
                                />
                            </div>

                            <button type="submit" className="w-full bg-yellow-500 text-black font-bold py-4 rounded-xl hover:bg-white transition-all mt-4">
                                SALVAR AGENDAMENTO
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

function StatCard({ title, value, icon }: any) {
    return (
        <div className="bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-md hover:border-white/20 transition-all group">
            <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-black/20 rounded-lg group-hover:scale-110 transition-transform">{icon}</div>
            </div>
            <h4 className="text-slate-500 text-sm font-bold uppercase tracking-wider">{title}</h4>
            <p className="text-3xl font-bold text-white mt-1">{value}</p>
        </div>
    );
}