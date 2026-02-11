import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout'; // Layout PÚBLICO
import SystemLayout from './components/SystemLayout'; // Layout DO SISTEMA (Verifique se a pasta é 'layouts' ou 'components')
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import Dashboard from './pages/dashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* === ROTAS PÚBLICAS === */}
        <Route path="/" element={<Layout><LandingPage /></Layout>} />
        <Route path="/login" element={<Layout><LoginPage /></Layout>} />

        {/* === ROTA DE RESET (Protegida mas com layout público) === */}
        <Route 
          path="/reset-password" 
          element={
            <ProtectedRoute>
              <Layout>
                <ResetPasswordPage />
              </Layout>
            </ProtectedRoute>
          } 
        />
        
        {/* === ÁREA RESTRITA (SISTEMA) === */}
        {/* 1. O Route Pai não tem path, ele define o Layout e a Proteção */}
        <Route element={<ProtectedRoute><SystemLayout /></ProtectedRoute>}>
            
            {/* 2. O Dashboard é definido aqui dentro. O React Router pega esse elemento 
                   e injeta automaticamente dentro do <Outlet /> do SystemLayout */}
            <Route path="/dashboard" element={<Dashboard />} />
            
            {/* Se criar mais páginas, é só adicionar aqui: */}
            {/* <Route path="/clientes" element={<Clientes />} /> */}

        </Route>

      </Routes>
    </Router>
  );
}

export default App;