import { createRouter, createWebHistory } from 'vue-router'
import Auth from '../components/Auth.vue'
import Objectmain from '../views/ObjectMain.vue'
import ProjectList from '../views/ProjectList.vue'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/auth',
      name: 'Auth',
      component: Auth
    },
    {
      path: '/objectmain',
      name: 'Objectmain',
      component: Objectmain
    },
    {
      path: '/projectlist',
      name: 'projectlist',
      component: ProjectList
    }
  ]
})

// router.beforeEach((to) => {
//   if (to.meta.requiresAuth && localStorage.getItem("token") == null) {
//     return { name: "Auth" };
//   }
// })

export default router
