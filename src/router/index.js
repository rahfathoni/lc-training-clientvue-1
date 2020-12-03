import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Foods from '../views/Foods.vue'
import FoodOrder from '../views/FoodOrder.vue'
import Cart from '../views/Cart.vue'
import Success from '../views/Success.vue'
import Landing from '../views/Landing.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/foods',
    name: 'Foods',
    component: Foods
  },
  {
    path: '/foods/:foodId',
    name: 'FoodOrder',
    component: FoodOrder
  },
  {
    path: '/keranjang',
    name: 'Cart',
    component: Cart
  },
  {
    path: '/pesanan-sukses',
    name: 'Success',
    component: Success
  },
  {
    path: '/landing',
    name: 'Landing',
    component: Landing
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
