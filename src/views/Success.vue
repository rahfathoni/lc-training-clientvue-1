<template>
  <div class="container pt-5">
    <div class="row">
      <div class="col-md">
        <img alt="menunggu" src="../assets/menunggu.png"
        class="med-img-cust text-center">
        <h1 class=" font-weight-bold">Sukses!!!</h1>
        <h3 class=" font-weight-light">Pesanan Anda Segera Diproses</h3>
        <h3 class=" font-weight-light">Selamat Menunggu</h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Success',
  computed: {
    ...mapState(['foods'])
  },
  created () {
    if (this.foods.length === 0) {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
