// Rotte per la gestione del profilo utente
// Importa Express per creare il router
import express from 'express';
// Importa i controller per operazioni sul profilo
import { getProfile, updateProfile, deleteProfile, getUserLegends } from '../controllers/profile.controller.js';
// Importa il middleware di autenticazione
import { verifyToken } from '../middlewares/auth.middleware.js';

// Crea il router Express
const router = express.Router();
// Rotta GET per ottenere il profilo dell'utente autenticato
router.get('/', verifyToken, getProfile);
// Rotta GET per ottenere tutte le leggende dell'utente
router.get('/legends', verifyToken, getUserLegends);
// Rotta PUT per aggiornare il profilo dell'utente
router.put('/', verifyToken, updateProfile);
// Rotta DELETE per eliminare il profilo dell'utente
router.delete('/', verifyToken, deleteProfile);

// Esporta il router per l'utilizzo nel server principale
export default router;