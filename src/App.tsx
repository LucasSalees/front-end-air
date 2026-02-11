import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/dashboard'; 

function App() {
  return (
    <Router>
      <Routes>
        {/* === ROTAS PÚBLICAS (COM LAYOUT) === */}
        {/* envolvi o elemento com <Layout> manualmente aqui */}
        <Route 
          path="/" 
          element={
            <Layout>
              <LandingPage />
            </Layout>
          } 
        />
        
        <Route 
          path="/login" 
          element={
            <Layout>
              <LoginPage />
            </Layout>
          } 
        />

        {/* === ROTAS PROTEGIDAS === */}
        
        {/* Reset Password geralmente usa o layout padrão também */}
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
        
        {/* === DASHBOARD (SEM LAYOUT GLOBAL) === */}
        {/*NÃO coloquei o <Layout> em volta do Dashboard */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />

      </Routes>
    </Router>
  );
}

export default App;