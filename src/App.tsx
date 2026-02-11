import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import SystemLayout from './components/SystemLayout';
import ServerGuard from './components/ServerGuard'; // Importe o Guardião
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Dashboard from './pages/dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        
        {/* === ROTA TOTALMENTE LIVRE (LANDING PAGE) === */}
        {/* NÃO depende do servidor. Carrega instantaneamente. */}
        <Route path="/" element={<Layout><LandingPage /></Layout>} />


        {/* === ÁREA QUE PRECISA DO SERVIDOR ACORDADO === */}
        {/* Tudo aqui dentro só aparece DEPOIS que a tela de "Iniciando Servidor" sumir */}
        <Route element={<ServerGuard />}>
            
            {/* LOGIN (Público, mas precisa do back pra autenticar) */}
            <Route path="/login" element={<Layout><LoginPage /></Layout>} />

            {/* RESET DE SENHA */}
            <Route path="/reset-password" element={
                <ProtectedRoute>
                  <Layout><ResetPasswordPage /></Layout>
                </ProtectedRoute>
            } />
            
            {/* SISTEMA INTERNO (DASHBOARD) */}
            {/* Além de precisar do servidor (ServerGuard), precisa de Token (ProtectedRoute) */}
            <Route element={<ProtectedRoute><SystemLayout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                {/* <Route path="/clientes" element={<ClientesPage />} /> */}
            </Route>

        </Route>

      </Routes>
    </Router>
  );
}

export default App;