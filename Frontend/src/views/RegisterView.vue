<template>
  <!-- Form di registrazione utente -->
  <div>
    <h2>Registrazione</h2>
    <form @submit.prevent="handleRegister">
       <!-- Campo username -->
       <div class="mb-3">
         <label>Username</label>
         <input v-model="username" type="text" class="form-control" required />
      </div>
      <!-- Campo email -->
      <div class="mb-3">
        <label>Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>
      <!-- Campo password -->
      <div class="mb-3">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control" required />
      </div>
      <!-- Pulsante submit -->
      <button class="btn btn-success">Registrati</button>
    </form>
    <!--
    <div class="mt-3">
      <button class="btn btn-secondary" @click="logout">Logout</button>
      <div class="mt-2">
        <strong>Token attuale:</strong>
        <pre>{{ currentToken }}</pre>
      </div>
    </div>
    -->
  </div>
</template>

<script setup>
// Importa funzioni reattive da Vue
import { ref } from 'vue';
// Importa API per chiamate backend
import api from '../api';
// Importa router per navigazione
import { useRouter } from 'vue-router';

// Stato campi form registrazione
const username = ref('');
const email = ref('');
const password = ref('');
// Stato token attuale (debug)
const currentToken = ref(localStorage.getItem('token') || '');
// Ottieni istanza router
const router = useRouter();

// Funzione per gestire la registrazione
const handleRegister = async () => {
  if (!username.value || !email.value || !password.value) {
    alert('Tutti i campi sono obbligatori!');
    return;
  }
  try {
    // Chiamata API per registrazione
    const response = await api.post('/auth/register', { username: username.value, email: email.value, password: password.value });
    // Salva token JWT in localStorage
    const token = response.data.token;
    const userObj = response.data.user;
    localStorage.setItem('token', token);
    if (userObj) {
      localStorage.setItem('user', JSON.stringify(userObj));
    }
    currentToken.value = token;
    alert('Registrazione avvenuta con successo!');
    // Redirect 
    router.push('/');
  } catch (error) {
    // Gestione errori
    console.error('Errore durante la registrazione:', error);
    let msg = 'Registrazione fallita. Riprova.';
    if (error.response && error.response.data && error.response.data.message) {
      msg = error.response.data.message;
    }
    alert(msg);
  }
}
</script>