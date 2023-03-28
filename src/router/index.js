import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../components/Auth.vue'
import About from '../views/AboutView.vue'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView
    // },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})

// router.beforeEach((to) => {
//   if (to.meta.requiresAuth && localStorage.getItem("token") == null) {
//     return { name: "Auth" };
//   }
// })

export default router
