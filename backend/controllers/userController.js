import { prisma }   from '../lib/prismaClient.js';
import jwt          from 'jsonwebtoken';
import bcrypt       from 'bcrypt';
import { ObjectId } from 'mongodb';

const SECRET = process.env.JWT_SECRET

// Logar usuario
export const logarUsuario = async (req, res) => {
  const { email, senha } = req.body;

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios' });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    const senhaValida = await bcrypt.compare(senha, user.senha);

    if (!senhaValida) {
      return res.status(401).json({ error: 'Senha incorreta' });
    }

    // Senha correta, gera token JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      SECRET, // sua chave secreta
      { expiresIn: '1h' }
    );

    // Retorna token e nome do usuário (ajuste aqui)
    res.status(200).json({ token, nome: user.name });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

//Listar usuarios
export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.user.findMany();
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao listar usuários:', error);  // Adicione isto!
    res.status(500).json({ message: 'Erro ao listar usuários' });
  }
}

// Criar usuario
export const criarUsuario = async (req, res) => {
  const { name, age, email, senha } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.user.create({
      data: {
        name,
        age: Number(age),
        email,
        senha: hashedPassword,
      },
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ error: 'Erro ao cadastrar usuário' });
  }
}

// Deletar usuario
export const deletarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuarioExcluido = await prisma.user.delete({
      where: { id },
    });

    res.status(200).json({ message: 'Usuário excluído com sucesso!', usuarioExcluido });
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);

    if (error.code === 'P2025') {
      // P2025: registro não encontrado
      return res.status(404).json({ error: 'Usuário não encontrado.' });
    }

    res.status(500).json({ error: 'Erro ao excluir usuário.' });
  }
}

// Alterar dados do usuario
export const alterarUsuario = async (req, res) => {
  const { name, age, email } = req.body;
  const userId = req.params.id;

  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const dadosAtualizados = {
      name,
      age: Number(age),
      email,
    };

    const usuarioEditado = await prisma.user.update({
      where: { id: userId },
      data: dadosAtualizados,
    });

    res.status(200).json(usuarioEditado);
  } catch (error) {
    console.error('Erro ao editar usuário:', error);
    res.status(500).json({ error: 'Erro ao editar usuário' });
  }
}

//Alterar senha autenticada pelo email
export const alterarSenha = async (req, res) => {
  const { email, novaSenha } = req.body;
  
  if (!email || !novaSenha) {
    return res.status(400).json({ message: "Email e nova senha são obrigatórios." });
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(404).json({ message: "Usuário não encontrado." });
  }

  const hashedPassword = await bcrypt.hash(novaSenha, 10);

  await prisma.user.update({
    where: { email },
    data: { senha: hashedPassword }
  });

  res.status(200).json({ message: "Senha alterada com sucesso." });
};

// Buscar ID pelo email
export async function getUserIdByEmail (req, res) {
  const { email } = req.query;
  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true }  // Apenas o ID
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(user); // Retorna { id: '...' }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar ID do usuário' });
  }
}

// Buscar um usuário por ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id }
    });

    if (!user) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário por ID:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
