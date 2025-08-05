import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logarUsuario } from '../services/userService';
import { useAuth } from '../context/AuthContext';
import { useLocation } from "react-router-dom";

export function useLogarUser() 
{
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro]   = useState('');
  const navigate          = useNavigate();
  const location          = useLocation();
  const { setUser }       = useAuth();

  useEffect(() => {
    if (erro) {
      const timer = setTimeout(() => {
        setErro('');
        setEmail('');
        setSenha('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [erro]);

  async function handleLogin(e) {
    e.preventDefault();
    setErro('');
    try {
      const { token, nome } = await logarUsuario(email, senha);
      localStorage.setItem('token', token);
      setUser({ nome });
      navigate('/home');
    } catch (error) {
      setErro(error.response?.data?.erro || 'Erro ao logar');
      if (location.pathname !== '/') {
        navigate('/');
      }
    }
  }

  return {
    email,
    setEmail,
    senha,
    setSenha,
    erro,
    handleLogin,
  };
}