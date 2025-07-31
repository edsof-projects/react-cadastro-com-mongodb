import { deletarUsuario } from '../services/userService';

export function useDeletaUser() {
  async function deletar(id, callbackDepoisDeletar) {
    const confirmar = window.confirm('Tem certeza que deseja excluir este usuário?');

    if (!confirmar) return;

    try {
      await deletarUsuario(id);
      alert('Usuário excluído com sucesso!');

      if (callbackDepoisDeletar) callbackDepoisDeletar(); // Ex: recarregar a lista
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      alert('Erro ao excluir usuário.');
    }
  }

  return { deletar };
}
