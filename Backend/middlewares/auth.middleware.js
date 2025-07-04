// Questo codice definisce un middleware di autenticazione per verificare i token JWT nelle richieste HTTP.
// Il middleware estrae il token dall'intestazione della richiesta, lo verifica e, se valido, consente l'accesso alle risorse protette.
// Se il token non è presente o non è valido, restituisce un errore di accesso negato o token non valido.
// Importa il pacchetto jsonwebtoken per la gestione dei token JWT
import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const tokenHeader = req.headers["authorization"];
    console.log('Authorization header:', tokenHeader);
    let token = tokenHeader;
    // Se il token inizia con 'Bearer ', rimuovilo
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7);
    }
    if (!token) {
        return res.status(401).json({ message: "Accesso negato, token mancante" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            console.error('Errore verifica token:', err);
            return res.status(403).json({ message: "Token non valido" });
        }
        req.userId = decoded.id; // Salva l'ID utente decodificato nella richiesta
        next();
    });
}