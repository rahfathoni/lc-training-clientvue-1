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
            <img :src="getImage(item.products.gambar)" class="img-table-cust shadow" :alt="item.products.gambar">
          </td>
          <th class=" text-left">{{ item.products.nama }}</th>
          <td class=" text-left">{{ item.keterangan }}</td>
          <td class=" text-left">{{ item.jumlah_pemesanan }}</td>
          <td>Rp. {{ item.products.harga }}</td>
          <td class=" font-weight-bold">Rp. {{ item.products.harga * item.jumlah_pemesanan }}</td>
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
            <h5>Rp. {{bayar}}</h5>
          </div>
        </div>
        <div class="row text-left">
          <div class="col mt-5">
            <form @submit.prevent="checkout">
              <div class="form-group">
                <h5 for="nama" class=" font-weight-light pb-1">Nama</h5>
                <input id="nama" type="text" class="form-control" v-model="pembayaran.nama" required>
              </div>
              <div class="form-group">
                <h5 for="table" class=" font-weight-light pb-1">Nomer Meja</h5>
                <input id="table" type="number" class="form-control" v-model="pembayaran.noMeja" min="1" required>
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
      pembayaran: {
        nama: '',
        noMeja: ''
      }
    }
  },
  computed: {
    ...mapState(['cart']),
    bayar () {
      let result = 0
      if (this.cart.length === 0) {
        return result
      } else {
        for (let i = 0; i < this.cart.length; i++) {
          result = result + (parseInt(this.cart[i].jumlah_pemesanan) * parseInt(this.cart[i].products.harga))
        }
        return result
      }
    }
  },
  methods: {
    ...mapActions(['deleteItem', 'checkoutCart']),
    getImage (img) {
      return require('../assets/' + img)
    },

    async checkout () {
      await this.checkoutCart({
        nama: this.pembayaran.nama,
        noMeja: this.pembayaran.noMeja,
        keranjangs: this.cart
      })
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
    }
  }
}
</script>

<style>

</style>
