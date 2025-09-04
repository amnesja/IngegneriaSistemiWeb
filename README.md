# Folklore Archive - Full Stack App

## Introduzione
Folklore Archive è un'applicazione web full-stack pensata per la raccolta, gestione e condivisione di leggende popolari. Il progetto nasce come esercizio pratico di ingegneria dei sistemi web, con l'obiettivo di integrare le principali tecnologie moderne per lo sviluppo di applicazioni sicure, scalabili e user-friendly.

## Scopo dell'applicazione
L'app permette agli utenti di:
- Registrarsi e autenticarsi in modo sicuro tramite JWT
- Inserire, modificare ed eliminare leggende popolari
- Visualizzare tutte le leggende condivise dalla community
- Gestire il proprio profilo e le proprie leggende personali
- Commentare le leggende, visualizzare e cancellare i propri commenti
- Navigare in un'interfaccia moderna e responsiva, con feedback immediato e protezione delle operazioni riservate

L'obiettivo è fornire una piattaforma semplice ma completa per la valorizzazione della tradizione orale, favorendo la partecipazione e la condivisione tra utenti.

---

## Struttura progetto e spiegazione cartelle/file

```
IngegneriaSistemiWeb/
├── Backend/                # Backend Node.js/Express
│   ├── Server.js           # Entry point server Express
│   ├── controllers/        # Logica delle API (auth, profilo, leggende, commenti)
│   │   ├── auth.controller.js      # Login, registrazione
│   │   ├── legend.controller.js   # CRUD leggende
│   │   ├── profile.controller.js  # Gestione profilo utente
│   │   └── comment.controller.js  # Gestione commenti
│   ├── middlewares/        # Middleware Express
│   │   └── auth.middleware.js     # Verifica token JWT
│   ├── models/             # Modelli Mongoose
│   │   ├── User.js                # Schema utente
│   │   ├── Legend.js              # Schema leggenda
│   │   └── Comment.js             # Schema commento
│   ├── routes/             # Definizione rotte API
│   │   ├── auth.routes.js         # Rotte login/registrazione
│   │   ├── legend.routes.js       # Rotte CRUD leggende
│   │   ├── profile.routes.js      # Rotte profilo utente
│   │   └── comment.routes.js      # Rotte commenti
│   └── .env                 # Variabili ambiente (MongoDB, JWT)
├── Frontend/               # Frontend Vue 3/Vite
│   ├── index.html           # Entry point HTML
│   ├── package.json         # Dipendenze e script npm
│   ├── vite.config.js       # Configurazione Vite
│   ├── public/              # File statici (favicon, ecc)
│   ├── src/                 # Codice sorgente Vue
│   │   ├── api.js                  # Configurazione Axios per chiamate API
│   │   ├── App.vue                 # Root component, navbar e layout
│   │   ├── main.js                 # Bootstrap app Vue
│   │   ├── assets/                 # CSS, immagini
│   │   ├── components/             # Componenti riutilizzabili
│   │   ├── router/                 # Configurazione Vue Router
│   │   └── views/                  # Pagine principali
│   │       ├── HomeView.vue            # Home, lista leggende, commenti
│   │       ├── LegendForm.vue          # Form aggiunta leggenda
│   │       ├── LoginView.vue           # Login utente
│   │       ├── ProfileView.vue         # Profilo utente e gestione leggende
│   │       └── RegisterView.vue        # Registrazione utente
│   └── README.md               # Documentazione frontend
└── commit-summary.txt          # Riepilogo modifiche e funzionalità
```

---

## Avvio progetto

### Backend
1. Installa le dipendenze:
   ```sh
   npm install
   ```
2. Configura il file `.env` con la stringa di connessione MongoDB e la chiave JWT:
   ```env
   MONGO_URI=mongodb://localhost:27017/folklore-archive
   JWT_SECRET=supersegretissimo
   ```
3. Avvia il backend:
   ```sh
   node Server.js
   ```

### Frontend
1. Installa le dipendenze:
   ```sh
   npm install
   ```
2. Avvia il frontend:
   ```sh
   npm run dev
   ```

---

## API principali

- `POST /api/auth/register` - Registrazione utente
- `POST /api/auth/login` - Login utente
- `GET /api/profile` - Dati profilo utente
- `PUT /api/profile` - Modifica profilo
- `DELETE /api/profile` - Elimina account
- `GET /api/profile/legends` - Leggende dell'utente
- `GET /api/legends` - Tutte le leggende
- `POST /api/legends` - Aggiungi leggenda
- `PUT /api/legends/:id` - Modifica leggenda
- `DELETE /api/legends/:id` - Elimina leggenda
- `GET /api/legends/:id/comments` - Visualizza commenti di una leggenda
- `POST /api/legends/:id/comments` - Aggiungi commento a una leggenda
- `DELETE /api/comments/:id` - Elimina commento (solo autore)

---

## Tecnologie utilizzate
- **Frontend**: Vue 3 + Vite + Bootstrap + Axios
- **Backend**: Express + Mongoose + JWT + dotenv + CORS
- **Autenticazione**: token JWT salvato in localStorage
- **Navbar**: reattiva allo stato di login/logout
- **Validazione**: controlli su campi obbligatori e feedback utente
- **Commenti**: CRUD commenti sulle leggende, solo autore può eliminare

---

## Autore
Bagga Naman - Progetto Ingegneria Sistemi Web

---

Per dettagli sulle modifiche e funzionalità, vedi anche `commit-summary.txt`.