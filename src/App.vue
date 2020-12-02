<template>
  <div id="app">
    <Navbar class="p-cust"/>
    <router-view class="p-cust mb-5"/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'App',
  components: {
    Navbar
  },
  computed: {
    ...mapState(['foods'])
  },
  methods: {
    ...mapActions(['readInitialFoods'])
  },
  created () {
    if (this.foods.length === 0) {
      this.readInitialFoods()
    }
  }
}
</script>

<style>
#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  /* -webkit-font-smoothing: antialiased; */
  /* -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  /* color: #2c3e50; */
}
.p-cust {
  padding-left: 100px;
  padding-right: 100px;
}

</style>
