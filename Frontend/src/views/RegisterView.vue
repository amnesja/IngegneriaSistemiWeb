<template>
  <div>
    <h2>Registrazione</h2>
    <form @submit.prevent="handleRegister">
       <div class="mb-3">
         <label>Username</label>
         <input v-model="username" type="text" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control" required />
      </div>
      <button class="btn btn-success">Registrati</button>
    </form>
    <div class="mt-3">
      <button class="btn btn-secondary" @click="logout">Logout</button>
      <div class="mt-2">
        <strong>Token attuale:</strong>
        <pre>{{ currentToken }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../api';

const username = ref('');
const email = ref('');
const password = ref('');
const currentToken = ref(localStorage.getItem('token') || '');

const handleRegister = async () => {
  if (!username.value || !email.value || !password.value) {
    alert('Tutti i campi sono obbligatori!');
    return;
  }
  try {
    const response = await api.post('/auth/register', { username: username.value, email: email.value, password: password.value });
    const token = response.data.token;
    localStorage.setItem('token', token);
    currentToken.value = token;
    alert('Registrazione avvenuta con successo!');
  } catch (error) {
    console.error('Errore durante la registrazione:', error);
    let msg = 'Registrazione fallita. Riprova.';
    if (error.response && error.response.data && error.response.data.message) {
      msg = error.response.data.message;
    }
    alert(msg);
  }
}

const logout = () => {
  localStorage.removeItem('token');
  currentToken.value = '';
  alert('Logout effettuato!');
}
</script>