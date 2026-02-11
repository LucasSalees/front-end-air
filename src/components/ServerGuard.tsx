import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Wind, Loader2 } from 'lucide-react';
import api from '../services/api';

export default function ServerGuard() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let mounted = true;

        const checkServerStatus = async () => {
            try {
                // Tenta bater no endpoint de saúde
                await api.get('/login/health');
                
                // Se der certo (200 OK), libera o acesso
                if (mounted) setIsLoading(false);
            } catch (error) {
                // Se der erro (servidor dormindo), tenta de novo em 2 segundos
                console.log("Servidor acordando...");
                if (mounted) {
                    setTimeout(checkServerStatus, 2000);
                }
            }
        };

        checkServerStatus();

        return () => { mounted = false; };
    }, []);

    // ENQUANTO O SERVIDOR NÃO RESPONDE, MOSTRA ISSO:
    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center p-6 z-50 fixed inset-0">
                <div className="card-tech-login rounded-3xl p-12 shadow-2xl bg-[#121214] border border-white/5 max-w-sm w-full">
                    <div className="relative flex items-center justify-center">
                        <Loader2 className="w-16 h-16 text-yellow-500 animate-spin" strokeWidth={1.5} />
                        <Wind className="w-6 h-6 text-yellow-500/50 absolute" />
                        <div className="absolute w-20 h-20 bg-yellow-500/10 rounded-full blur-xl" />
                    </div>
                    <div className="text-center">
                        <h2 className="mt-8 text-xl font-bold text-white animate-pulse tracking-tight uppercase">
                            Iniciando <span className="text-yellow-500">Servidor</span>
                        </h2>
                        <p className="text-slate-500 mt-2 text-sm font-light tracking-widest uppercase">
                            Conectando ao Render...
                        </p>
                        <div className="mt-6 w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                            <div className="bg-yellow-500 h-full w-1/3 animate-[loading_1s_ease-in-out_infinite]" style={{ width: '30%' }}></div>
                        </div>
                        <p className="text-[10px] text-slate-600 mt-3 font-mono">Aguarde, isso pode levar até 1 minuto.</p>
                    </div>
                </div>
            </div>
        );
    }

    // SE O SERVIDOR RESPONDEU, MOSTRA O CONTEÚDO REAL (Login, Dashboard, etc)
    return <Outlet />;
}