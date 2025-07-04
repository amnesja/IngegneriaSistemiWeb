import Legend from '../models/Legend.js';

export const getAll = async (req, res) => {
    try {
        // Popola sia username che email
        const legends = await Legend.find().populate('user', 'username email');
        res.status(200).json(legends);
    } catch (error) {
        console.error("Errore durante il recupero delle leggende:", error);
        res.status(500).json({ message: "Errore del server" });
    }
}

export const create = async (req, res) => {
    const { title, description, location } = req.body;
    const userId = req.userId; // Assicurati che l'ID utente sia passato correttamente

    try {
        const newLegend = new Legend({
            title,
            description,
            location,
            user: userId
        });
        await newLegend.save();
        res.status(201).json(newLegend);
    } catch (error) {
        console.error("Errore durante la creazione della leggenda:", error);
        res.status(500).json({ message: "Errore del server" });
    }
}

// Aggiorna una leggenda esistente
export const updateLegend = async (req, res) => {
    const { title, description, location } = req.body;
    const userId = req.userId;
    try {
        const legend = await Legend.findById(req.params.id);
        if (!legend) {
            return res.status(404).json({ message: 'Leggenda non trovata' });
        }
        // Solo l'autore può modificare
        if (legend.user.toString() !== userId) {
            return res.status(403).json({ message: 'Non autorizzato' });
        }
        legend.title = title;
        legend.description = description;
        legend.location = location;
        await legend.save();
        res.status(200).json({ message: 'Leggenda aggiornata' });
    } catch (error) {
        console.error('Errore durante l\'aggiornamento della leggenda:', error);
        res.status(500).json({ message: 'Errore del server' });
    }
};

// Elimina una leggenda esistente
export const deleteLegend = async (req, res) => {
    const userId = req.userId;
    try {
        const legend = await Legend.findById(req.params.id);
        if (!legend) {
            return res.status(404).json({ message: 'Leggenda non trovata' });
        }
        // Solo l'autore può eliminare
        if (legend.user.toString() !== userId) {
            return res.status(403).json({ message: 'Non autorizzato' });
        }
        await legend.deleteOne();
        res.status(200).json({ message: 'Leggenda eliminata' });
    } catch (error) {
        console.error('Errore durante l\'eliminazione della leggenda:', error);
        res.status(500).json({ message: 'Errore del server' });
    }
};