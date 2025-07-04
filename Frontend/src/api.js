// Descrizione: Questo file contiene la configurazione dell'istanza di axios per le richieste API.
// Importa axios per effettuare richieste HTTP
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api" // Cambia l'URL di base se necessario
});

export default api; // Esporta l'istanza di axios per l'utilizzo in altre parti dell'applicazione