// Modello Mongoose per i commenti
import mongoose from 'mongoose';

// Definisce lo schema del commento
const commentSchema = new mongoose.Schema({
  // Testo del commento
  text: { type: String, required: true },
  // Riferimento all'autore (utente)
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // Riferimento alla leggenda associata
  legend: { type: mongoose.Schema.Types.ObjectId, ref: 'Legend', required: true }
}, {
  // Aggiunge i timestamp (createdAt, updatedAt)
  timestamps: true
});

// Esporta il modello Comment per l'utilizzo nel resto dell'applicazione
export default mongoose.model('Comment', commentSchema);