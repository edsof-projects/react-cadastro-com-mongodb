// src/hooks/useLogarUser.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logarUsuario } from '../services/userService';

export function useLogarUser() 
{
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro]   = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); // Impede o refresh da página
    try {
      const data = await logarUsuario(email, senha);
      console.log('Resposta do backend:', data); // debug

      if (data.token) {
        localStorage.setItem('token', data.token);
        navigate('/home');
      } else {
        setErro('Credenciais inválidas');
         // Limpa depois de 3 segundos
        setTimeout(() => {
          setEmail('');
          setSenha('');
          setErro('');
        }, 3000);
      }
    } catch (error) {
      //console.error('Erro ao logar:', error);
      setErro('Erro ao logar. Verifique suas credenciais.');
       // Limpa depois de 3 segundos
      setTimeout(() => {
        setEmail('');
        setSenha('');
        setErro('');
      }, 3000);
    }
  };

  return { email, setEmail, senha, setSenha, erro, handleLogin };
}
