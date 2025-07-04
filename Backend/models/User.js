// Questo codice definisce un modello Mongoose per un utente, con email e password come campi richiesti.
// Importa mongoose per definire lo schema del modello
// e esporta il modello per l'utilizzo in altre parti dell'applicazione.
import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
export default mongoose.model("User", userSchema);
