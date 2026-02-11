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
        <div className="min-h-screen bg-[#0a0a0c] text-slate-300 flex font-sans overflow-hidden">
            
            {/* OVERLAY (FUNDO ESCURO) - AGORA APARECE EM QUALQUER TELA */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)} 
                />
            )}

            {/* SIDEBAR - AGORA É SEMPRE 'FIXED' E 'OFF-CANVAS' */}
            <aside className={`
                fixed top-0 left-0 h-full w-72 bg-[#121214] border-r border-white/5 flex flex-col z-50 transition-transform duration-300 ease-in-out shadow-2xl
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
            `}>
                
                {/* 1. HEADER DA SIDEBAR */}
                <div className="flex items-center justify-between p-6 mb-2 flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <img 
                            src="/img/class.jpeg" 
                            alt="Logo Class Ar" 
                            className="w-10 h-10 rounded-lg object-cover border border-white/10"
                        />
                        <span className="text-xl font-bold text-white tracking-tighter">CLASS <span className="text-yellow-500">AR</span></span>
                    </div>

                    {/* BOTÃO FECHAR (X) - AGORA VISÍVEL SEMPRE */}
                    <button onClick={() => setIsSidebarOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* 2. MEIO (Navegação) - COM SCROLL */}
                <nav className="flex-1 space-y-2 px-6 overflow-y-auto custom-scrollbar">
                    <SidebarItem to="/dashboard" icon={<LayoutDashboard size={20} />} text="Dashboard" active={location.pathname === '/dashboard'} onClick={() => setIsSidebarOpen(false)} />
                    <SidebarItem to="/agendamentos" icon={<Calendar size={20} />} text="Agendamentos" active={location.pathname === '/agendamentos'} onClick={() => setIsSidebarOpen(false)} />
                    <SidebarItem to="/clientes" icon={<Users size={20} />} text="Clientes" active={location.pathname === '/clientes'} onClick={() => setIsSidebarOpen(false)} />
                    <SidebarItem to="/configuracoes" icon={<Settings size={20} />} text="Configurações" active={location.pathname === '/configuracoes'} onClick={() => setIsSidebarOpen(false)} />
                </nav>

                {/* 3. FOOTER (Usuário e Logout) - FIXO */}
                <div className="p-6 border-t border-white/5 bg-[#121214] flex-shrink-0 z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-white/10">
                            <User size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-white truncate max-w-[140px]">{userName}</span>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="flex items-center gap-3 w-full p-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl transition-all font-medium text-sm group">
                        <LogOut size={18} /> 
                        Sair do Sistema
                    </button>
                </div>
            </aside>

            {/* CONTEÚDO PRINCIPAL */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden relative w-full">
                
                {/* HEADER SUPERIOR */}
                <header className="h-16 border-b border-white/5 bg-[#0a0a0c]/80 backdrop-blur-xl flex items-center justify-between px-6 sticky top-0 z-30 flex-shrink-0">
                    
                    {/* BOTÃO MENU (HAMBÚRGUER) - VISÍVEL SEMPRE AGORA */}
                    <button 
                        onClick={() => setIsSidebarOpen(true)} 
                        className="p-2 -ml-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="ml-auto hidden sm:flex items-center gap-2 text-xs font-medium text-green-400 bg-green-500/10 px-3 py-1.5 rounded-full border border-green-500/20">
                        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                        ONLINE
                    </div>
                </header>

                {/* CONTEÚDO DAS PÁGINAS */}
                <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-20 scroll-smooth">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}

// Pequena melhoria: Adicionei onClick para fechar o menu ao clicar em um item
function SidebarItem({ icon, text, to, active, onClick }: any) {
    return (
        <Link 
            to={to} 
            onClick={onClick}
            className={`
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