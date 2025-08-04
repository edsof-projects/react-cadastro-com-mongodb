import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logarUsuario } from '../services/userService';
import { useAuth } from '../context/AuthContext';

export function useLogarUser() {
  const [email, setEmail]   = useState('');
  const [senha, setSenha]   = useState('');
  const [erro, setErro]     = useState('');
  const navigate            = useNavigate();
  const { setUser }         = useAuth(); 

  async function handleLogin(e) {
    e.preventDefault();
    setErro('');
    try {
      const { token, nome } = await logarUsuario( email, senha );
      localStorage.setItem('token', token);
      setUser({ nome });
      navigate('/home');
    } catch (error) {
      setErro(error.response?.data?.erro || 'Erro ao logar');
    }
  }

  return {
    email,
    setEmail,
    senha,
    setSenha,
    erro,
    handleLogin
  };
}
