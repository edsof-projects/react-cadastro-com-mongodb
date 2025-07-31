import axios from 'axios';

export const apiSemToken = axios.create({
  baseURL: 'http://localhost:3000', // ajuste conforme sua API
});

export const apiComToken = axios.create({
  baseURL: 'http://localhost:3000',
});

apiComToken.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
