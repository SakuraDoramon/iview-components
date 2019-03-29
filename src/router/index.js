import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('views/home.vue')
    },
    {
      path: '/edit_table',
      name: 'edit_table',
      component: () => import('views/edit-table.vue')
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('views/form.vue')
    }
  ]
})
