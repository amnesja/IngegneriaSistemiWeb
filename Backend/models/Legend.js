// Questo codice definisce un modello Mongoose per una leggenda, con titolo, descrizione, posizione e un riferimento all'utente che l'ha creata.
// Il modello include anche un timestamp per la creazione e l'aggiornamento della leggenda.
// Importa mongoose per definire lo schema del modello
// e esporta il modello per l'utilizzo in altre parti dell'applicazione.
// Il campo 'user' è un riferimento a un altro modello, 'User', che rappresenta l'utente che ha creato la leggenda.
// Questo permette di associare ogni leggenda a un utente specifico, facilitando la gestione delle relazioni tra i modelli.
// Il campo 'timestamps' aggiunge automaticamente i campi 'createdAt' e 'updatedAt' al modello, che sono utili per tenere traccia delle modifiche nel tempo.
// Il modello viene esportato per essere utilizzato in altre parti dell'applicazione, come nei controller o nei servizi che gestiscono le operazioni CRUD (Create, Read, Update, Delete) sulle leggende.
// Questo modello può essere utilizzato per creare, leggere, aggiornare ed eliminare leggende nel database MongoDB, facilitando la gestione delle leggende nell'applicazione.
// Il campo 'title' è obbligatorio, mentre 'description' e 'location' sono opzionali, permettendo una certa flessibilità nella definizione delle leggende.
// Il campo 'location' può essere utilizzato per specificare un luogo associato alla leggenda, rendendo il modello utile per applicazioni che gestiscono storie o eventi legati a specifiche località.
// Il campo 'description' può contenere ulteriori dettagli sulla leggenda, arricchendo le informazioni disponibili per ogni leggenda.
// Il modello 'Legend' può essere utilizzato in un'applicazione per gestire leggende, storie o eventi, permettendo agli utenti di creare e condividere contenuti legati a luoghi specifici o a eventi storici.
import mongoose from 'mongoose';
const legendSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: String,
    location: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });
export default mongoose.model("Legend", legendSchema);
