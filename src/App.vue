<template>
  <div id="app">
    <Navbar v-if='isLogin' class="p-cust"/>
    <router-view class="p-cust mb-5"/>
    <Footer />
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  name: 'App',
  components: {
    Navbar, Footer
  },
  computed: {
    ...mapState(['foods', 'isLogin'])
  },
  methods: {
    ...mapMutations(['SET_ISLOGIN']),
    ...mapActions(['logoutUser'])
  },
  created () {
    if (!localStorage.token) {
      if (this.$route.name !== 'Landing') {
        this.$router.push('/landing')
      }
    } else {
      this.logoutUser()
      if (this.$route.name !== 'Landing') {
        this.$router.push('/landing')
      }
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
