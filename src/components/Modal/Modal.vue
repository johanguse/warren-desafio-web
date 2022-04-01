<template>
  <modal name="modal-transactions" @before-open="beforeOpen">
    <div class="modal-wrapper" role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
      <h1>{{ itemToShow.title }}</h1>
      <p>{{ itemToShow }}</p>
      <p>{{ itemToShow.date }}</p>
      <button
      type="button"
      class="btn-close"
      @click="closeModal"
      aria-label="Close modal"
    >
      Close me!
    </button>
    </div>
  </modal>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({

  name: 'ModalTransaction',

  data() {
    return {
      item: {} as object,
    };
  },

  computed: {
    itemToShow(): object {
      return this.item;
    },
  },

  methods: {
    closeModal() {
      this.$modal.hide('modal-transactions');
    },
    beforeOpen(event: any) {
      this.item = event.params.item;
    },
  },
});
</script>

<style scoped lang="less">
  @import "./modal.less";
</style>
