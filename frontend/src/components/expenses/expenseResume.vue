<template>
  <div>
    <h1>My Expenses</h1>
    <div class="date-picker">
      <label for="start-date">Start Date:</label>
      <input type="date" id="start-date" v-model="startDate" />
      <label for="end-date">End Date:</label>
      <input type="date" id="end-date" v-model="endDate" />
      <button @click="fetchExpenses">Search</button>
    </div>
    <ul>
      <li v-for="expense in expenses" :key="expense.id">
        {{ expense.name }}: {{ expense.amount }}
      </li>
    </ul>
    <button @click="downloadPDF">Download PDF</button>
  </div>
</template>

<script>
import api from "../api/api";

export default {
  data() {
    return {
      expenses: [],
      startDate: "",
      endDate: "",
    };
  },
  methods: {
    async downloadPDF() {
      try {
        const response = await api.get(
          `/test/pdf?startDate=${this.startDate}&endDate=${this.endDate}`,
          {
            responseType: "blob",
          }
        );
        const url = window.URL.createObjectURL(new Blob([response.data]));
        console.log(url);
        const link = document.createElement("a");
        console.log(link);
        link.href = url;
        link.setAttribute("download", "expenses.pdf");
        document.body.appendChild(link);
        link.click();
      } catch (error) {
        console.error(error);
      }
    },
    async fetchExpenses() {
      try {
        const response = await api.get(
          `/expenses?startDate=${this.startDate}&endDate=${this.endDate}`
        );
        this.expenses = response.data;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style>
.date-picker {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.date-picker input {
  margin-right: 10px;
}
</style>
