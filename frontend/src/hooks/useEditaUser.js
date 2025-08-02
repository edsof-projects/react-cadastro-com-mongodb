import { useEffect, useRef } from 'react';
import { buscarUsuarioPorId, atualizarUsuario } from '../services/userService';

export function useEditaUser(id) {
  const inputName  = useRef();
  const inputAge   = useRef();
  const inputEmail = useRef();
  const inputSenha = useRef();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await buscarUsuarioPorId(id);
        if (inputName.current) inputName.current.value = data.name || '';
        if (inputAge.current) inputAge.current.value = data.age || '';
        if (inputEmail.current) inputEmail.current.value = data.email || '';
        if (inputSenha.current) inputSenha.current.value = '';
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        alert('Erro ao buscar usuário');
      }
    }

    if (id) fetchData();
  }, [id]);

  async function salvarAlteracoes() {
    try {
      const dadosAtualizados = {
        name: inputName.current.value,
        age: Number(inputAge.current.value),
        email: inputEmail.current.value,
        senha: inputSenha.current.value,
      };

      await atualizarUsuario(id, dadosAtualizados);
      alert('Usuário atualizado com sucesso!');
      window.location.href = '/users';
    } catch (error) {
      console.error('Erro ao atualizar:', error);
      alert('Erro ao salvar alterações');
    }
  }

  return { inputName, inputAge, inputEmail, inputSenha, salvarAlteracoes };
}
