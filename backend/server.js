import pkg from '@prisma/client';
import express from 'express'
import cors from 'cors'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';
import userRoutes from './routes/userRoutes.js';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const app = express()
app.use(express.json())
app.use(cors())
app.use('/users', userRoutes);

//Porta
const PORT = 3000

const SECRET = 'seu-segredo-aqui'; // use variáveis de ambiente em produção!

// Middleware para proteger rotas
function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  console.log('Authorization header:', authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token não fornecido' });

  jwt.verify(token, SECRET, (err, user) => {
    if (err) {
      console.log('Erro ao verificar token:', err);
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
}

//ROTAS 
// create user
app.post('/users', async (req, res) => {
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
});

//Pesquisar ID do usuario passando o email
app.get('/users/email/:email', async (req, res) => {
  const { email } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
    res.json(user);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

//logar usuário por email e senha
app.post('/login', async (req, res) => {
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

    res.status(200).json({ token });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
});

//lista user por id
app.get('/users/:id', async (req, res) => {
  try {
    const id = req.params.id;

    const user = await prisma.user.findUnique({
      where: { id } // ✅ id como string
    });

    if (!user) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

//Altera user
app.put('/users/:id', autenticarToken, async (req, res) => {
  const { name, age, email, senha } = req.body;
  const userId = req.params.id;

  // Validação do ID como ObjectId do MongoDB
  if (!ObjectId.isValid(userId)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(senha, saltRounds);

    const usuarioEditado = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        age: Number(age),
        email,
        senha: hashedPassword,
      },
    });

    res.status(200).json(usuarioEditado);
  } catch (error) {
    console.error('Erro ao editar usuário:', error);
    res.status(500).json({ error: 'Erro ao editar usuário' });
  }
});

//deletando users
app.delete('/users/:id', autenticarToken, async (req, res) => {
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
});

//Busca parcial ou ordenação
app.get('/users', autenticarToken, async (req, res) => {
  try {
    const { name, email, age, orderBy, orderDir } = req.query;

    const filters = {};
    if (name)  filters.name  = { contains: name, mode: 'insensitive' };
    if (email) filters.email = email;
    if (age)   filters.age   = Number(age);

    // Corrige a estrutura de 'order' para garantir compatibilidade com Prisma
    const order = orderBy
      ? [{ [orderBy]: orderDir === 'desc' ? 'desc' : 'asc' }]
      : [{ name: 'asc' }]; // ordenação padrão

    const users = await prisma.user.findMany({
      where: filters,
      orderBy : order,
      select  : {
        id    : true,
        name  : true,
        email : true,
        age   : true,
      },
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).json({ message: "Erro ao listar usuários" });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor local rodando em http://localhost:${PORT}`);
});

// Exemplo básico para testar conexão
async function main() {
  try {
    await prisma.$connect();
    console.log('✅ Conectado ao MongoDB com Prisma!');
  } catch (error) {
    console.error('❌ Erro ao conectar:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
