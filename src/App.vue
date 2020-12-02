<template>
  <div id="app">
    <Navbar class="p-cust"/>
    <router-view class="p-cust mb-5"/>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'App',
  components: {
    Navbar, Footer
  },
  computed: {
    ...mapState(['foods'])
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
