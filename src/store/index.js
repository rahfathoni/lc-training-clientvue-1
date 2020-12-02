import Vue from 'vue'
import Vuex from 'vuex'
import server from '../api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    foods: [],
    bestFoods: []
  },
  mutations: {
    SET_FOODS (state, payload) {
      state.foods = payload
    },
    SET_CART (state, payload) {
      state.cart = payload
    },
    SET_BESTFOODS (state, payload) {
      state.bestFoods = payload
    }
  },
  actions: {
    readInitialData (store, payload) {
      return server.get('/products')
        .then(({ data }) => {
          store.commit('SET_FOODS', Object.values(data))
          return server.get('/best-products')
        })
        .then(({ data }) => {
          store.commit('SET_BESTFOODS', Object.values(data))
          return server.get('/keranjangs')
        })
        .then(({ data }) => {
          console.log(data)
          store.commit('SET_CART', Object.values(data))
        })
        .catch(err => {
          console.log(err)
        })
    },
    addOrder (store, payload) {
      return server.post('/keranjangs', payload)
        .then(({ data }) => {
          const cart = store.state.cart
          console.log('masukk')
          console.log(data)
          cart.push(payload)
          store.commit('SET_CART', cart)
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteItem (store, payload) {
      const cart = store.state.cart
      for (let i = 0; i < cart.length; i++) {
        if (cart[i].id === payload) {
          cart.splice(i, 1)
          break
        }
      }
      return store.commit('SET_CART', cart)
    },
    resetCart (store) {
      return store.commit('SET_CART', [])
    }
  },
  modules: {
  }
})
