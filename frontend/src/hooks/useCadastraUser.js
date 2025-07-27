import { useRef } from 'react';
import api from '../services/api';

export function useCadastraUser() 
{
  const inputName  = useRef();
  const inputAge   = useRef();
  const inputEmail = useRef();
  const inputSenha = useRef();

  const limparCampos = () => {
    inputName.current.value  = '';
    inputAge.current.value   = '';
    inputEmail.current.value = '';
    inputSenha.current.value = '';
  };

  const createUser = async () => {
    try {
      const res = await api.post('/users', {
        name : inputName.current.value,
        age  : parseInt(inputAge.current.value),
        email: inputEmail.current.value,
        senha: inputSenha.current.value,
      });

      if (res.status === 201) {
        alert('Usuário cadastrado com sucesso!');
        limparCampos();
      }
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      alert('Erro ao criar usuário.');
    }
  };

  return {
    inputName,
    inputAge,
    inputEmail,
    inputSenha,
    createUser,
  };
}
