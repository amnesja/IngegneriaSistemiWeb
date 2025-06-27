import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import LegendForm from '../views/LegendForm.vue'

const routes = [
    {path: '/', name: 'home', component: HomeView},
    {path: '/login', name: 'login', component: LoginView},
    {path: '/new', name: 'newLegend', component: LegendForm}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router