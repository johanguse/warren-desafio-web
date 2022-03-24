<template>
  <div id="app">
    <HeaderApp/>
    <div class="container">
      <TableList />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import HeaderApp from "./components/Header/Header.vue";
import TableList from "./components/TableList/TableList.vue";

export default Vue.extend({
  name: "App",
  components: {
    TableList,
    HeaderApp,
  },
});
</script>
