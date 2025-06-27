<template>
  <div>
    <h2>Aggiungi una leggenda</h2>
    <form @submit.prevent="submitForm">
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

const title = ref('')
const description = ref('')
const location = ref('')

const submitForm = () => {
  console.log('Invio leggenda:', {
    title: title.value,
    description: description.value,
    location: location.value
  })
  // Qui in seguito metterai la chiamata POST via Axios al backend
}
</script>
