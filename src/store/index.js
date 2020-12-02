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
      return server.get('/foods')
        .then(({ data }) => {
          store.commit('SET_FOODS', Object.values(data))
          return server.get('/bestFoods')
        })
        .then(({ data }) => {
          store.commit('SET_BESTFOODS', Object.values(data))
        })
        .catch(err => {
          return console.log(err)
        })
    },
    addOrder (store, payload) {
      const cart = store.state.cart
      if (cart.length === 0) {
        payload.id = 1
      } else {
        const lastId = cart[cart.length - 1].id
        payload.id = lastId + 1
      }
      cart.push(payload)
      return store.commit('SET_CART', cart)
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
