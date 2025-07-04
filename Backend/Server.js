// Questo codice avvia un server Express che si connette a un database MongoDB e gestisce le rotte per le leggende e l'autenticazione degli utenti. Utilizza Mongoose per la gestione del database, dotenv per la configurazione delle variabili d'ambiente e cors per abilitare le richieste cross-origin.
// Importa le dipendenze necessarie
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import legendsRoutes from './routes/legend.routes.js';
import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Benvenuto nell\'API delle leggende!');
});

app.use('/api/legends', legendsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

if (!process.env.MONGO_URI) {
    console.error('Errore: la variabile d\'ambiente MONGO_URI non è impostata.');
    process.exit(1);
}

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(3000, () => console.log('Server avviato su http://localhost:3000'));
    })
    .catch((err) => {
        console.error('Errore di connessione a MongoDB:', err);
        process.exit(1);
    });