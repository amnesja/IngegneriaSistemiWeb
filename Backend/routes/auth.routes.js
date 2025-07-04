// Questo codice definisce le rotte per l'autenticazione degli utenti in un'applicazione Node.js utilizzando Express. Le rotte gestiscono la registrazione e il login degli utenti, permettendo loro di creare un account e accedere all'applicazione. Il router esportato può essere utilizzato in altre parti dell'applicazione per integrare le funzionalità di autenticazione.
// Importa Express per creare il router e i controller per gestire le richieste di autenticazione
// Importa i controller per la registrazione e il login degli utenti
import express from 'express';
import { login, register } from '../controllers/auth.controller.js';
const router = express.Router();
// Rotta per la registrazione degli utenti
router.post("/register", register);
// Rotta per il login degli utenti
router.post("/login", login);

// Rotta GET di test per /api/auth
router.get("/", (req, res) => {
  res.json({ message: "Auth API attiva" });
});
// Esporta il router per l'utilizzo in altre parti dell'applicazione
export default router;