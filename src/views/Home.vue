<template>
  <div class="">
    <div class="row justify-content-around">
      <div class="col-md-5 text-left"
      style="padding-top: 130px"
      >
        <h1 class="m-0 font-weight-bold">Delicious Food Menu</h1>
        <h1 class="mt-0 mb-1 font-weight-light">in Your Handphone</h1>
        <div style="font-size: 22px">Ayo segera pilih dan pesan makanan favorit anda</div>
        <router-link tag="button" to="/foods" type="button" class="btn btn-cust btn-cust:hover mt-3"><b-icon-arrow-right />Pesan</router-link>
      </div>
      <div class="col-md-6 align-text-top pr-0 pt-2">
        <img alt="ilustrasi" src="../assets/ilustrasi.png"
        class="big-img-cust">
      </div>
    </div>
    <div class="row pt-3">
      <div class="col-md text-left">
        <h1 class=" font-weight-light">Best <span class=" font-weight-bold">Foods</span></h1>
      </div>
      <div class="col text-right">
        <router-link tag="button" to="/foods" type="button" class="btn btn-cust btn-cust:hover mt-3"><b-icon-eye />Lihat Semua</router-link>
      </div>
    </div>
    <div class="row pt-4">
      <div class="col">
        <FoodCard :data="bestFoods" />
      </div>
    </div>
  </div>
</template>

<script>
import FoodCard from '../components/FoodCard'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Home',
  components: {
    FoodCard
  },
  computed: {
    ...mapState(['bestFoods', 'foods'])
  },
  methods: {
    ...mapActions(['readInitialData'])
  },
  created () {
    if (this.foods.length === 0) {
      this.readInitialData()
    }
  }
}
</script>

<style>

</style>
