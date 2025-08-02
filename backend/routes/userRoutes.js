import express from 'express';
import { autenticarToken } from '../middlewares/autenticarToken.js';
import {
  // getAllUsers,
  getUserById,
  alterarSenha,
  criarUsuario,
  alterarUsuario,
  deletarUsuario,
  listarUsuarios
} from '../controllers/userController.js';

const router = express.Router();

// Editar senha - Esqueci a senha Rota Publica
router.put('/editsenha', alterarSenha);

// Rotas Protegidas para listar todos os usuários (protegida)
router.get('/', autenticarToken, listarUsuarios);

// Rota para buscar usuário por ID (protegida)
router.get('/:id', autenticarToken, getUserById);

// Criar novo usuário (pública ou protegida, dependendo da regra)
router.post('/', criarUsuario);

// Alterar/Editar usuário (protegida)
router.put('/:id', autenticarToken, alterarUsuario);

// Deletar usuário (protegida)
router.delete('/:id', autenticarToken, deletarUsuario);

export default router;
