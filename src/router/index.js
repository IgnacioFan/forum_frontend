import Vue from 'vue'
import VueRouter from 'vue-router'
import SignIn from '../views/SignIn.vue'
import Restaurants from '../views/Restaurants.vue'
import NotFound from '../views/NotFound.vue'
import store from '../store'

Vue.use(VueRouter)

const AuthorizeIsAdmin = (to, from, next) => {
  const currentUser = store.state.currentUser;
  if(currentUser && !currentUser.isAdmin) return next('/404');
  next();
}

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/signin'
  },
  {
    path: '/admin',
    exact: true,
    redirect: '/admin/restaurants',
    beforeEnter: AuthorizeIsAdmin
  },
  {
    path: '/admin/restaurants',
    name: 'admin-restaurants',
    component: () => import('../views/AdminRestaurants.vue'),
    beforeEnter: AuthorizeIsAdmin
  },
  {
    path: '/admin/restaurants/new',
    name: 'admin-restaurants-new',
    component: () => import('../views/AdminRestaurantNew.vue'),
    beforeEnter: AuthorizeIsAdmin
  },
  {
    path: '/admin/restaurants/:id',
    name: 'admin-restaurant',
    component: () => import('../views/AdminRestaurant.vue'),
    beforeEnter: AuthorizeIsAdmin
  },
  {
    path: '/admin/restaurants/:id/edit',
    name: 'admin-restaurants-edit',
    component: () => import('../views/AdminRestaurantEdit.vue'),
    beforeEnter: AuthorizeIsAdmin
  },
  {
    path: '/admin/categories',
    name: 'admin-categories',
    component: () => import('../views/AdminCategories.vue'),
    beforeEnter: AuthorizeIsAdmin
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue'),
    beforeEnter: AuthorizeIsAdmin
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
    path: '/restaurants/:id',
    name: 'restaurant',
    component: () => import('../views/Restaurant.vue')
  },
  {
    path: '/restaurants/:id/dashboard',
    name: 'restaurant-dashboard',
    component: () => import('../views/RestaurantDashboard.vue')
  },
  {
    path: '/users/populars',
    name: 'popular-writers',
    component: () => import('../views/PopularWriters.vue')
  },
  {
    path: '/users/:id',
    name: 'user-profile',
    component: () => import('../views/User.vue')
  },
  {
    path: '/users/:id/edit',
    name: 'user-profile-edit',
    component: () => import('../views/UserEdit.vue')
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  }
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach(async (to, from, next) => {
  // get token from client
  const tokenInLocalStorage = localStorage.getItem('token');
  const tokenInStore = store.state.token;
  let isAuthenticated = store.state.isAuthenticated;

  // fetch once
  if(tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser');
  }
  // these pages don't need token
  const pathWithoutAuthentication = ["sign-in", "sign-up"];
  // token is invalid, then redirect to signin page
  if(!isAuthenticated && !pathWithoutAuthentication.includes(to.name)) {
    next('/signin');
    return;
  }
  // token is valid, then reidrect to restaurants page
  if(isAuthenticated && pathWithoutAuthentication.includes(to.name)) {
    next('/restaurants');
    return;
  }
  next();
});

export default router
