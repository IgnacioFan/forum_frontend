import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../views/SignIn.vue'
import Restaurants from '../views/Restaurants.vue'
import NotFound from '../views/NotFound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/restaurants'
  },
  {
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/restaurants',
    name: 'restaurants',
    component: Restaurants
  },
  {
    path: '/restaurants/top',
    name: 'top-restaurants',
    component: () => import('../views/TopRestaurants.vue')
  },
  {
    path: '/restaurants/feeds',
    name: 'restaurant-feeds',
    component: () => import('../views/Feeds.vue')
  },
  {
    path: '/users/popular',
    name: 'popular-writers',
    component: () => import('../views/PopularWriters.vue')
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
