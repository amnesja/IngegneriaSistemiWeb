import User from "../models/User.js";
import Legend from "../models/Legend.js";
import bcrypt from "bcryptjs";

// ottiene il profilo dell'utente autenticato
export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "Utente non trovato" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Errore durante il recupero del profilo:", error);
        res.status(500).json({ message: "Errore del server" });
    }  
}

// aggiorna il profilo dell'utente autenticato
export const updateProfile = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "Utente non trovato" });
        }
        // Aggiorna i campi dell'utente
        user.username = username || user.username;
        user.email = email || user.email;
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }
        await user.save();
        res.status(200).json({ message: "Profilo aggiornato con successo" });
    } catch (error) {
        console.error("Errore durante l'aggiornamento del profilo:", error);
        res.status(500).json({ message: "Errore del server" });
    }
}

// elimina il profilo dell'utente autenticato
export const deleteProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.userId);
        if (!user) {
            return res.status(404).json({ message: "Utente non trovato" });
        }
        res.status(200).json({ message: "Profilo eliminato con successo" });
    } catch (error) {
        console.error("Errore durante l'eliminazione del profilo:", error);
        res.status(500).json({ message: "Errore del server" });
    }
}

// ottiene tutte le leggende dell'utente autenticato
export const getUserLegends = async (req, res) => {
    try {
        const legends = await Legend.find({ user: req.userId });
        res.status(200).json(legends);
    } catch (error) {
        console.error("Errore durante il recupero delle leggende dell'utente:", error);
        res.status(500).json({ message: "Errore del server" });
    }
}