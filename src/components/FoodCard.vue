<template>
    <div class="row row-cols-md-1 row-cols-md-3">
      <div class="col mb-4"
      v-for="(datum, i) in data" :key="i"
      >
        <div class="card shadow" style="border-radius: 5%">
          <img :src="getImage(datum.gambar)" class="card-img-top img-card-cust" :alt="datum.gambar">
          <div class="card-body text-left">
            <h3 class="card-title font-weight-normal">{{datum.nama}}</h3>
            <h5 class="card-text pt-0 pb-2 font-weight-light">Harga: Rp. {{datum.harga}}</h5>
            <router-link tag="button" :to="`/foods/${datum.id}`" class="btn btn-cust btn-cust:hover"><b-icon-cart /> Pesan</router-link>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props: ['data'],
  methods: {
    getImage (img) {
      return require('../assets/' + img)
    }
  }
}
</script>

<style>

</style>
