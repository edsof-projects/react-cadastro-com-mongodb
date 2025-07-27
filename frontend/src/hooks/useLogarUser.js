import { useRef } from 'react';
import api from '../services/api';

export function useLogarUser() {
  const inputEmail = useRef();
  const inputSenha = useRef();

  const limparCampos = () => {
    inputEmail.current.value = '';
    inputSenha.current.value = '';
  };

  const logarUser = async () => {
    try {
      const res = await api.post('/login', {
        email: inputEmail.current.value,
        senha: inputSenha.current.value,
      });

      if (res.status === 200) {
        alert('Acesso liberado com sucesso!');
        limparCampos();
        // Pode salvar token ou redirecionar aqui
      }else{
        alert('Desculpe você não tem acesso ao sistema!');
        limparCampos();
      }
    } catch (error) {
      alert('Usuário ou senha incorretos!');
      //console.error('Erro ao liberar acesso ao usuário:', error);
    }
  };

  return {
    inputEmail,
    inputSenha,
    logarUser,
  };
}
