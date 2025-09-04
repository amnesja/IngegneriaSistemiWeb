// Configurazione delle chiamate API tramite Axios
// Importa axios per effettuare richieste HTTP
import axios from "axios";

// Crea istanza Axios con baseURL per tutte le richieste API
const api = axios.create({
  baseURL: "http://localhost:3000/api" // Cambia l'URL di base se necessario
});

// Funzione per ottenere i commenti di una leggenda
export const fetchComments = (legendId) =>
  api.get(`/legends/${legendId}/comments`);

// Funzione per aggiungere un commento a una leggenda
export const addComment = (legendId, data, token) =>
  api.post(`/legends/${legendId}/comments`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

// Funzione per eliminare un commento
export const deleteComment = (commentId, token) =>
  api.delete(`/comments/${commentId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

// Esporta l'istanza Axios per l'utilizzo in altre parti dell'applicazione
export default api;