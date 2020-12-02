<template>
  <div class="pt-4 pb-4">
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
    <div v-if="cart.length !== 0" class="row mt-3">
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
              <th scope="col" class="text-center col-1">Ubah</th>
          </tr>
      </thead>
      <tbody v-for="(item, i) in cart" :key="i">
        <tr>
          <th scope="row">{{ i+1 }}</th>
          <td>
            <img :src="getImage(item.products.gambar)" class="img-table-cust shadow" :alt="item.products.gambar">
          </td>
          <th class=" text-left">{{ item.products.nama }}</th>
          <td v-if="showInput.keterangan === true && showInput.itemIndex === i" class=" text-left">
            <textarea class="form-control" placeholder="seperti: pedas, nasi setengah..." v-model="item.keterangan"/>
          </td>
          <td v-else class=" text-left">
            {{ item.keterangan }}
          </td>
          <td v-if="showInput.jumlah_pemesanan === true && showInput.itemIndex === i" class=" text-left">
            <input type="number" class="form-control" v-model="item.jumlah_pemesanan" min="1" required>
          </td>
          <td v-else class=" text-left">
            {{ item.jumlah_pemesanan }}
          </td>
          <td>Rp. {{ item.products.harga }}</td>
          <td class=" font-weight-bold">Rp. {{ item.products.harga * item.jumlah_pemesanan }}</td>
          <td>
            <div class="row">
              <div class="col m-0 p-0">
                <button type="button" v-if="showInput.itemIndex === i" @click.prevent="clickEditButton(i)" :style="{ 'background-color': showInput.buttonColor }" class="btn m-0"><b-icon-pencil-square style="color: green;" /></button>
                <button type="button" v-else @click.prevent="clickEditButton(i)" class="btn m-0"><b-icon-pencil-square style="color: green;" /></button>
              </div>
              <div class="col m-0 p-0">
                <button type="button" @click.prevent="showModalDelete(item.id)" class="btn m-0"><b-icon-trash style="color: red;" /></button>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
    <div v-if="cart.length !== 0" class="row mt-1">
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
    <div v-if="cart.length === 0" class="row mt-5">
      <div class="col">
        <h2>Anda Belum Menyimpan Pesanan</h2>
        <router-link tag="button" to="/foods" type="button" class="btn btn-cust btn-cust:hover mt-3"><b-icon-arrow-right />Pesan</router-link>
      </div>
    </div>
    <ModalDelete ref="modalDeleteComponent" />
  </div>
</template>

<script>
import ModalDelete from '../components/ModalDelete'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Cart',
  components: {
    ModalDelete
  },
  data () {
    return {
      pembayaran: {
        nama: '',
        noMeja: ''
      },
      showInput: {
        keterangan: false,
        jumlah_pemesanan: false,
        itemIndex: '',
        buttonColor: ''
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
    ...mapActions(['checkoutCart', 'updateItem']),
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
    showModalDelete (orderId) {
      this.$refs.modalDeleteComponent.showDelete(orderId)
    },
    async clickEditButton (cartIndex) {
      if (this.showInput.keterangan === false) {
        this.showInput.keterangan = true
        this.showInput.jumlah_pemesanan = true
        this.showInput.itemIndex = cartIndex
        this.showInput.buttonColor = 'yellow'
      } else {
        await this.updateItem(this.cart[cartIndex])
        this.showInput.keterangan = false
        this.showInput.jumlah_pemesanan = false
        this.showInput.buttonColor = ''
        this.showInput.itemIndex = ''
      }
    }
  }
}
</script>

<style>

</style>
