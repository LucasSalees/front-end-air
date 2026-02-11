import axios from 'axios'

{/* const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8081'
}); */}

const api = axios.create({
    baseURL: 'https://project-air-conditioning.onrender.com' // Removi o /api daqui
});

// Adiciona o token em todas as chamadas automaticamente
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        // O Spring Security espera o formato "Bearer [token]"
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;