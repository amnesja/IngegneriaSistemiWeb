<template>
  <!-- Pagina profilo utente -->
  <div>
    <h2>Profilo utente</h2>
    <form @submit.prevent="updateProfile" autocomplete="off">
      <!-- Campo username -->
      <div class="mb-3">
        <label>Username</label>
        <input v-model="username" class="form-control" required />
      </div>
      <!-- Campo email -->
      <div class="mb-3">
        <label>Email</label>
        <input v-model="email" class="form-control" required />
      </div>
      <!-- Campo nuova password -->
      <div class="mb-3">
        <label>Nuova password</label>
        <input v-model="password" type="password" class="form-control" placeholder="Lascia vuoto per non cambiare" />
      </div>
      <!-- Pulsanti salva e elimina account -->
      <button class="btn btn-primary" type="submit">Salva modifiche</button>
      <button class="btn btn-danger ms-2" @click.prevent="deleteProfile">Elimina account</button>
      <div class="mt-4">
       <h4>Le tue leggende</h4>
        <!-- Lista leggende utente -->
        <ul v-if="userLegends.length > 0" class="list-group">
         <li v-for="legend in userLegends" :key="legend._id" class="list-group-item">
          <strong>{{ legend.title }}</strong><br>
          <span>{{ legend.description }}</span>
          <!-- Pulsanti modifica ed elimina leggenda -->
          <button class="btn btn-primary btn-sm ms-2" type="button" @click="startEditLegend(legend)">Modifica</button>
          <button class="btn btn-danger btn-sm ms-2" type="button" @click="deleteLegend(legend._id)">Elimina</button>
         </li>
        </ul>
        <div v-else>Nessuna leggenda caricata.</div>
        <!-- Form modifica leggenda -->
        <div v-if="legendInEdit" class="mt-3">
          <h5>Modifica leggenda</h5>
          <input v-model="editTitle" class="form-control mb-2" placeholder="Titolo" />
          <textarea v-model="editDescription" class="form-control mb-2" placeholder="Descrizione"></textarea>
          <input v-model="editLocation" class="form-control mb-2" placeholder="Luogo" />
          <button class="btn btn-success btn-sm" type="button" @click="saveEditLegend">Salva</button>
          <button class="btn btn-secondary btn-sm ms-2" type="button" @click="cancelEdit">Annulla</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
// Importa funzioni reattive e lifecycle da Vue
import { ref, onMounted } from 'vue'
// Importa API per chiamate backend
import api from '../api'

// Stato campi profilo
const username = ref('')
const email = ref('')
const password = ref('')

// Funzione per caricare dati profilo utente
const fetchProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await api.get('/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    username.value = response.data.username
    email.value = response.data.email
  } catch (err) {
    alert('Errore nel caricamento del profilo')
  }
}

// Funzione per aggiornare profilo utente
const updateProfile = async () => {
  try {
    const token = localStorage.getItem('token')
    await api.put('/profile', {
      username: username.value,
      email: email.value,
      password: password.value
    }, {
      headers: { Authorization: `Bearer ${token}` }
    })
    alert('Profilo aggiornato!')
    password.value = ''
  } catch (err) {
    alert('Errore durante l\'aggiornamento')
  }
}

// Funzione per eliminare profilo utente
const deleteProfile = async () => {
  if (!confirm('Sei sicuro di voler eliminare il tuo account?')) return
  try {
    const token = localStorage.getItem('token')
    await api.delete('/profile', {
      headers: { Authorization: `Bearer ${token}` }
    })
    alert('Account eliminato!')
    localStorage.removeItem('token')
    // Qui puoi reindirizzare alla home o al login
  } catch (err) {
    alert('Errore durante l\'eliminazione')
  }
}

// Stato leggende utente
const userLegends = ref([]);
// Funzione per caricare leggende utente
const fetchUserLegends = async () => {
  try {
    const token = localStorage.getItem('token')
    const response = await api.get('/profile/legends', {
      headers: { Authorization: `Bearer ${token}` }
    })
    userLegends.value = response.data
  } catch (err) {
    alert('Errore nel caricamento delle leggende')
  }
}

// Funzione per eliminare una leggenda
const deleteLegend = async (id) => {
  if (!confirm('Sei sicuro di voler eliminare questa leggenda?')) return
  try {
    const token = localStorage.getItem('token')
    await api.delete(`/legends/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    alert('Leggenda eliminata!')
    fetchUserLegends() // Ricarica le leggende dopo l'eliminazione
  } catch (err) {
    alert('Errore durante l\'eliminazione della leggenda')
  }
}

// Stato e funzioni per modifica leggenda
const legendInEdit = ref(null);
const editTitle = ref('');
const editDescription = ref('');
const editLocation = ref('');

// Avvia la modifica di una leggenda
const startEditLegend = (legend) => {
  legendInEdit.value = legend;
  editTitle.value = legend.title;
  editDescription.value = legend.description;
  editLocation.value = legend.location || '';
};

// Annulla la modifica leggenda
const cancelEdit = () => {
  legendInEdit.value = null;
  editTitle.value = '';
  editDescription.value = '';
  editLocation.value = '';
};

// Salva la leggenda modificata
const saveEditLegend = async () => {
  if (!editTitle.value || !editDescription.value) {
    alert('Titolo e descrizione sono obbligatori!');
    return;
  }
  try {
    const token = localStorage.getItem('token');
    await api.put(`/legends/${legendInEdit.value._id}`, {
      title: editTitle.value,
      description: editDescription.value,
      location: editLocation.value
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    alert('Leggenda aggiornata!');
    fetchUserLegends();
    cancelEdit();
  } catch (err) {
    alert('Errore durante l\'aggiornamento della leggenda');
  }
};

// Carica profilo e leggende al mount della pagina
onMounted(() => {
  fetchProfile();
  fetchUserLegends();
})
</script>