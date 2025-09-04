// Importa express per gestire le rotte
import express from 'express';
// Importa i controller commenti
import { getCommentsByLegend, addComment, deleteComment } from '../controllers/comment.controller.js';
// Importa il middleware di autenticazione
import { verifyToken } from '../middlewares/auth.middleware.js';

// Crea il router
const router = express.Router();

// Rotta per ottenere tutti i commenti di una leggenda
router.get('/legends/:id/comments', getCommentsByLegend);
// Rotta per aggiungere un commento (solo autenticato)
router.post('/legends/:id/comments', verifyToken, addComment);
// Rotta per eliminare un commento (solo autore o admin)
router.delete('/comments/:id', verifyToken, deleteComment);

// Esporta il router per l'utilizzo nel server
export default router;
