import pkg from '@prisma/client';
import express from 'express'
import cors from 'cors'

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const app = express()
app.use(express.json())
app.use(cors())

//Porta
const PORT = 3000

//ROTAS 
// create user
app.post('/users', async (req, res) =>{
   
    await prisma.user.create({
        data:{
            email : req.body.email,
            name  : req.body.name,
            age   : Number(req.body.age),
            senha : req.body.senha
        }
    })

    res.status(201).json(req.body)
})

//lista users, pode ser por name, email, age
app.get('/users', async (req, res) => {
  try {
    const filters = {};

    if (req.query.name)  filters.name  = req.query.name;
    if (req.query.email) filters.email = req.query.email;
    if (req.query.age)   filters.age   = Number(req.query.age); // se 'age' for número
    if (req.query.senha) filters.senha = req.query.senha;

    const users = await prisma.user.findMany({
      where: filters
    });

    res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    res.status(500).json({ message: "Erro ao listar usuários" });
  }
});

//logar usuário por email e senha
app.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    
    if (!email || !senha) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }

    const user = await prisma.user.findFirst({
      where: {
        email,
        senha // ⚠️ Ideal seria comparar com bcrypt
      }
    });

    if (!user) {
      return res.status(401).json({ error: "Usuário não encontrado ou senha incorreta" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao logar usuário:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
})

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


//editando users
app.put('/users/:id', async (req, res) =>{

    await prisma.user.update({
        where:{
          id: req.params.id
        },
        data:{
            email : req.body.email,
            name  : req.body.name,
            age: Number(req.body.age),
            senha : req.body.senha
        }
    })

    res.status(201).json(req.body)
})

//deletando users
app.delete('/users/:id', async (req, res) =>{

    await prisma.user.delete({
        where:{
          id: req.params.id
        }  
    })     
    
    res.status(200).json({ message : "Usuário excluído com sucesso!"})
})


app.listen(PORT, () => {
  console.log(`Servidor local rodando em http://localhost:${PORT}`);
});

// Exemplo básico para testar conexão
async function main() {
  try {
    await prisma.$connect();
    console.log('✅ Conectado ao MongoDB com Prisma!');
  } catch (error) {
    console.error('Erro:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
