<template>
<div>
  <div v-if="loading">
      <TableListLoader/>
  </div>
  <div v-else>
    <div class="filter">
      <input type="text" class="filter__text" aria-label="filtrar dados" placeholder="Pesquise pelo titulo" v-model="textSearchString" />
      <select class="filter__status" v-model="filterStatus" name="filterStatus" id="filterStatus" >
        <option disable selected value="">Status</option>
        <option v-for="statusItem in status" v-bind:value="statusItem.value" v-bind:key="statusItem.id">
          {{ statusItem.name }}
        </option>
      </select>
    </div>
    <table class="table">
      <thead class="thead">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Status</th>
          <th scope="col">Date</th>
          <th scope="col">Valor</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-line" v-for="transaction in sortedItems" :key="transaction.id" @click="openModal(transaction.id)">
          <td>{{ transaction.title }}</td>
          <td>{{ transaction.description }}</td>
          <td>{{ formatStatus(transaction.status) }}</td>
          <td>{{ formatDate(transaction.date) }}</td>
          <td>{{ formatAmount(transaction.amount) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  <Modal />
</div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import ITransactions from "@/types/Transactions";
import IResponseData from "@/types/ResponseData";
import TableListLoader from "../TableListLoader/TableListLoader.vue";
import Modal from '../Modal/Modal.vue';

export default Vue.extend({
  name: "TableList",
  components: {
    TableListLoader,
    Modal,
  },
  created() {
    document.title = "Warren Desafio Web - Front-end";
  },
  data() {
    return {
      textSearchString: "",
      filterStatus: "",
      success: false,
      error: false,
      loading: true,
      transactions: [] as ITransactions[],
      tempTransactions: [] as ITransactions[],
      currentIndex: -1,
      status: [
        { id: 0, value: "created", name: "Criado" },
        { id: 1, value: "processed", name: "Concluída" },
        { id: 2, value: "processing", name: "Solicitada" },
      ],
      selectedId: "" as string,
      transactionData: {} as object,
    };
  },
  mounted() {
    axios
      .get("https://warren-transactions-api.herokuapp.com/api/transactions")
      .then((response: IResponseData) => {
        this.transactions = response.data;
        this.transactions = [...this.transactions].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
        this.success = true;
      })
      .catch((e: Error) => {
        this.error = true;
        console.log(e);
      })
      .finally(() => {
        this.loading = false;
      });
  },
  methods: {

    formatStatus(status: string) {
      switch (status) {
        case "created":
          return "Criado";
        case "processed":
          return "Concluída";
        case "processing":
          return "Solicitada";
        default:
          return "Não identificado";
      }
    },
    formatAmount(amount: number) {
      return amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
    },
    formatDate(date: string) {
      return new Date(date).toLocaleDateString('pt-Br', { dateStyle: 'short', timeZone: 'America/Sao_Paulo' });
    },
    closeModal() {
      this.$modal.hide('modal-transactions');
    },
    openModal(selectedId: string) {
      axios
        .get(`https://warren-transactions-api.herokuapp.com/api/transactions/${selectedId}`)
        .then((response: IResponseData) => {
          this.transactionData = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
          this.$modal.show('modal-transactions', { item: this.transactionData });
        });
    },
  },
  computed: {
    sortedItems(): ITransactions[] {
      const { transactions } = this;
      let tempTransactions = transactions.map((object) => ({ ...object }));
      const { textSearchString } = this;
      const { filterStatus } = this;

      if ((textSearchString !== '' && textSearchString) || filterStatus) {
        tempTransactions = tempTransactions.filter((item) => item.title
          .toUpperCase()
          .includes(textSearchString.toUpperCase()));
        if (filterStatus !== '') {
          return tempTransactions.filter((item) => item.status === filterStatus);
        }
        return tempTransactions;
      }
      return transactions;
    },
  },
});
</script>

<style scoped lang="less">
  @import "./table.less";
</style>
