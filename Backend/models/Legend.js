// Modello Mongoose per le leggende popolari
// Importa mongoose per definire lo schema del modello
import mongoose from 'mongoose';

// Definisce lo schema della leggenda
const legendSchema = new mongoose.Schema({
    // Titolo della leggenda (obbligatorio)
    title: { type: String, required: true },
    // Descrizione della leggenda (opzionale)
    description: String,
    // Luogo associato alla leggenda (opzionale)
    location: String,
    // Riferimento all'utente che ha creato la leggenda (obbligatorio)
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, {
    // Aggiunge i timestamp (createdAt, updatedAt)
    timestamps: true
});

// Esporta il modello Legend per l'utilizzo nel resto dell'applicazione
export default mongoose.model("Legend", legendSchema);
