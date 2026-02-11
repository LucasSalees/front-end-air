import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react'; 

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-sans antialiased text-slate-100 flex flex-col">
      {/* HEADER ÚNICO */}
      <header className="fixed top-0 left-0 w-full bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10 py-4 shadow-xl z-50">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          
          {/* LOGO */}
          <div className="flex items-center gap-3">
              <img 
              src="/img/class.jpeg" 
              alt="Logo Class Ar" 
              className="w-10 h-10 rounded-lg object-cover border border-white/10"
              />
              <span className="text-xl font-bold text-white tracking-tighter">CLASS <span className="text-yellow-500">AR</span></span>
          </div>

          {/* BOTÃO HAMBÚRGUER */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 text-white hover:text-yellow-500 transition-colors z-[60] outline-none"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* MENU DROPDOWN */}
          {isMenuOpen && (
            <div className="absolute top-full left-0 w-full bg-[#0a0a0a] border-b border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-300">
              <nav className="flex flex-col p-6 gap-4">
                <Link 
                  to="/" 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium hover:text-yellow-500 transition-colors py-2 border-b border-white/5">
                  Home
                </Link>
                <Link 
                  to="/login" 
                  onClick={() => setIsMenuOpen(false)}
                  className="ttext-lg font-medium hover:text-yellow-500 transition-colors py-2 border-b border-white/5">
                  Área Restrita
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* CONTEÚDO DINÂMICO */}
      <main className="max-w-5xl mx-auto pt-32 pb-16 px-6 text-center flex-grow w-full">
        {children}
      </main>

      {/* FOOTER ÚNICO */}
      <footer className="w-full border-t border-white/10 bg-[#0a0a0a] py-8">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <img 
                  src="/img/class.jpeg" 
                  alt="Logo Class Ar" 
                  className="w-8 h-8 rounded-lg object-cover border border-white/10 opacity-80" 
              />
              <span className="text-sm font-bold tracking-tight text-slate-400">
                  Class Ar Condicionado
              </span>
            </div>

            <div className="text-center md:text-right">
              <p className="text-[10px] text-slate-500 uppercase tracking-[0.2em]">
                  © 2026 LucasSales's Org
              </p>
              <p className="text-[9px] text-slate-600 mt-1 uppercase tracking-widest">
                  Soluções Inteligentes para Ambientes de Alto Padrão
              </p>
            </div>
        </div>
      </footer>
    </div>
  );
}