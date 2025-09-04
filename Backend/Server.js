// Questo codice avvia un server Express che si connette a un database MongoDB e gestisce le rotte per le leggende e l'autenticazione degli utenti. Utilizza Mongoose per la gestione del database, dotenv per la configurazione delle variabili d'ambiente e cors per abilitare le richieste cross-origin.
// Importa le dipendenze necessarie
import express from 'express'; // Importa Express per creare il server
import mongoose from 'mongoose'; // Importa Mongoose per gestire il database MongoDB
import cors from 'cors'; // Importa CORS per abilitare richieste cross-origin
import dotenv from 'dotenv'; // Importa dotenv per gestire variabili d'ambiente

// Importa le rotte delle leggende
import legendsRoutes from './routes/legend.routes.js';
// Importa le rotte di autenticazione
import authRoutes from './routes/auth.routes.js';
// Importa le rotte profilo utente
import profileRoutes from './routes/profile.routes.js';
// Importa le rotte commenti
import commentRoutes from './routes/comment.routes.js';

// Carica variabili d'ambiente dal file .env
dotenv.config();
// Crea istanza Express
const app = express();
// Abilita CORS per tutte le richieste
app.use(cors());
// Abilita parsing JSON nel body delle richieste
app.use(express.json());

// Rotta di benvenuto (test API)
app.get('/', (req, res) => {
    res.send('Benvenuto nell\'API delle leggende!');
});

// Registra rotte per le leggende
app.use('/api/legends', legendsRoutes);
// Registra rotte per autenticazione
app.use('/api/auth', authRoutes);
// Registra rotte per profilo utente
app.use('/api/profile', profileRoutes);
// Registra rotte per commenti
app.use('/api', commentRoutes); // Rotte per i commenti

// Verifica che la variabile d'ambiente MONGO_URI sia presente
if (!process.env.MONGO_URI) {
    console.error('Errore: la variabile d\'ambiente MONGO_URI non è impostata.');
    process.exit(1);
}

// Connessione a MongoDB e avvio server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // Avvia il server sulla porta 3000
        app.listen(3000, () => console.log('Server avviato su http://localhost:3000'));
    })
    .catch((err) => {
        // Log errore di connessione e termina processo
        console.error('Errore di connessione a MongoDB:', err);
        process.exit(1);
    });