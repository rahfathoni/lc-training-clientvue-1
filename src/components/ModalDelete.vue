<template>
  <div>
    <b-modal id='deletePesananModal'
    ref='deletePesananModal'
    hide-footer
    hide-header
    centered
    size="md"
    >
      <div class="modal-body mt-0">
          <h4 class="text-center mb-3">
            Hapus Pesanan ini ?
          </h4>
        <div class="text-center">
          <button type="button" @click.prevent="foodRemove(deleteId)" class="btn btn-danger m-0"><b-icon-trash style="color: white" />Hapus</button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      deleteId: ''
    }
  },
  methods: {
    ...mapActions(['deleteItem']),
    showDelete (id) {
      this.deleteId = id
      this.$refs.deletePesananModal.show()
    },
    async foodRemove (id) {
      await this.deleteItem(parseInt(id))
      this.$refs.deletePesananModal.hide()
    }
  }
}
</script>

<style>
</style>
