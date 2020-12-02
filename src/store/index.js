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
          store.commit('SET_CART', Object.values(data))
        })
        .catch(err => {
          console.log(err)
        })
    },
    addOrder (store, payload) {
      return server.post('/keranjangs', payload)
        .then(() => {
          return server.get('/keranjangs')
        })
        .then(({ data }) => {
          store.commit('SET_CART', Object.values(data))
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateItem (store, payload) {
      return server.put(`/keranjangs/${payload.id}`, payload)
        .then(() => {
          return server.get('/keranjangs')
        })
        .then(({ data }) => {
          store.commit('SET_CART', Object.values(data))
        })
        .catch(err => {
          console.log(err)
        })
    },
    deleteItem (store, payload) {
      return server.delete(`/keranjangs/${payload}`)
        .then(() => {
          const cart = store.state.cart
          for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === payload) {
              cart.splice(i, 1)
              break
            }
          }
          store.commit('SET_CART', cart)
        })
        .catch(err => {
          console.log(err)
        })
    },
    checkoutCart (store, payload) {
      return server.post('/pesanans', payload)
        .then(() => {
          store.dispatch('resetCart')
        })
        .catch(err => {
          console.log(err)
        })
    },
    deletePerItem (store, payload) {
      return server.delete(`/keranjangs/${payload}`)
        .then(() => {
        })
        .catch(err => {
          console.log(err)
        })
    },
    resetCart (store) {
      const cart = store.state.cart
      for (let i = 0; i < cart.length; i++) {
        store.dispatch('deletePerItem', cart[i].id)
      }
      return store.commit('SET_CART', [])
    }
  },
  modules: {
  }
})
