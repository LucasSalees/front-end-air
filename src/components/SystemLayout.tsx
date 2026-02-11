import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Link } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, Settings, LogOut, Menu, X, User } from 'lucide-react';
import { jwtDecode } from "jwt-decode";
import api from '../services/api';

export default function SystemLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [userName, setUserName] = useState('Usuário');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
            console.error("Erro token");
        }
    }, [navigate]);

    const handleLogout = async () => {
        try { await api.post('/auth/logout'); } catch (err) {} 
        finally {
            localStorage.removeItem('token');
            navigate('/login', { replace: true });
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0a0c] text-slate-300 flex font-sans">
            {/* OVERLAY MOBILE */}
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black/60 z-40 md:hidden backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)} />
            )}

            {/* SIDEBAR */}
            <aside className={`
                fixed top-0 left-0 h-full w-72 bg-[#121214] border-r border-white/5 flex flex-col p-6 z-50 transition-transform duration-300 ease-in-out shadow-2xl
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
                md:translate-x-0 md:static md:shadow-none
            `}>
                <div className="flex items-center justify-between mb-10 px-2">

                    <div className="flex items-center gap-3">
                        <img 
                        src="/img/class.jpeg" 
                        alt="Logo Class Ar" 
                        className="w-10 h-10 rounded-lg object-cover border border-white/10"
                        />
                        <span className="text-xl font-bold text-white tracking-tighter">CLASS <span className="text-yellow-500">AR</span></span>
                    </div>

                    <button onClick={() => setIsSidebarOpen(false)} className="md:hidden text-slate-400 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-1 space-y-2">
                    <SidebarItem to="/dashboard" icon={<LayoutDashboard size={20} />} text="Dashboard" active={location.pathname === '/dashboard'} />
                    <SidebarItem to="/agendamentos" icon={<Calendar size={20} />} text="Agendamentos" active={location.pathname === '/agendamentos'} />
                    <SidebarItem to="/clientes" icon={<Users size={20} />} text="Clientes" active={location.pathname === '/clientes'} />
                    <SidebarItem to="/configuracoes" icon={<Settings size={20} />} text="Configurações" active={location.pathname === '/configuracoes'} />
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
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full p-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-medium text-sm">
                        <LogOut size={18} /> Sair
                    </button>
                </div>
            </aside>

            {/* CONTEÚDO PRINCIPAL */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
                {/* HEADER GLOBAL (Aparece em todas as telas) */}
                <header className="h-16 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-30">
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-slate-400 hover:text-white md:hidden">
                        <Menu size={24} />
                    </button>
                    {/* Status do Sistema Global */}
                    <div className="ml-auto hidden sm:flex items-center gap-2 text-xs font-medium text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        ONLINE
                    </div>
                </header>

                {/* AQUI É ONDE O CONTEÚDO DAS PÁGINAS (DASHBOARD, CLIENTES) SERÁ INJETADO */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-20">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

function SidebarItem({ icon, text, to, active }: any) {
    return (
        <Link to={to} className={`
            flex items-center gap-3 w-full p-3 rounded-xl transition-all text-sm font-medium
            ${active 
                ? 'bg-yellow-500 text-black font-bold shadow-lg shadow-yellow-500/20' 
                : 'text-slate-400 hover:bg-white/5 hover:text-white'}
        `}>
            {icon}
            {text}
        </Link>
    );
}