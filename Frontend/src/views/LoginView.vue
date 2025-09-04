<template>
  <!-- Form di login utente -->
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
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
      <button class="btn btn-primary">Accedi</button>
    </form>
  </div>
</template>

<script setup>
// Importa funzioni reattive da Vue
import { ref } from 'vue';
// Importa API per chiamate backend
import api from '../api';
// Importa router per navigazione
import router from '@/router';

// Stato email utente
const email = ref('');
// Stato password utente
const password = ref('');

// Funzione per gestire il login
const handleLogin = async () => {
  try {
    // Chiamata API per login
    const response = await api.post('/auth/login', { email: email.value, password: password.value });
    // Salva token JWT in localStorage
    const token = response.data.token;
    // Salva oggetto utente in localStorage
    const userObj = response.data.user; // Assicurati che il backend restituisca l'utente
    localStorage.setItem('token', token);
    if (userObj) {
      localStorage.setItem('user', JSON.stringify(userObj));
    }
    // Feedback utente e redirect
    alert('Login effettuato!');
    router.push('/');
  } catch (error) {
    // Gestione errori
    console.error('Errore durante il login:', error);
    alert('Login fallito. Riprova.');
  }
}
</script>