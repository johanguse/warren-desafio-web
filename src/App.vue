<template>
  <div id="app">
    <div>
      <h1>Infos</h1>
      <pre>{{ transactions }}</pre>
      <TableList />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from "axios";
import ITransactions from "@/types/Transactions";
import IResponseData from "@/types/ResponseData";
import TableList from "./components/TableList.vue";

export default Vue.extend({
  name: "App",
  components: {
    TableList,
  },
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
});
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
