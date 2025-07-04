import express from 'express';
import { getProfile, updateProfile, deleteProfile, getUserLegends } from '../controllers/profile.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();
// Rotta per ottenere il profilo dell'utente
router.get('/', verifyToken, getProfile);
// Rotta per ottenere le leggende dell'utente
router.get('/legends', verifyToken, getUserLegends);
// Rotta per aggiornare il profilo dell'utente
router.put('/', verifyToken, updateProfile);
// Rotta per eliminare il profilo dell'utente
router.delete('/', verifyToken, deleteProfile);

export default router;