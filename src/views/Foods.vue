<template>
    <div class="pt-4">
      <div class="row">
        <div class="col text-left">
          <h1 class=" font-weight-light">Daftar <span class=" font-weight-bold">Makanan</span></h1>
        </div>
      </div>
      <div class="row pt-3">
        <div class="col text-left">
          <div class="input-group flex-nowrap">
            <input type="text" class="form-control" v-model="search" placeholder="Cari Makanan Kesukaan Anda" aria-describedby="addon-wrapping">
            <div class="input-group-prepend">
              <div class="input-group-text" id="addon-wrapping"><b-icon-search/></div>
            </div>
          </div>
        </div>
      </div>
      <div class="row pt-3">
        <div class="col">
          <FoodCard :data="searchFood" />
        </div>
      </div>
    </div>
</template>

<script>
import FoodCard from '../components/FoodCard'
import { mapState } from 'vuex'
export default {
  name: 'Foods',
  data () {
    return {
      search: ''
    }
  },
  components: {
    FoodCard
  },
  computed: {
    ...mapState(['foods']),
    searchFood () {
      if (this.search === '') {
        return this.foods
      } else {
        const fromSearch = this.foods.filter(datum => datum.name.toUpperCase().includes(this.search.toUpperCase()))
        return fromSearch
      }
    }
  }
}
</script>

<style>

</style>
