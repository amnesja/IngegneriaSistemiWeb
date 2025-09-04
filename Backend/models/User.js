// Modello Mongoose per gli utenti dell'applicazione
// Importa mongoose per definire lo schema del modello
import mongoose from "mongoose";

// Definisce lo schema utente
const userSchema = new mongoose.Schema({
    // Username dell'utente (obbligatorio, unico)
    username: { type: String, required: true, unique: true },
    // Email dell'utente (obbligatoria, unica)
    email: { type: String, required: true, unique: true },
    // Password hashata dell'utente (obbligatoria)
    password: { type: String, required: true },
});

// Esporta il modello User per l'utilizzo nel resto dell'applicazione
export default mongoose.model("User", userSchema);
