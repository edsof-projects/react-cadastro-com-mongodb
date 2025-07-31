import { prisma } from '../lib/prismaClient.js';

// Buscar ID pelo email
export async function getUserIdByEmail(req, res) {
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

// Buscar todos os usuários
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
};

// Buscar um usuário por ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
};
