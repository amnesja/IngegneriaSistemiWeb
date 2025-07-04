<template>
  <div class="container my-4">
    <h2 class="mb-4 text-primary">📚 Leggende popolari</h2>

    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Caricamento...</span>
      </div>
      <p class="mt-2">Caricamento...</p>
    </div>

    <div v-else-if="legends.length === 0" class="alert alert-warning">
      Nessuna leggenda trovata.
    </div>

    <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      <div class="col" v-for="legend in legends" :key="legend._id">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ legend.title }}</h5>
            <p class="card-text">{{ legend.description }}</p>
          </div>
          <div class="card-footer text-muted small">
            <div v-if="legend.location">📍 {{ legend.location }}</div>
            <div v-if="legend.user">👤 {{ legend.user.username }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../api'

const legends = ref([])
const loading = ref(true)

const fetchLegends = async () => {
  try {
    const response = await api.get('/legends')
    legends.value = response.data
  } catch (err) {
    console.error('Errore nel caricamento delle leggende:', err)
    legends.value = []
  } finally {
    loading.value = false
  }
}

onMounted(fetchLegends)
</script>
