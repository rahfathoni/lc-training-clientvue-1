<template>
  <div class="pt-4">
    <div class="row">
      <div class="col text-left">
        <h5 class=" font-weight-normal"><router-link class="text-dark" to="/">Home</router-link> / <router-link class="text-dark" to="/foods">Foods</router-link> / <span class=" font-weight-bold">Food Order</span></h5>
      </div>
    </div>
    <div class="row mt-3">
      <div class="col-6">
        <img v-if="datum.name !== ''" :alt="datum.image" :src="getImage(datum.image)"
      class="big-img-cust shadow">
      </div>
        <div v-if="datum.name !== ''" class="col-6 text-left">
        <h1>{{datum.name}}</h1>
        <hr />
        <h2 class=" font-weight-light">Harga <span class=" font-weight-bold">Rp. {{datum.price}}</span></h2>
        <br />
        <form @submit.prevent="orderFood">
          <div class="form-group">
            <h5 for="amount" class=" font-weight-light pb-2">Jumlah Pesan</h5>
            <input id="amount" type="number" class="form-control" v-model="order.amount" min="1" required>
          </div>
          <div class="form-group">
            <h5 for="note" class=" font-weight-light pb-2">Keterangan</h5>
            <textarea id="note" class="form-control" placeholder="seperti: pedas, nasi setengah..." v-model="order.note" />
          </div>
          <br />
          <button type="submit" class="btn btn-cust btn-cust:hover"><b-icon-cart /> Pesan</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'FoodOrder',
  data () {
    return {
      datum: {
        name: '',
        price: 0,
        image: ''
      },
      order: {
        amount: '',
        totalPrice: 0,
        note: ''
      }
    }
  },
  computed: {
    ...mapState(['foods'])
  },
  methods: {
    ...mapActions(['readInitialFoods', 'addOrder']),
    getImage (img) {
      return require('../assets/' + img)
    },
    async reload () {
      await this.readInitialFoods()
      this.readFoodDetail()
    },
    readFoodDetail () {
      for (let i = 0; i < this.foods.length; i++) {
        if (parseInt(this.$route.params.foodId) === this.foods[i].id) {
          this.datum = this.foods[i]
          break
        }
      }
    },
    async orderFood () {
      await this.calculatePrice()
      await this.addOrder({
        name: this.datum.name,
        price: this.datum.price,
        image: this.datum.image,
        amount: this.order.amount,
        totalPrice: this.order.totalPrice,
        note: this.order.note
      })
      await this.$toast.open({
        message: 'Sukses Masuk Keranjang',
        type: 'success',
        duration: 3500,
        position: 'top-right'
      })
      this.order.totalPrice = 0
      this.order.amount = ''
      this.order.note = ''
      this.$router.push('/keranjang')
    },
    calculatePrice () {
      this.order.totalPrice = this.datum.price * this.order.amount
      if (this.order.note === '') {
        this.order.note = '-'
      }
    }
  },
  created () {
    if (this.foods.length === 0) {
      this.reload()
    } else {
      this.readFoodDetail()
    }
  }
}
</script>

<style>

</style>
