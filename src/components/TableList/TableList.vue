<template>
  <table class="table">
    <thead class="thead">
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Description</th>
        <th scope="col">Status</th>
        <th scope="col">Date</th>
        <th scope="col">Action</th>
      </tr>
    </thead>
    <tbody>
      <tr class="table-line" v-for="transaction, index in sortedItems" :key="transaction.id">
        <td>{{ transaction.title }}</td>
        <td>{{ transaction.description }}</td>
        <td>{{ transaction.status }}</td>
        <td>{{ formatDate(transaction.date) }}</td>
        <td><button @click="deleteEvent(index)">Delete</button></td>
      </tr>
    </tbody>
  </table>
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
      transactions: [] as ITransactions[],
      currentIndex: -1,
    };
  },
  mounted() {
    axios
      .get("https://warren-transactions-api.herokuapp.com/api/transactions")
      .then((response: IResponseData) => {
        this.transactions = response.data;
        console.log(response.data);
      })
      .catch((e: Error) => {
        console.log(e);
      });
  },
  methods: {
    deleteEvent(index: number) {
      console.log(index);
      this.transactions.splice(index, 1);
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
  @import "./TableList.less";
</style>
