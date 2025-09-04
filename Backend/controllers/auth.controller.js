// Controller autenticazione utenti: gestisce login e registrazione
// Importa il modello User per interagire con il database utenti
import User from '../models/User.js';
// Importa il modello Legend (non usato qui, ma utile per estensioni)
import Legend from '../models/Legend.js';
// Importa bcrypt per hash sicuro delle password
import bcrypt from 'bcryptjs';
// Importa jsonwebtoken per generare e verificare token JWT
import jwt from 'jsonwebtoken';

// Funzione di registrazione utente
export const register = async (req, res) => {
    // Log di debug per vedere il body ricevuto
    console.log('BODY REGISTRAZIONE:', req.body); // DEBUG
    // Estrai dati dal body
    const { username, email, password } = req.body;
    try {
        // Controlla se esiste già un utente con la stessa email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // Se esiste, restituisci errore
            return res.status(400).json({ message: "Utente già registrato" });
        }
        // Hash della password
        const hashedPassword = await bcrypt.hash(password, 10);
        // Crea nuovo utente
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        // Salva utente nel database
        await newUser.save();
        // Crea token JWT con id utente
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        // Risposta con token e dati utente
        res.status(201).json({ token, user: { _id: newUser._id, username: newUser.username, email: newUser.email } });
    } catch (error) {
        // Log errore e risposta generica
        console.error("Errore durante la registrazione:", error);
        res.status(500).json({ message: "Errore del server" });
    }
}

// Funzione di login utente
export const login = async (req, res) => {
    // Estrai email e password dal body
    const { email, password } = req.body;
    try {
        // Trova utente per email
        const user = await User.findOne({ email });
        if (!user) {
            // Se non trovato, restituisci errore
            return res.status(400).json({ message: "Utente non trovato" });
        }  
        // Verifica password con bcrypt
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            // Se errata, restituisci errore
            return res.status(400).json({ message: "Password errata" });
        }
        // Crea token JWT con id utente
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        // Risposta con token e dati utente
        res.status(200).json({ token, user: { _id: user._id, username: user.username, email: user.email } });
    } catch (error) {
        // Log errore e risposta generica
        console.error("Errore durante il login:", error);
        res.status(500).json({ message: "Errore del server" });
    }
}

// Funzione per ottenere le leggende dell'utente
export const getUserLegends = async (req, res) => {
    try {
        // Trova leggende associate all'utente
        const legends = await Legend.find({ user: req.userId });
        res.json(legends);
    } catch (error) {
        res.status(500).json({ message: 'Errore del server' });
    }
}