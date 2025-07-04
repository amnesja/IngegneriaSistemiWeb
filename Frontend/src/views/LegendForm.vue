<template>
  <div>
    <h2>Aggiungi una leggenda</h2>
    <form @submit.prevent="submitLegend">
      <div class="mb-3">
        <label for="title" class="form-label">Titolo</label>
        <input v-model="title" id="title" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="description" class="form-label">Descrizione</label>
        <textarea v-model="description" id="description" class="form-control" rows="5" required></textarea>
      </div>
      <div class="mb-3">
        <label for="location" class="form-label">Luogo</label>
        <input v-model="location" id="location" class="form-control" />
      </div>
      <button type="submit" class="btn btn-success">Salva leggenda</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import api from '../api'

const title = ref('')
const description = ref('')
const location = ref('')

const submitLegend = async () => {
  const token = localStorage.getItem('token')
  try {
    await api.post('/legends', {
      title: title.value,
      description: description.value,
      location: location.value
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    alert('Leggenda salvata!')
  } catch (err) {
    if (err.response && err.response.data && err.response.data.message) {
      alert('Errore: ' + err.response.data.message)
    } else {
      alert('Errore durante il salvataggio')
    }
    console.error(err)
  }
}
</script>
