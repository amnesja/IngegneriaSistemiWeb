<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div class="mb-3">
        <label>Email</label>
        <input v-model="email" type="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label>Password</label>
        <input v-model="password" type="password" class="form-control" required />
      </div>
      <button class="btn btn-primary">Accedi</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import api from '../api';

const email = ref('');
const password = ref('');

const handleLogin = async () => {
  try {
    const response = await api.post('/auth/login', { email: email.value, password: password.value });
    const token = response.data.token;
    localStorage.setItem('token', token);
    alert('Login effettuato!');
  } catch (error) {
    console.error('Errore durante il login:', error);
    alert('Login fallito. Riprova.');
  }
}
</script>