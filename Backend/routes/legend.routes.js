// Rotte per la gestione delle leggende popolari
// Importa Express per creare il router
import express from 'express';
// Importa i controller CRUD sulle leggende
import { getAll, create, updateLegend, deleteLegend } from '../controllers/legend.controller.js';
// Importa il middleware di autenticazione
import { verifyToken } from '../middlewares/auth.middleware.js';

// Crea il router Express
const router = express.Router();

// Rotta GET per ottenere tutte le leggende
router.get("/", getAll);
// Rotta POST per creare una nuova leggenda (solo autenticato)
router.post("/", verifyToken, create);
// Rotta PUT per aggiornare una leggenda (solo autore)
router.put('/:id', verifyToken, updateLegend);
// Rotta DELETE per eliminare una leggenda (solo autore)
router.delete('/:id', verifyToken, deleteLegend);
// Esporta il router per l'utilizzo nel server principale
export default router;