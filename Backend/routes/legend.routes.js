import express from 'express';
import { getAll, create, updateLegend, deleteLegend } from '../controllers/legend.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Rotta per ottenere tutte le leggende
router.get("/", getAll);
// Rotta per creare una nuova leggenda
router.post("/", verifyToken, create);
// Rotta per aggiornare una leggenda
router.put('/:id', verifyToken, updateLegend);
// Rotta per eliminare una leggenda
router.delete('/:id', verifyToken, deleteLegend);
// Esporta il router per l'utilizzo in altre parti dell'applicazione
export default router;