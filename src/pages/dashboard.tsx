import { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Calendar, Settings, LogOut, Plus, X, Server, Menu, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";
import api from '../services/api';

export default function Dashboard() {
    const navigate = useNavigate();
    const [agendamentos, setAgendamentos] = useState([]);
    const [userName, setUserName] = useState('Usuário');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Estado para controlar a sidebar no mobile

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
            setIsModalOpen(false);
            fetchDashboardData();
            alert("Serviço agendado com sucesso!");
        } catch (err) {
            alert("Erro ao salvar serviço no banco.");
        }
    };

    const handleLogout = async () => {
        try {
            await api.post('/auth/logout');
        } catch (err) {
            console.warn("Sessão já encerrada no servidor.");
        } finally {
            localStorage.removeItem('token');
            navigate('/login', { replace: true });
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-slate-300 flex font-sans">
            
            {/* OVERLAY PARA MOBILE (Escurece o fundo quando o menu abre) */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* SIDEBAR LATERAL (Com classe de transição para deslizar) */}
            <aside className={`
                fixed top-0 left-0 h-full w-72 bg-[#121214] border-r border-white/5 flex flex-col p-6 z-50 transition-transform duration-300 ease-in-out shadow-2xl
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0 md:static md:shadow-none
            `}>
                <div className="flex items-center justify-between mb-10 px-2">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-yellow-500 rounded-xl flex items-center justify-center text-black font-bold shadow-lg shadow-yellow-500/20">C</div>
                        <span className="text-xl font-bold text-white tracking-tighter">CLASS <span className="text-yellow-500">AR</span></span>
                    </div>
                    {/* Botão X para fechar no mobile */}
                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 space-y-2">
                    <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" active />
                    <SidebarItem icon={<Calendar size={20} />} text="Agendamentos" />
                    <SidebarItem icon={<Users size={20} />} text="Clientes" />
                    <SidebarItem icon={<Settings size={20} />} text="Configurações" />
                </nav>

                <div className="mt-auto border-t border-white/5 pt-6">
                    <div className="flex items-center gap-3 mb-6 px-3">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                            <User size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-white truncate max-w-[140px]">{userName}</span>
                            <span className="text-xs text-slate-500">Admin</span>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full p-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all font-medium text-sm">
                        <LogOut size={18} /> Sair do Sistema
                    </button>
                </div>
            </aside>

            {/* ÁREA PRINCIPAL */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
                
                {/* HEADER SUPERIOR (Responsivo) */}
                <header className="h-20 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-30">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsSidebarOpen(true)} 
                            className="p-2 -ml-2 text-slate-400 hover:text-white md:hidden"
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-xl font-bold text-white hidden sm:block">Visão Geral</h1>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            SISTEMA ONLINE
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-2 text-sm shadow-lg shadow-yellow-500/20 active:scale-95"
                        >
                            <Plus size={18} /> <span className="hidden sm:inline">Novo Serviço</span>
                        </button>
                    </div>
                </header>

                {/* CONTEÚDO COM SCROLL */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-20">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {/* Grid de Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                            <StatCard title="Total Serviços" value={agendamentos.length} icon={<Calendar className="text-yellow-500" />} />
                            <StatCard title="Clientes Ativos" value="08" icon={<Users className="text-blue-500" />} />
                            <StatCard title="Faturamento" value="R$ 12.4k" icon={<Server className="text-green-500" />} />
                        </div>

                        {/* Tabela */}
                        <div className="bg-[#121214] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
                            <div className="p-6 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <h3 className="text-lg font-bold text-white">Últimos Agendamentos</h3>
                                <div className="text-xs text-slate-500">Mostrando os mais recentes</div>
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
                                            <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-white">{item.clienteNome}</div>
                                                    <div className="text-xs text-slate-500 sm:hidden">{item.descricao}</div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-slate-300 hidden sm:table-cell">{item.descricao}</td>
                                                <td className="px-6 py-4 text-sm text-slate-400 font-mono">{new Date(item.data).toLocaleDateString('pt-BR')}</td>
                                                <td className="px-6 py-4 text-right">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-500/10 text-yellow-500 border border-yellow-500/20">
                                                        Pendente
                                                    </span>
                                                </td>
                                            </tr>
                                        )) : (
                                            <tr>
                                                <td colSpan={4} className="px-6 py-12 text-center text-slate-600 italic">
                                                    Nenhum serviço agendado encontrada.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-in fade-in duration-200">
                    <div className="bg-[#121214] border border-white/10 p-6 md:p-8 rounded-3xl w-full max-w-md shadow-2xl relative animate-in zoom-in-95 duration-200">
                        <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors">
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-bold text-white mb-1">Novo Agendamento</h2>
                        <p className="text-slate-500 text-sm mb-6">Preencha os dados do serviço.</p>

                        <form onSubmit={handleSaveService} className="space-y-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Nome do Cliente</label>
                                <input
                                    type="text" required
                                    placeholder="Ex: João Silva"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 text-white transition-all placeholder:text-slate-700"
                                    onChange={e => setNovoAgendamento({ ...novoAgendamento, clienteNome: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Descrição</label>
                                <input
                                    type="text" required
                                    placeholder="Ex: Manutenção Split 12k"
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 text-white transition-all placeholder:text-slate-700"
                                    onChange={e => setNovoAgendamento({ ...novoAgendamento, descricao: e.target.value })}
                                />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Data</label>
                                <input
                                    type="date" required
                                    className="w-full bg-black/40 border border-white/10 rounded-xl p-3.5 outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 text-white transition-all calendar-picker-indicator:invert"
                                    onChange={e => setNovoAgendamento({ ...novoAgendamento, data: e.target.value })}
                                />
                            </div>

                            <button type="submit" className="w-full bg-yellow-500 text-black font-bold py-4 rounded-xl hover:bg-yellow-400 transition-all mt-2 shadow-lg shadow-yellow-500/20 active:scale-95">
                                CONFIRMAR AGENDAMENTO
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

// Componente auxiliar para item do menu
function SidebarItem({ icon, text, active = false }: any) {
    return (
        <button className={`
            flex items-center gap-3 w-full p-3 rounded-xl transition-all text-sm font-medium
            ${active 
                ? 'bg-yellow-500 text-black font-bold shadow-lg shadow-yellow-500/20' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'}
        `}>
            {icon}
            {text}
        </button>
    );
}

// Componente auxiliar para Card
function StatCard({ title, value, icon }: any) {
    return (
        <div className="bg-[#121214] border border-white/5 p-6 rounded-3xl hover:border-yellow-500/30 transition-all group shadow-lg">
            <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-white/5 rounded-2xl group-hover:scale-110 transition-transform group-hover:bg-yellow-500/10 border border-white/5 group-hover:border-yellow-500/20">
                    {icon}
                </div>
                {/* Badge opcional */}
                <span className="text-[10px] font-bold bg-green-500/10 text-green-500 px-2 py-1 rounded-full border border-green-500/20">+12%</span>
            </div>
            <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{title}</h4>
            <p className="text-2xl sm:text-3xl font-bold text-white">{value}</p>
        </div>
    );
}