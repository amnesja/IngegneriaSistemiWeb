// Controller per la gestione del profilo utente
// Importa il modello User per operazioni sugli utenti
import User from "../models/User.js";
// Importa il modello Legend per operazioni sulle leggende
import Legend from "../models/Legend.js";
// Importa bcrypt per hash sicuro delle password
import bcrypt from "bcryptjs";

// Ottiene il profilo dell'utente autenticato
export const getProfile = async (req, res) => {
    try {
        // Trova utente per id e esclude la password dalla risposta
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            // Se non trovato, restituisci errore
            return res.status(404).json({ message: "Utente non trovato" });
        }
        // Risponde con i dati utente
        res.status(200).json(user);
    } catch (error) {
        // Log errore e risposta generica
        console.error("Errore durante il recupero del profilo:", error);
        res.status(500).json({ message: "Errore del server" });
    }  
}

// Aggiorna il profilo dell'utente autenticato
export const updateProfile = async (req, res) => {
    // Estrai dati dal body
    const { username, email, password } = req.body;
    try {
        // Trova utente per id
        const user = await User.findById(req.userId);
        if (!user) {
            // Se non trovato, restituisci errore
            return res.status(404).json({ message: "Utente non trovato" });
        }
        // Aggiorna i campi dell'utente se forniti
        user.username = username || user.username;
        user.email = email || user.email;
        if (password) {
            // Hash della nuova password se fornita
            user.password = await bcrypt.hash(password, 10);
        }
        // Salva modifiche
        await user.save();
        res.status(200).json({ message: "Profilo aggiornato con successo" });
    } catch (error) {
        // Log errore e risposta generica
        console.error("Errore durante l'aggiornamento del profilo:", error);
        res.status(500).json({ message: "Errore del server" });
    }
}

// Elimina il profilo dell'utente autenticato
export const deleteProfile = async (req, res) => {
    try {
        // Elimina utente per id
        const user = await User.findByIdAndDelete(req.userId);
        if (!user) {
            // Se non trovato, restituisci errore
            return res.status(404).json({ message: "Utente non trovato" });
        }
        // Risponde con conferma eliminazione
        res.status(200).json({ message: "Profilo eliminato con successo" });
    } catch (error) {
        // Log errore e risposta generica
        console.error("Errore durante l'eliminazione del profilo:", error);
        res.status(500).json({ message: "Errore del server" });
    }
}

// Ottiene tutte le leggende dell'utente autenticato
export const getUserLegends = async (req, res) => {
    try {
        // Trova tutte le leggende create dall'utente
        const legends = await Legend.find({ user: req.userId });
        // Risponde con la lista delle leggende
        res.status(200).json(legends);
    } catch (error) {
        // Log errore e risposta generica
        console.error("Errore durante il recupero delle leggende dell'utente:", error);
        res.status(500).json({ message: "Errore del server" });
    }
}