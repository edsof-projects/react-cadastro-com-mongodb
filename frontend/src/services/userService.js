import { apiComToken, apiSemToken } from './api';

// Login do usuário
export async function logarUsuario(email, senha) {
  const res = await apiSemToken.post('/auth/login', { email, senha })
  return res.data; 
}

// Listar todos os usuários
export async function listarUsuarios() { 
  const res = await apiComToken.get('/users')
  return res.data;
}

// Cadastrar usuário
export async function cadastrarUsuario(dados) {
  const res = await apiSemToken.post('/users', dados);
  return res;
}

// Deletar usuário
export async function deletarUsuario(id) {
  const res = await apiComToken.delete(`/users/${id}`);
  return res.data;
}

// Editar/Alterar usuário
export async function atualizarUsuario(id, dados) {
  const res = await apiComToken.put(`/users/${id}`, dados);
  return res.data;
}

// Atualizar senha autenticada pelo email
export async function alterarSenhaPorEmail(email, novaSenha) {  
  const res = await apiSemToken.put('/users/editsenha', { email, novaSenha })
  return res.data
}

export async function getUserById(id) {
  const res = await apiComToken.get(`/users/${id}`);
  return res.data;
}

// Buscar ID pelo email
export async function buscarIdPorEmail(email) {
  const res = await apiComToken.get(`/users/email/id`, {
    params: { email }
  });
  return res.data.id;
}