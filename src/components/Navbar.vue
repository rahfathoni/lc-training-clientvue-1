<template>
    <div>
        <b-navbar toggleable="lg" class="pl-0 pr-0">
            <b-navbar-brand>Resto Linov</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/">Home</b-nav-item>
                <b-nav-item to="/foods">Foods</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-text class="pr-1">
                    Welcome <strong>{{loginUser.email}}</strong>
                </b-nav-text>
                <b-nav-item v-if="cart.length === 0" to="/keranjang" disabled>
                    Keranjang <b-icon-bag /> <span class="text-cust">0</span>
                </b-nav-item>
                <b-nav-item class="pr-2" v-else to="/keranjang">
                    Keranjang <b-icon-bag /> <span class="text-cust">{{ cartAmount }}</span>
                </b-nav-item>
                <button class="btn btn-cust btn-cust:hover py-0 my-0" type="button" @click.prevent="logout"><b-icon-door-closed-fill /> Logout</button>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  computed: {
    ...mapState(['cart', 'loginUser']),
    cartAmount () {
      let result = 0
      for (let i = 0; i < this.cart.length; i++) {
        result = result + parseInt(this.cart[i].jumlah_pemesanan)
      }
      return result
    }
  },
  methods: {
    ...mapActions(['logoutUser']),
    async logout () {
      await this.logoutUser()
      this.$router.push('/landing')
    }
  }
}
</script>

<style>

</style>
