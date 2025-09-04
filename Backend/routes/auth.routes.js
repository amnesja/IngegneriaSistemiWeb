// Questo codice definisce le rotte per l'autenticazione degli utenti in un'applicazione Node.js utilizzando Express. Le rotte gestiscono la registrazione e il login degli utenti, permettendo loro di creare un account e accedere all'applicazione. Il router esportato può essere utilizzato in altre parti dell'applicazione per integrare le funzionalità di autenticazione.
// Importa Express per creare il router
import express from 'express';
// Importa i controller per la registrazione e il login
import { login, register } from '../controllers/auth.controller.js';
// Crea il router Express
const router = express.Router();
// Rotta POST per la registrazione degli utenti
router.post("/register", register);
// Rotta POST per il login degli utenti
router.post("/login", login);

// Rotta GET di test per verificare che l'API auth sia attiva
router.get("/", (req, res) => {
  res.json({ message: "Auth API attiva" });
});
// Esporta il router per l'utilizzo nel server principale
export default router;