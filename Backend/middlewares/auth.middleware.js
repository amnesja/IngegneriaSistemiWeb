// Middleware di autenticazione per proteggere le rotte con JWT
// Importa jsonwebtoken per gestire i token JWT
import jwt from 'jsonwebtoken';

// Funzione middleware per verificare il token JWT
export const verifyToken = (req, res, next) => {
    // Estrae il token dall'header Authorization
    const tokenHeader = req.headers["authorization"];
    // Log di debug per vedere l'header ricevuto
    console.log('Authorization header:', tokenHeader);
    let token = tokenHeader;
    // Se il token inizia con 'Bearer ', rimuove la stringa 'Bearer '
    if (token && token.startsWith('Bearer ')) {
        token = token.slice(7);
    }
    // Se il token non è presente, restituisce errore 401
    if (!token) {
        return res.status(401).json({ message: "Accesso negato, token mancante" });
    }

    // Verifica il token JWT
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // Se il token non è valido, restituisce errore 403
            console.error('Errore verifica token:', err);
            return res.status(403).json({ message: "Token non valido" });
        }
        // Salva l'ID utente decodificato nella richiesta per uso successivo
        req.userId = decoded.id;
        // Passa al prossimo middleware o controller
        next();
    });
}