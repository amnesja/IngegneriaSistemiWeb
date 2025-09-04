<template>
  <!-- Container principale della pagina -->
  <div class="container my-4">
    <!-- Titolo -->
    <h2 class="mb-4 text-primary">📚 Leggende popolari</h2>

    <!-- Barra di ricerca -->
    <div class="mb-3">
      <input v-model="search" class="form-control" placeholder="Cerca per titolo, autore o luogo..." />
    </div>

    <!-- Spinner di caricamento -->
    <div v-if="loading" class="text-center my-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Caricamento...</span>
      </div>
      <p class="mt-2">Caricamento...</p>
    </div>

    <!-- Messaggio se nessuna leggenda trovata -->
    <div v-else-if="filteredLegends.length === 0" class="alert alert-warning">
      Nessuna leggenda trovata.
    </div>

    <!-- Griglia delle leggende -->
    <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4 align-items-start">
      <!-- Ciclo sulle leggende filtrate -->
      <div class="col" v-for="legend in filteredLegends" :key="legend._id">
        <!-- Card leggenda, evidenziata se appena commentata -->
        <div class="card shadow-sm w-100 rounded-4"
             :class="{ 'card-active': activeLegendId === legend._id }">
          <div class="card-body">
            <!-- Titolo leggenda -->
            <h5 class="card-title d-flex align-items-center">
              <span class="me-2"><i class="bi bi-book"></i></span> {{ legend.title }}
            </h5>
            <!-- Descrizione leggenda -->
            <p class="card-text">{{ legend.description }}</p>
          </div>
          <!-- Footer con badge luogo e autore -->
          <div class="card-footer d-flex flex-wrap gap-2 justify-content-between align-items-center small">
            <span v-if="legend.location" class="badge bg-info text-dark"><i class="bi bi-geo-alt"></i> {{ legend.location }}</span>
            <span v-if="legend.user" class="badge bg-primary"><i class="bi bi-person"></i> {{ legend.user.username }}</span>
          </div>
          <!-- Sezione commenti -->
          <div class="px-3 pb-3">
            <!-- Lista commenti -->
            <div v-if="comments[legend._id] && comments[legend._id].length">
              <h6 class="mt-3 mb-2">Commenti:</h6>
              <ul class="list-group mb-2">
                <!-- Ciclo sui commenti -->
                <li v-for="comment in comments[legend._id]" :key="comment._id" class="list-group-item d-flex justify-content-between align-items-center">
                  <span>
                    <!-- Mostra autore o 'Anonimo' -->
                    <strong>{{ comment.author?.username || 'Anonimo' }}:</strong> {{ comment.text }}
                  </span>
                  <!-- Pulsante elimina visibile solo all'autore -->
                  <button v-if="user && comment.author && user._id === comment.author._id" @click="handleDeleteComment(comment._id, legend._id)" class="btn btn-sm btn-outline-danger ms-2">Elimina</button>
                </li>
              </ul>
            </div>
            <!-- Messaggio se nessun commento -->
            <div v-else class="text-muted small mb-2">Nessun commento.</div>
            <!-- Form per aggiungere nuovo commento -->
            <div v-if="user">
              <input v-model="newComment[legend._id]" class="form-control form-control-sm mb-2" placeholder="Scrivi un commento..." />
              <button @click="handleAddComment(legend._id)" class="btn btn-sm btn-primary">Aggiungi commento</button>
            </div>
            <!-- Messaggio se non autenticato -->
            <div v-else class="text-muted small">Effettua il login per commentare.</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Importa funzioni reattive da Vue
import { ref, computed, onMounted } from 'vue'
// Importa API e funzioni commenti
import api, { fetchComments, addComment, deleteComment } from '../api'

// Stato leggende
const legends = ref([])
// Stato caricamento
const loading = ref(true)
// Stato barra di ricerca
const search = ref('')
// Stato commenti per ogni leggenda
const comments = ref({})
// Stato nuovo commento per ogni leggenda
const newComment = ref({})
// Stato utente autenticato
const user = ref(null)
// ID della leggenda appena commentata (per evidenziare)
const activeLegendId = ref(null)

// Recupera utente dal localStorage (se autenticato) e carica leggende
onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) user.value = JSON.parse(storedUser)
  fetchLegends()
})

// Computed per filtrare le leggende in base alla ricerca
const filteredLegends = computed(() => {
  if (!search.value) return legends.value
  const s = search.value.toLowerCase()
  return legends.value.filter(l =>
    l.title?.toLowerCase().includes(s) ||
    l.location?.toLowerCase().includes(s) ||
    l.user?.username?.toLowerCase().includes(s)
  )
})

// Funzione per caricare tutte le leggende e i relativi commenti
const fetchLegends = async () => {
  try {
    const response = await api.get('/legends')
    legends.value = response.data
    // Carica commenti per ogni leggenda
    for (const legend of legends.value) {
      await loadComments(legend._id)
    }
  } catch (err) {
    console.error('Errore nel caricamento delle leggende:', err)
    legends.value = []
  } finally {
    loading.value = false
  }
}

// Funzione per caricare i commenti di una leggenda
const loadComments = async (legendId) => {
  try {
    const res = await fetchComments(legendId)
    comments.value[legendId] = res.data
  } catch (err) {
    comments.value[legendId] = []
  }
}

// Funzione per aggiungere un commento
const handleAddComment = async (legendId) => {
  if (!newComment.value[legendId]) return
  try {
    const token = localStorage.getItem('token')
    await addComment(legendId, { text: newComment.value[legendId] }, token)
    newComment.value[legendId] = ''
    await loadComments(legendId)
    activeLegendId.value = legendId // evidenzia la card aggiornata
    setTimeout(() => { activeLegendId.value = null }, 2000) // rimuovi evidenza dopo 2s
  } catch (err) {
    alert('Errore nell\'aggiunta del commento')
  }
}

// Funzione per eliminare un commento
const handleDeleteComment = async (commentId, legendId) => {
  try {
    const token = localStorage.getItem('token')
    await deleteComment(commentId, token)
    await loadComments(legendId)
  } catch (err) {
    alert('Errore nell\'eliminazione del commento')
  }
}
</script>

<style scoped>
/* Stile card leggenda */
.card {
  transition: box-shadow 0.2s, transform 0.2s;
}
.card:hover {
  box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.15);
  transform: translateY(-2px) scale(1.01);
}
/* Badge */
.badge {
  font-size: 0.95em;
  padding: 0.5em 0.8em;
}
/* Evidenzia card appena commentata */
.card-active {
  box-shadow: 0 0 0 4px #0d6efd55;
  border: 2px solid #0d6efd;
  transition: box-shadow 0.3s, border 0.3s;
}
</style>
