<script setup>
// Importa funzioni reattive e lifecycle da Vue
import { ref, onMounted } from 'vue'
// Importa il router per la navigazione
import { useRouter } from 'vue-router'

// Ottieni istanza router
const router = useRouter()
// Stato per verificare se l'utente è loggato
const isLoggedIn = ref(false)

// Aggiorna lo stato login al mount e su cambiamenti localStorage
onMounted(() => {
  isLoggedIn.value = !!localStorage.getItem('token')
  window.addEventListener('storage', () => {
    isLoggedIn.value = !!localStorage.getItem('token')
  })
})

// Aggiorna lo stato login dopo ogni navigazione
router.afterEach(() => {
  isLoggedIn.value = !!localStorage.getItem('token')
})

// Funzione di logout: rimuove token e reindirizza
const logout = () => {
  localStorage.removeItem('token')
  isLoggedIn.value = false
  router.push('/login')
}
</script>

<template>
  <div>
    <!-- Navbar principale -->
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <!-- Link al titolo/home -->
      <router-link class="navbar-brand" to="/">🌌 Folklore Archive</router-link>

      <!-- Bottone per menu mobile -->
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
        aria-controls="navbarContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Menu di navigazione -->
      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav ms-auto">
          <!-- Link login e registrazione se non loggato -->
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link class="nav-link text-white" to="/login">🔑 Login</router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link class="nav-link text-white" to="/register">📝 Registrazione</router-link>
          </li>
          <!-- Link profilo e aggiungi leggenda se loggato -->
          <li v-if="isLoggedIn" class="nav-item">
            <router-link class="nav-link text-white" to="/profile">👤 Profilo</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <router-link class="nav-link text-white" to="/new">➕ Aggiungi leggenda</router-link>
          </li>
          <!-- Pulsante logout se loggato -->
          <li v-if="isLoggedIn" class="nav-item">
            <button class="btn btn-sm btn-outline-light ms-2" @click="logout">🚪 Logout</button>
          </li>
        </ul>
      </div>
    </nav>

    <!-- Contenuto principale: router-view -->
    <main class="container mt-4">
      <router-view/>
    </main>
  </div>
</template>
