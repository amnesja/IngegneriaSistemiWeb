<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <router-link class="navbar-brand" to="/">🌌 Folklore Archive</router-link>

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

      <div class="collapse navbar-collapse" id="navbarContent">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/login">🔑 Login</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/profile">👤 Profilo</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/register">📝 Registrazione</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link text-white" to="/new">➕ Aggiungi leggenda</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <main class="container mt-4">
      <router-view/>
    </main>
  </div>
</template>

