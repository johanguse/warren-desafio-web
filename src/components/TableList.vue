<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">id</th>
        <th scope="col">Title</th>
        <th scope="col">description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(transaction, index) in transactions" :key="transaction.id">
        <th scope="row">
          {{ index + 1 }}
        </th>
        <td>{{ transaction.id }}</td>
        <td>{{ transaction.name }}</td>
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
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
