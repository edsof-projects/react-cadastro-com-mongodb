import { useRef, useEffect, useState } from 'react';
import { buscarUsuarioPorId, buscarIdPorEmail, alterarSenhaPorEmail } from '../services/userService';

export function useEditaSenha() 
{
  const inputEmail = useRef();
  const inputSenha = useRef();
  const [email, setEmail] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {        
        const idUser = await buscarIdPorEmail(inputEmail.current.value);
        const data   = await buscarUsuarioPorId(idUser);
        
        if (inputEmail.current) inputEmail.current.value = data.email || '';
        if (inputSenha.current) inputSenha.current.value = '';

        setEmail(data.email); // salvando email para uso posterior
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        alert('Erro ao buscar usuário');
      }
    }

    fetchData();
  }, []); 

  async function salvarAlteracoes() {
    try {
      const novaSenha = inputSenha.current.value;

      await alterarSenhaPorEmail(email, novaSenha);
      alert('Senha atualizada com sucesso!');
      window.location.href = '/';
    } catch (error) {
      console.error('Erro ao atualizar senha:', error);
      alert('Erro ao salvar alterações');
    }
  }

  return { inputEmail, inputSenha, salvarAlteracoes };
}
