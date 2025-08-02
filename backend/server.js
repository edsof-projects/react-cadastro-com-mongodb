import express    from 'express'
import cors       from 'cors'
import dotenv     from 'dotenv'
import morgan     from 'morgan';
import { prisma } from './lib/prismaClient.js'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js';

dotenv.config(); 

const app = express()

app.use(cors({
  origin: 'http://localhost:5173', // endereço do seu frontend
  credentials: true,
}))

app.use(express.json())

// Logs de requisição
app.use(morgan('dev')); // ou 'combined' para logs mais completos

// Rotas
app.use('/users', userRoutes)

// Middleware de erro genérico (final da cadeia)
app.use((err, req, res, next) => {
  console.error('Erro interno:', err.stack);
  res.status(500).json({ error: 'Erro interno no servidor' });
});

app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3000;

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
