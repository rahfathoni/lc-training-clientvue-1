<template>
  <div class="container pt-5">
    <div class="row mb-5">
      <div class="col">
        <h1>Selamat Datang di Resto Linov App</h1>
      </div>
    </div>
    <div class="row">
      <div class="col"></div>
      <div class="col-8 border-success border shadow bg-light pt-2 pb-5">
        <div class="pt-3">
          <h3>Login</h3>
          <hr />
        </div>
        <h5 v-if="!isUser" class="text-danger" >E-mail / Password tidak ditemukan</h5>
        <form @submit.prevent="login">
          <div class="form-group">
            <h5 for="email" class="text-left font-weight-bold pb-2">E-mail</h5>
            <input id="email" type="email" class="form-control" v-model="user.email" placeholder="E-mail..." required>
          </div>
          <div class="form-group pt-3 pb-2">
            <h5 for="password" class="text-left font-weight-bold pb-2">Password</h5>
            <div class="input-group">
              <input id="password" :type="secret.pass" v-model="user.password" class="form-control" placeholder="Password..." required>
              <div class="input-group-prepend">
                <button class="btn" @click.prevent="secretChange" type="button">
                  <b-icon :icon="secret.icon"></b-icon>
                </button>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-cust btn-cust:hover btn-block text-center"><b-icon-door-open /> Login</button>
        </form>
      </div>
      <div class="col"></div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Landing',
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      secret: {
        pass: 'password',
        icon: 'eye-slash'
      }
    }
  },
  computed: {
    ...mapState(['isUser'])
  },
  methods: {
    ...mapActions(['loginUser']),
    async login () {
      await this.loginUser(this.user)
      this.user.password = ''
    },
    secretChange () {
      if (this.secret.pass === 'password') {
        this.secret.pass = 'text'
        this.secret.icon = 'eye'
      } else {
        this.secret.pass = 'password'
        this.secret.icon = 'eye-slash'
      }
    }
  }
}
</script>

<style>

</style>
