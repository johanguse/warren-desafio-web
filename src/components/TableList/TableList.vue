<template>
<div>
  <div v-if="loading">
      <p>Carregando...</p>
  </div>
  <div v-else>
    <table class="table">
      <thead class="thead">
        <tr>
          <th scope="col">Title</th>
          <th scope="col">Description</th>
          <th scope="col">Status</th>
          <th scope="col">Date</th>
          <th scope="col">Valor</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table-line" v-for="transaction, index in sortedItems" :key="transaction.id">
          <td>{{ transaction.title }}</td>
          <td>{{ transaction.description }}</td>
          <td>{{ formatStatus(transaction.status) }}</td>
          <td>{{ formatDate(transaction.date) }}</td>
          <td>{{ formatAmount(transaction.amount) }}</td>
          <td><button @click="deleteEvent(index)">Delete</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script lang="ts">
import Vue from "vue";
import axios from "axios";
import ITransactions from "@/types/Transactions";
import IResponseData from "@/types/ResponseData";

export default Vue.extend({
  name: "TableList",
  data() {
    return {
      success: false,
      error: false,
      loading: true,
      transactions: [] as ITransactions[],
      currentIndex: -1,
    };
  },
  mounted() {
    axios
      .get("https://warren-transactions-api.herokuapp.com/api/transactions")
      .then((response: IResponseData) => {
        this.transactions = response.data;
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
    deleteEvent(index: number) {
      console.log(index);
      this.transactions.splice(index, 1);
    },
    formatStatus(status: string) {
      switch (status) {
        case "created":
          return "Criado";
        case "processed":
          return "Concluída";
        case "processing":
          return "Solicitada";
        default:
          return "----";
      }
    },
    formatAmount(amount: number) {
      return amount.toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
    },
    formatDate(date: Date) {
      return new Date(date).toLocaleDateString('pt-BR');
    },
  },
  computed: {
    sortedItems(): ITransactions[] {
      return [...this.transactions].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    },
  },
});
</script>

<style scoped lang="less">
  @import "./table.less";
</style>
