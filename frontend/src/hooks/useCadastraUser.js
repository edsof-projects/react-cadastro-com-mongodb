import { cadastrarUsuario } from '../services/userService';
import { useNavigate } from 'react-router-dom';

export function useCadastraUser() 
{
  const navigate = useNavigate();
  
  async function cadastrar(dados, callbackDepois) {
    try {
      const res = await cadastrarUsuario(dados);

      if (res.status === 201 || res.ok) {
        alert('Usuário cadastrado com sucesso!');
        if (callbackDepois) callbackDepois(); // ex: limpar campos, recarregar usuários
        navigate('/');
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Erro ao cadastrar usuário. Verifique os dados e tente novamente.');
    }
  }

  return { cadastrar }
}
