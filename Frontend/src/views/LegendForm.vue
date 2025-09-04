<template>
  <!-- Form per aggiungere una nuova leggenda -->
  <div>
    <h2>Aggiungi una leggenda</h2>
    <form @submit.prevent="submitLegend">
      <!-- Campo titolo -->
      <div class="mb-3">
        <label for="title" class="form-label">Titolo</label>
        <input v-model="title" id="title" class="form-control" required />
      </div>
      <!-- Campo descrizione -->
      <div class="mb-3">
        <label for="description" class="form-label">Descrizione</label>
        <textarea v-model="description" id="description" class="form-control" rows="5" required></textarea>
      </div>
      <!-- Campo luogo -->
      <div class="mb-3">
        <label for="location" class="form-label">Luogo</label>
        <input v-model="location" id="location" class="form-control" />
      </div>
      <!-- Pulsante submit -->
      <button type="submit" class="btn btn-success">Salva leggenda</button>
    </form>
  </div>
</template>

<script setup>
// Importa funzioni reattive da Vue
import { ref } from 'vue'
// Importa API per chiamate backend
import api from '../api'
// Importa router per navigazione
import { useRouter } from 'vue-router'

// Stato titolo leggenda
const title = ref('')
// Stato descrizione leggenda
const description = ref('')
// Stato luogo leggenda
const location = ref('')
// Ottieni istanza router
const router = useRouter();

// Funzione per inviare la leggenda al backend
const submitLegend = async () => {
  // Recupera token utente
  const token = localStorage.getItem('token')
  try {
    // Chiamata API per creare leggenda
    await api.post('/legends', {
      title: title.value,
      description: description.value,
      location: location.value
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    // Feedback utente e redirect
    alert('Leggenda salvata!')
    router.push('/');
  } catch (err) {
    // Gestione errori
    if (err.response && err.response.data && err.response.data.message) {
      alert('Errore: ' + err.response.data.message)
    } else {
      alert('Errore durante il salvataggio')
    }
    console.error(err)
  }
}
</script>
