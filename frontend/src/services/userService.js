import { apiComToken, apiSemToken } from './api';

// Listar todos os usuários
export async function listarUsuarios() { 
  const res = await apiComToken.get('/users')
  return res.data;
}

// Buscar usuário por ID
export async function buscarUsuarioPorId(id) {
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

// Atualizar usuário
export async function atualizarUsuario(id, dados) {
  const res = await apiComToken.put(`/users/${id}`, dados);
  return res.data;
}

// Login do usuário
export async function logarUsuario(email, senha) {
  const res = await apiSemToken.post('/login', { email, senha });
  return res.data; // Deve conter token
}

// Deletar usuário
export async function deletarUsuario(id) {
  const res = await apiComToken.delete(`/users/${id}`);
  return res.data;
}

// Cadastrar usuário
export async function cadastrarUsuario(dados) {
  const res = await apiSemToken.post('/users', dados);
  return res;
}
