import { useEffect, useRef } from 'react';

export function useEditaSenha(id) 
{
  const inputSenha = useRef();
  const inputEmail = useRef();

  useEffect(() => {
    async function fetchUser() {
      try {
        const token    = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/users/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`, // Token no header
          },
        });

        if (!response.ok) throw new Error('Usuário não encontrado');

        const data = await response.json();

        if (inputEmail.current) inputEmail.current.value = data.email || '';
        if (inputSenha.current) inputSenha.current.value = ''; // Nunca pré-carregar senha        

      } catch (error) {
        console.error('Erro ao buscar usuário:', error);
        alert('Erro ao carregar dados do usuário.');
      }
    }

    if (id) fetchUser();
  }, [id]);

  async function salvarAlteracoes() {
    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Token no header
        },
        body: JSON.stringify({
          senha: inputSenha.current.value,
        }),
      });

      if (res.ok) {
        alert('Senha atualizada com sucesso!');
        window.location.href = '/users';
      } else {
        alert('Erro ao atualizar usuário.');
      }
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
      alert('Erro ao salvar alterações.');
    }
  }

  return {
    inputEmail,
    inputSenha,
    salvarAlteracoes,
  };
}
