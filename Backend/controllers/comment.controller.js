// Importa il modello Comment per interagire con i commenti nel database
import Comment from '../models/Comment.js';
// Importa il modello Legend per verificare l'esistenza della leggenda
import Legend from '../models/Legend.js';

// Ottieni tutti i commenti di una leggenda
export const getCommentsByLegend = async (req, res) => {
  try {
    // Trova tutti i commenti associati alla leggenda e popola l'autore
    const comments = await Comment.find({ legend: req.params.id }).populate('author', 'username email').sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    // Log errore e risposta generica
    console.error('Errore nel recupero commenti:', error);
    res.status(500).json({ message: 'Errore del server' });
  }
};

// Aggiungi un commento a una leggenda
export const addComment = async (req, res) => {
  // Estrai testo commento dal body
  const { text } = req.body;
  // Estrai id utente autenticato dal middleware
  const userId = req.userId;
  // Log di debug
  console.log('Richiesta aggiunta commento:', { text, userId, params: req.params, headers: req.headers });
  // Validazione testo commento
  if (!text || typeof text !== 'string' || text.trim() === '') {
    return res.status(400).json({ message: 'Testo commento mancante o non valido' });
  }
  try {
    // Verifica esistenza leggenda
    const legend = await Legend.findById(req.params.id);
    if (!legend) return res.status(404).json({ message: 'Leggenda non trovata' });
    // Crea nuovo commento
    const comment = new Comment({
      text,
      author: userId,
      legend: legend._id
    });
    await comment.save();
    // Popola autore per la risposta
    await comment.populate('author', 'username email');
    res.status(201).json(comment);
  } catch (error) {
    // Log errore e risposta generica
    console.error('Errore nell\'aggiunta commento:', error);
    res.status(500).json({ message: 'Errore del server' });
  }
};

// Elimina un commento (solo autore o admin)
export const deleteComment = async (req, res) => {
  // Estrai id utente autenticato
  const userId = req.userId;
  try {
    // Trova commento per id
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: 'Commento non trovato' });
    // Verifica che l'utente sia l'autore
    if (comment.author.toString() !== userId) {
      return res.status(403).json({ message: 'Non autorizzato' });
    }
    // Elimina commento
    await comment.deleteOne();
    res.status(200).json({ message: 'Commento eliminato' });
  } catch (error) {
    // Log errore e risposta generica
    console.error('Errore nell\'eliminazione commento:', error);
    res.status(500).json({ message: 'Errore del server' });
  }
};
