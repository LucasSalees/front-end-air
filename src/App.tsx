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
        {/* Essa rota carrega IMEDIATAMENTE, mesmo se o servidor estiver off */}
        <Route path="/" element={<Layout><LandingPage /></Layout>} />


        {/* === ÁREA QUE DEPENDE DO SERVIDOR === */}
        {/* O ServerGuard envolve tudo daqui pra baixo via Outlet */}
        <Route element={<ServerGuard />}>
            
            {/* Login (Público, mas precisa do servidor pra autenticar) */}
            <Route path="/login" element={<Layout><LoginPage /></Layout>} />

            {/* Reset de Senha */}
            <Route path="/reset-password" element={
                <ProtectedRoute>
                  <Layout><ResetPasswordPage /></Layout>
                </ProtectedRoute>
            } />
            
            {/* Sistema Interno (Dashboard) */}
            <Route element={<ProtectedRoute><SystemLayout /></ProtectedRoute>}>
                <Route path="/dashboard" element={<Dashboard />} />
                {/* Outras rotas do sistema... */}
            </Route>

        </Route>

      </Routes>
    </Router>
  );
}

export default App;