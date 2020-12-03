<template>
  <div>
    <b-modal id='registerModal'
    ref='registerModal'
    hide-footer
    no-close-on-backdrop
    centered
    size="md"
    >
      <template v-slot:modal-title>
        DAFTAR AKUN BARU
      </template>
      <div class="text-center text-danger pb-1" v-if="error.password">Pastikan password sama dengan konfirmasi</div>
      <div class="text-center text-danger" v-if="error.email">Email sudah terdaftar</div>
      <div class="modal-body pt-1">
        <form @submit.prevent="inputRegister">
          <div class="form-group">
            <h5 for="email" class="text-left font-weight-light pb-1">E-mail</h5>
            <input id="email" type="email" class="form-control" v-model="register.email" placeholder="E-mail..." required>
          </div>
          <div class="form-group">
            <h5 for="password" class="text-left font-weight-light pb-1">Password</h5>
            <div class="input-group">
              <input id="password" :type="secret.pass" v-model="register.password" class="form-control" placeholder="Password..." required>
              <div class="input-group-prepend">
                <button class="btn" @click.prevent="secretChange" type="button">
                  <b-icon :icon="secret.icon"></b-icon>
                </button>
              </div>
            </div>
          </div>
          <div class="form-group pb-2">
            <h5 for="confirm-password" class="text-left font-weight-light pb-1">Confirm Password</h5>
            <div class="input-group">
              <input id="confirm-password" :type="confirmSecret.pass" v-model="register.confirmPassword" class="form-control" placeholder="Confirm Password..." required>
              <div class="input-group-prepend">
                <button class="btn" @click.prevent="confirmSecretChange" type="button">
                  <b-icon :icon="confirmSecret.icon"></b-icon>
                </button>
              </div>
            </div>
          </div>
          <button type="submit" class="btn btn-cust btn-cust:hover btn-block text-center"><b-icon-box-arrow-in-right /> Daftar</button>
        </form>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      register: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      error: {
        password: false,
        email: false
      },
      secret: {
        pass: 'password',
        icon: 'eye-slash'
      },
      confirmSecret: {
        pass: 'password',
        icon: 'eye-slash'
      }
    }
  },
  methods: {
    ...mapActions(['registerUser', 'checkRegisterUser']),
    showRegister () {
      this.register.email = ''
      this.register.password = ''
      this.register.confirmPassword = ''
      this.confirmSecret.pass = 'password'
      this.confirmSecret.icon = 'eye-slash'
      this.secret.pass = 'password'
      this.secret.icon = 'eye-slash'
      this.error.password = false
      this.error.email = false
      this.$refs.registerModal.show()
    },
    inputRegister () {
      this.error.password = false
      this.error.email = false
      if (this.register.password === this.register.confirmPassword) {
        return this.checkRegisterUser({
          email: this.register.email.toLowerCase()
        })
          .then(({ data }) => {
            if (data.length !== 0) {
              this.error.email = true
            } else {
              this.registerUser({
                email: this.register.email.toLowerCase(),
                password: this.register.password
              })
              this.$refs.registerModal.hide()
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.error.password = true
        this.register.password = ''
        this.register.confirmPassword = ''
      }
    },
    secretChange () {
      if (this.secret.pass === 'password') {
        this.secret.pass = 'text'
        this.secret.icon = 'eye'
      } else {
        this.secret.pass = 'password'
        this.secret.icon = 'eye-slash'
      }
    },
    confirmSecretChange () {
      if (this.confirmSecret.pass === 'password') {
        this.confirmSecret.pass = 'text'
        this.confirmSecret.icon = 'eye'
      } else {
        this.confirmSecret.pass = 'password'
        this.confirmSecret.icon = 'eye-slash'
      }
    }
  }
}
</script>

<style>
</style>
