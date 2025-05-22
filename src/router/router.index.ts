import { createRouter, createWebHistory } from 'vue-router'
import UserList from '@/views/UserList.vue'
import UserForm from '@/views/UserForm.vue'
import UserDetails from '@/views/UserDetails.vue'

const routes = [
  { path: '/', redirect: '/users' },
  { path: '/users', component: UserList },
  { path: '/users/new', component: UserForm },
  { path: '/users/:id', component: UserDetails, props: true },
  { path: '/users/:id/edit', component: UserForm, props: true },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
