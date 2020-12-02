<template>
    <div>
        <b-navbar toggleable="md" class="pl-0 pr-0">
            <b-navbar-brand>Resto Linov</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav>
                <b-nav-item to="/">Home</b-nav-item>
                <b-nav-item to="/foods">Foods</b-nav-item>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
                <b-nav-item v-if="cart.length === 0" to="/keranjang" disabled>
                    Keranjang <b-icon-bag /> <span class="text-cust">0</span>
                </b-nav-item>
                <b-nav-item v-else to="/keranjang">
                    Keranjang <b-icon-bag /> <span class="text-cust">{{cartAmount}}</span>
                </b-nav-item>
            </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['cart']),
    cartAmount () {
      let result = 0
      for (let i = 0; i < this.cart.length; i++) {
        result = result + this.cart[i].amount
      }
      return result
    }
  }
}
</script>

<style>

</style>
