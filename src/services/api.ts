import axios from 'axios'

//O vite lê automaticamente a virável VITE_API_URL que foi configurado no netlify
const api = axios.create ({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8081/api'
});

export default api;