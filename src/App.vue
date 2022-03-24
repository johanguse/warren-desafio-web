<template>
  <div id="app">
    <HeaderApp/>
    <div>
      <h1>Infos</h1>
      <TableList />
      <pre>{{ transactions }}</pre>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import axios from "axios";
import ITransactions from "@/types/Transactions";
import IResponseData from "@/types/ResponseData";
import HeaderApp from "./components/Header/Header.vue";
import TableList from "./components/TableList/TableList.vue";

export default Vue.extend({
  name: "App",
  components: {
    TableList,
    HeaderApp,
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
