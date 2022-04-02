<template>
  <modal name="modal-transactions" height="auto" @before-open="beforeOpen">
    <div class="modal-wrapper" role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
      <h1 class="modal-wrapper-title">{{ itemToShow.title }}</h1>
      <div class="status">
        <div class="status-bar">
          <progress class="bar" :value="`${formatPercent(itemToShow.status)}`" max="100" style="--value: 0; --max: 100;"></progress>
        </div>
        <div class="status-text">
          <p>Solicitada</p>
          <p>Processada</p>
          <p>Concluída</p>
        </div>
      </div>
      <div class="transfer">
        <div class="transfer-location">
          <h2 class="title">Transferido de</h2>
          <div class="transfer-location__text">
            <p class="from">{{ itemToShow.from }}</p>
            <p class="amount">{{ formatAmount(itemToShow.amount) }}</p>
          </div>
        </div>
        <div class="transfer-location">
          <h2 class="title">Para</h2>
          <div class="transfer-location__text">
            <p class="from">{{ itemToShow.to }}</p>
            <p class="amount">{{ formatAmount(itemToShow.amount) }}</p>
          </div>
        </div>
      </div>
    <button class="btn-close"
      @click="closeModal"
      aria-label="Close modal">
      <span class="close-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" enable-background="new 0 0 40 40">
          <line x1="15" y1="15" x2="25" y2="25" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-miterlimit="10"></line>
          <line x1="25" y1="15" x2="15" y2="25" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-miterlimit="10"></line>
          <circle class="circle" cx="20" cy="20" r="19" opacity="0" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-miterlimit="10" fill="none"></circle>
          <path d="M20 1c10.45 0 19 8.55 19 19s-8.55 19-19 19-19-8.55-19-19 8.55-19 19-19z" class="progress" stroke="#000" stroke-width="2.5" stroke-linecap="round" stroke-miterlimit="10" fill="none"></path>
        </svg>
      </span>
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
    formatPercent(status: string) {
      switch (status) {
        case "created":
          return "1";
        case "processed":
          return "100";
        case "processing":
          return "50";
        default:
          return "0";
      }
    },
    formatAmount(amount: number) {
      return amount?.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' }) || '';
    },
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
