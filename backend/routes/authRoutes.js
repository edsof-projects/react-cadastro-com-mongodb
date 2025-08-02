import express from 'express';
import { logarUsuario } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', logarUsuario);                     

export default router;
