<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <router-link class="navbar-brand" to="/">Folklore Archive</router-link>
      <div class="navbar-nav ms-auto">
        <router-link class="nav-link text-white" to="/login">Login</router-link>
        <router-link class="nav-link text-white" to="/new">Aggiungi leggenda</router-link>
      </div>
    </nav>
    <main class="container mt-4">
      <router-view/>
    </main>
  </div>
</template>