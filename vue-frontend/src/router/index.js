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
    path: '/signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (signup.js) for this route
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/new-post',
    name: 'New-Post',
    component: () => import('../views/New-Post.vue')
  },
  {
    path: '/modify-post/:id',
    name: 'Modify-Post',
    component: () => import('../views/Modify-Post.vue')
  },
  {
    path: '/team',
    name: 'Team',
    component: () => import('../views/Team.vue')
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: () => import('../views/Profile.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router