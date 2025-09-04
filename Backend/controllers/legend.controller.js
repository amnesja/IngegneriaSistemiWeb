// Controller per la gestione delle leggende popolari
// Importa il modello Legend per interagire con il database
import Legend from '../models/Legend.js';

// Recupera tutte le leggende dal database
export const getAll = async (req, res) => {
    try {
        // Trova tutte le leggende e popola i dati utente (username, email)
        const legends = await Legend.find().populate('user', 'username email');
        // Risponde con la lista delle leggende
        res.status(200).json(legends);
    } catch (error) {
        // Log errore e risposta generica
        console.error("Errore durante il recupero delle leggende:", error);
        res.status(500).json({ message: "Errore del server" });
    }
}

// Crea una nuova leggenda
export const create = async (req, res) => {
    // Estrai dati dal body
    const { title, description, location } = req.body;
    // Estrai id utente autenticato
    const userId = req.userId; // Assicurati che l'ID utente sia passato correttamente

    try {
        // Crea nuova istanza Legend
        const newLegend = new Legend({
            title,
            description,
            location,
            user: userId
        });
        // Salva leggenda nel database
        await newLegend.save();
        // Risponde con la leggenda creata
        res.status(201).json(newLegend);
    } catch (error) {
        // Log errore e risposta generica
        console.error("Errore durante la creazione della leggenda:", error);
        res.status(500).json({ message: "Errore del server" });
    }
}

// Aggiorna una leggenda esistente
export const updateLegend = async (req, res) => {
    // Estrai dati dal body
    const { title, description, location } = req.body;
    // Estrai id utente autenticato
    const userId = req.userId;
    try {
        // Trova leggenda per id
        const legend = await Legend.findById(req.params.id);
        if (!legend) {
            // Se non trovata, restituisci errore
            return res.status(404).json({ message: 'Leggenda non trovata' });
        }
        // Solo l'autore può modificare
        if (legend.user.toString() !== userId) {
            return res.status(403).json({ message: 'Non autorizzato' });
        }
        // Aggiorna campi
        legend.title = title;
        legend.description = description;
        legend.location = location;
        // Salva modifiche
        await legend.save();
        res.status(200).json({ message: 'Leggenda aggiornata' });
    } catch (error) {
        // Log errore e risposta generica
        console.error('Errore durante l\'aggiornamento della leggenda:', error);
        res.status(500).json({ message: 'Errore del server' });
    }
};

// Elimina una leggenda esistente
export const deleteLegend = async (req, res) => {
    // Estrai id utente autenticato
    const userId = req.userId;
    try {
        // Trova leggenda per id
        const legend = await Legend.findById(req.params.id);
        if (!legend) {
            // Se non trovata, restituisci errore
            return res.status(404).json({ message: 'Leggenda non trovata' });
        }
        // Solo l'autore può eliminare
        if (legend.user.toString() !== userId) {
            return res.status(403).json({ message: 'Non autorizzato' });
        }
        // Elimina leggenda
        await legend.deleteOne();
        res.status(200).json({ message: 'Leggenda eliminata' });
    } catch (error) {
        // Log errore e risposta generica
        console.error('Errore durante l\'eliminazione della leggenda:', error);
        res.status(500).json({ message: 'Errore del server' });
    }
};