<template>
  <div>
    <div v-if="loading">
      <TableListLoader />
    </div>
    <div v-else>
      <div class="filter">
        <input
          type="text"
          class="filter__text"
          aria-label="filtrar dados"
          placeholder="Pesquise pelo titulo"
          v-model="textSearchString"
        />
        <select
          class="filter__status"
          v-model="filterStatus"
          name="filterStatus"
          id="filterStatus"
        >
          <option disable selected value="">Status</option>
          <option
            v-for="statusItem in status"
            v-bind:value="statusItem.value"
            v-bind:key="statusItem.id"
          >
            {{ statusItem.name }}
          </option>
        </select>
      </div>
      <div class="twrap">
        <table class="table">
          <thead class="thead">
            <tr class="headers">
              <th class="header" scope="col">Title</th>
              <th class="header" scope="col">Description</th>
              <th class="header" scope="col">Status</th>
              <th class="header" scope="col">Date</th>
              <th class="header" scope="col">Valor</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="tdata"
              v-for="transaction in sortedItems"
              :key="transaction.ID"
              @click="openModal(transaction.ID)"
            >
              <td data-label="Título">{{ transaction.Title }}</td>
              <td data-label="Descrição">
                {{ transaction.Description | capitalize }}
              </td>
              <td data-label="Status">
                {{ formatStatus(transaction.Status) }}
              </td>
              <td data-label="Data">{{ transaction.Date | formatDate }}</td>
              <td data-label="Valor">
                {{ transaction.Amount | formatAmount }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <Modal />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { AxiosResponse } from "axios";
import api from "@/services/http-common";
import ITransactions from "@/types/Transactions";
import IResponseData from "@/types/ResponseData";
import TableListLoader from "../TableListLoader/TableListLoader.vue";
import Modal from "../Modal/Modal.vue";

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
    api
      .get(`transactions`)
      .then((response: AxiosResponse<IResponseData<ITransactions>>) => {
        this.transactions = response.data.data;
        this.transactions = [...this.transactions].sort((a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime());
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
    closeModal() {
      this.$modal.hide("modal-transactions");
    },
    openModal(selectedId: number) {
      api
        .get(`transactions/${selectedId}`)
        .then((response: AxiosResponse<IResponseData<ITransactions>>) => {
          this.transactionData = response.data;
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          this.loading = false;
          this.$modal.show("modal-transactions", {
            item: this.transactionData,
          });
        });
    },
  },
  computed: {
    sortedItems(): ITransactions[] {
      const { transactions } = this;
      let tempTransactions = transactions.map((object) => ({ ...object }));
      const { textSearchString } = this;
      const { filterStatus } = this;

      if ((textSearchString !== "" && textSearchString) || filterStatus) {
        tempTransactions = tempTransactions.filter((item) => item.Title.toUpperCase().includes(textSearchString.toUpperCase()));
        if (filterStatus !== "") {
          return tempTransactions.filter((item) => item.Status === filterStatus);
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
