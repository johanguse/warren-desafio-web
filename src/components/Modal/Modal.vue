<template>
  <modal
    name="modal-transactions"
    height="auto"
    :adaptive="true"
    @before-open="beforeOpen"
  >
    <div
      class="modal-wrapper"
      role="dialog"
      aria-labelledby="modalTitle"
      aria-describedby="modalDescription"
    >
      <h1 class="modal-wrapper-title">{{ itemToShow.Title }}</h1>
      <div class="status">
        <div class="status-bar">
          <progress
            class="bar"
            :value="`${formatPercent(itemToShow.Status)}`"
            max="100"
          ></progress>
        </div>
        <div class="status-text">
          <p>Criada</p>
          <p>Solicitada</p>
          <p>Concluída</p>
        </div>
      </div>
      <div class="transfer">
        <div class="transfer-location">
          <h2 class="title">Transferido de</h2>
          <div class="transfer-location__text">
            <p class="from">{{ itemToShow.FromUser }}</p>
            <p class="amount">
              {{ itemToShow.Amount | formatAmount }}
            </p>
          </div>
        </div>
        <div class="transfer-location">
          <h2 class="title">Para</h2>
          <div class="transfer-location__text">
            <p class="from">{{ itemToShow.ToUser }}</p>
            <p class="amount">{{ itemToShow.Amount | formatAmount }}</p>
          </div>
        </div>
      </div>
      <button class="btn-close" @click="closeModal" aria-label="Close modal">
        <span class="close-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 40 40"
            enable-background="new 0 0 40 40"
          >
            <line
              x1="15"
              y1="15"
              x2="25"
              y2="25"
              stroke="#000"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-miterlimit="10"
            ></line>
            <line
              x1="25"
              y1="15"
              x2="15"
              y2="25"
              stroke="#000"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-miterlimit="10"
            ></line>
            <circle
              class="circle"
              cx="20"
              cy="20"
              r="19"
              opacity="0"
              stroke="#fff"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-miterlimit="10"
              fill="none"
            ></circle>
            <path
              d="M20 1c10.45 0 19 8.55 19 19s-8.55 19-19 19-19-8.55-19-19 8.55-19 19-19z"
              class="progress"
              stroke="#000"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-miterlimit="10"
              fill="none"
            ></path>
          </svg>
        </span>
      </button>
    </div>
  </modal>
</template>

<script lang="ts">
import ITransactions from "@/types/Transactions";
import Vue from "vue";

export default Vue.extend({
  name: "ModalTransaction",

  data() {
    return {
      item: {} as ITransactions,
    };
  },
  computed: {
    itemToShow(): ITransactions {
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
    closeModal() {
      this.$modal.hide("modal-transactions");
    },
    beforeOpen(event: any) {
      this.item = event.params.item.data;
    },
  },
});
</script>

<style scoped lang="less">
@import "./modal.less";
</style>
