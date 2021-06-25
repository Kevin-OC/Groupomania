import { createRouter, createWebHistory } from 'vue-router'
import Connection from '../views/Connection.vue'

const routes = [
  {
    path: '/',
    redirect: '/login',
    name: 'Connection',
    component: Connection
  },
  {
    path: '/signin',
    name: 'Sign in',
    // route level code-splitting
    // this generates a separate chunk (signup.js) for this route
    component: () => import('../views/Signin.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
