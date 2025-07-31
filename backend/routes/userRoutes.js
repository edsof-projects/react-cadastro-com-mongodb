import express from 'express';
import {
  getAllUsers,
  getUserById,
  getUserIdByEmail,
} from '../controller/userController.js';

const router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.get('/email/id', getUserIdByEmail); // Ex: /users/email/id?email=teste@teste.com

export default router;
