// Importa il modello User per interagire con il database
// Importa bcrypt per l'hashing delle password  
// Importa jsonwebtoken per la creazione di token JWT
// Definisce le rotte per la registrazione e il login degli utenti
// Questo codice gestisce l'autenticazione degli utenti in un'applicazione Node.js utilizzando Mongoose, bcrypt e JWT. 
// Permette agli utenti di registrarsi e accedere, gestendo la creazione e la verifica delle credenziali in modo sicuro.
import User from '../models/User.js';
import Legend from '../models/Legend.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
    console.log('BODY REGISTRAZIONE:', req.body); // DEBUG
    const { username, email, password } = req.body;
    try {
        // Controlla se l'utente esiste già
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Utente già registrato" });
        }
        // Crea un nuovo utente
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        // Crea un token JWT
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
        res.status(201).json({ token, userId: newUser._id });
    } catch (error) {
        console.error("Errore durante la registrazione:", error);
        res.status(500).json({ message: "Errore del server" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        // Trova l'utente per email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Utente non trovato" });
        }  
        // Verifica la password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Password errata" });
        }
        // Crea un token JWT
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token, userId: user._id });
    } catch (error) {
        console.error("Errore durante il login:", error);
        res.status(500).json({ message: "Errore del server" });
    }
}
export const getUserLegends = async (req, res) => {
    try {
        const legends = await Legend.find({ user: req.userId });
        res.json(legends);
    } catch (error) {
        res.status(500).json({ message: 'Errore del server' });
    }
}