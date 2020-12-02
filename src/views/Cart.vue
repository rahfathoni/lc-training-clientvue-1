<template>
  <div class="pt-4">
    <div class="row">
      <div class="col text-left">
        <h5 class=" font-weight-normal"><router-link class="text-dark" to="/">Home</router-link> / <router-link class="text-dark" to="/foods">Foods</router-link> / <span class=" font-weight-bold">Keranjang</span></h5>
      </div>
    </div>
    <div class="row mt-2">
      <div class="col text-left">
        <h1 class=" font-weight-light">Keranjang <span class=" font-weight-bold">Saya</span></h1>
      </div>
    </div>
    <div class="row mt-3">
    <table class="table table-hover table-bordered table-light table-responsive-md mb-5">
      <thead>
          <tr>
              <th scope="col" class="text-left">#</th>
              <th scope="col" class="text-left col-3">Foto</th>
              <th scope="col" class="text-left col-2">Makanan</th>
              <th scope="col" class="text-left">Keterangan</th>
              <th scope="col" class="text-left col-1">Jumlah</th>
              <th scope="col" class="text-left col-2">Harga</th>
              <th scope="col" class="text-left col-2">Total Harga</th>
              <th scope="col" class="text-left col-1">Hapus</th>
          </tr>
      </thead>
      <tbody v-for="(item, i) in cart" :key="i">
        <tr>
          <th scope="row">{{ i+1 }}</th>
          <td>
            <img :src="getImage(item.image)" class="img-table-cust shadow" :alt="item.image">
          </td>
          <th class=" text-left">{{ item.name }}</th>
          <td class=" text-left">{{ item.note }}</td>
          <td class=" text-left">{{ item.amount }}</td>
          <td>Rp. {{ item.price }}</td>
          <td class=" font-weight-bold">Rp. {{ item.totalPrice }}</td>
          <td>
            <button type="button" @click.prevent="foodRemove(item.id)" class="btn"><b-icon-trash style="color: red;" /></button>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <div class="row mt-1">
      <div class="col"></div>
      <div class="col"></div>
      <div class="col">
        <div class="row">
          <div class="col text-left">
            <h5>Total Harga </h5>
          </div>
          <div class="col-7 text-left">
            <h5>Rp. {{payment.finalPrice}}</h5>
          </div>
        </div>
        <div class="row text-left">
          <div class="col mt-5">
            <form @submit.prevent="checkout">
              <div class="form-group">
                <h5 for="name" class=" font-weight-light pb-1">Nama</h5>
                <input id="name" type="text" class="form-control" v-model="payment.name" required>
              </div>
              <div class="form-group">
                <h5 for="table" class=" font-weight-light pb-1">Nomer Meja</h5>
                <input id="table" type="number" class="form-control" v-model="payment.table" min="1" required>
              </div>
              <div class="text-right">
                <button type="submit" class="btn btn-cust btn-cust:hover"><b-icon-cart /> Pesan</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Cart',
  data () {
    return {
      payment: {
        finalPrice: '',
        name: '',
        table: ''
      },
      edit: {
        amount: '',
        note: ''
      }
    }
  },
  computed: {
    ...mapState(['cart'])
  },
  methods: {
    ...mapActions(['deleteItem', 'resetCart']),
    getImage (img) {
      return require('../assets/' + img)
    },
    calculatePrice () {
      if (this.cart.length === 0) {
        this.payment.finalPrice = ''
        this.$router.push('/foods')
      } else {
        let result = 0
        for (let i = 0; i < this.cart.length; i++) {
          result = result + this.cart[i].totalPrice
        }
        this.payment.finalPrice = result
      }
    },
    async checkout () {
      await this.resetCart()
      this.$router.push('/pesanan-sukses')
      this.$toast.open({
        message: 'Sukses Dipesan',
        type: 'success',
        duration: 3500,
        position: 'top-right'
      })
    },
    async foodRemove (orderId) {
      await this.deleteItem(orderId)
      this.calculatePrice()
    }
  },
  created () {
    if (this.cart.length === 0) {
      this.$router.push('/')
    } else {
      this.calculatePrice()
    }
  }
}
</script>

<style>

</style>
