import axios from 'axios';

const apiComToken = axios.create({
  baseURL: 'http://localhost:3000', // Ajuste se necessário
});

// Interceptador que adiciona o token no cabeçalho
apiComToken.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default apiComToken;
