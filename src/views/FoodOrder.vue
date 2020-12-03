<template>
  <div class="pt-4 pb-3">
    <div class="row">
      <div class="col text-left">
        <h5 class=" font-weight-normal"><router-link class="text-dark" to="/">Home</router-link> / <router-link class="text-dark" to="/foods">Foods</router-link> / <span class=" font-weight-bold">Food Order</span></h5>
      </div>
    </div>
    <div class="row mt-3" v-if="datum !== ''">
      <div class="col-md-6">
        <img v-if="datum.nama !== ''" :alt="datum.gambar" :src="getImage(datum.gambar)"
      class="big-img-cust shadow">
      </div>
      <div v-if="datum.nama !== ''" class="col-md-6 text-left">
        <h1>{{datum.nama}}</h1>
        <hr />
        <h2 class=" font-weight-light pb-1">Harga <span class=" font-weight-bold">Rp. {{datum.harga}}</span></h2>
        <form @submit.prevent="orderFood">
          <div class="form-group">
            <h5 for="jumlah_pemesanan" class=" font-weight-light pb-2">Jumlah Pesan</h5>
            <input id="jumlah_pemesanan" type="number" class="form-control" v-model="order.jumlah_pemesanan" min="1" required>
          </div>
          <div class="form-group mb-0 pb-0">
            <h5 for="keterangan" class=" font-weight-light pb-2">Keterangan</h5>
            <textarea id="keterangan" class="form-control" placeholder="seperti: pedas, nasi setengah..." v-model="order.keterangan" />
          </div>
          <br />
          <div class="form-group">
            <h5 class=" font-weight-light pt-0">Total Harga : <span class=" font-weight-bold">Rp. {{order.jumlah_pemesanan * datum.harga}}</span></h5>
          </div>
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
      datum: '',
      order: {
        jumlah_pemesanan: '',
        keterangan: ''
      }
    }
  },
  computed: {
    ...mapState(['foods'])
  },
  methods: {
    ...mapActions(['readInitialData', 'addOrder']),
    getImage (img) {
      return require('../assets/' + img)
    },
    async reload () {
      await this.readInitialData()
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
      await this.addOrder({
        jumlah_pemesanan: parseInt(this.order.jumlah_pemesanan),
        keterangan: this.order.keterangan || '-',
        products: {
          ...this.datum,
          harga: parseInt(this.datum.harga)
        }
      })
      await this.$toast.open({
        message: 'Sukses Masuk Keranjang',
        type: 'success',
        duration: 3500,
        position: 'top-right'
      })
      this.order.jumlah_pemesanan = ''
      this.order.keterangan = ''
      this.$router.push('/keranjang')
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
