// Entry point dell'applicazione Vue
// Importa la funzione per creare l'app Vue
import { createApp } from 'vue'
// Importa il componente principale App.vue
import App from './App.vue'
// Importa il router per la navigazione tra le pagine
import router from './router'
// Importa i CSS di Bootstrap per lo stile
import 'bootstrap/dist/css/bootstrap.min.css'
// Importa Bootstrap JS per componenti dinamici
import 'bootstrap'

// Crea l'app Vue, registra il router e monta l'app sull'elemento #app
createApp(App).use(router).mount('#app')