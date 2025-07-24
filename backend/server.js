import pkg from '@prisma/client';
import express from 'express'

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const app = express()
app.use(express.json())
const PORT = 3000

//ROTAS 
// create user
app.post('/users', async (req, res) =>{

    await prisma.user.create({
        data:{
            email : req.body.email,
            name  : req.body.name,
            age   : req.body.age
        }
    })

    res.status(201).json(req.body)
})

//lista users
// app.get('/users', async (req, res) =>{
    
//     const users = await prisma.user.findMany()
//     res.status(200).json(users)

// })

//lista user especifico
app.get('/users', async (req, res) =>{
    let users = []
    
    if(req.query){
       users = await prisma.user.findMany({
          where:{
            name: req.query.name,
            email: req.query.email,
            age: req.query.age,
          }
       })
    }else{
      const users = await prisma.user.findMany()
    }
    
    res.status(200).json(users)

})

//editando users
app.put('/users/:id', async (req, res) =>{

    await prisma.user.update({
        where:{
          id: req.params.id
        },
        data:{
            email : req.body.email,
            name  : req.body.name,
            age   : req.body.age
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
