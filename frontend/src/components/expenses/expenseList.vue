<template>
  <dev>
    <div>
      <h1>Liste des dépenses</h1>
    </div>

    <div class="container">
      <br />
      <div class="mychart" id="chart">
        <br />
      </div>
      <br />
      <div class="filterForm">
        <form @submit.prevent="getExpensesByDateRange">
          <div class="form-group">
            <label for="startDate">De :</label>
            <div class="input-container">
              <input type="date" id="startDate" v-model="startDate" />
              <i class="fas fa-calendar-alt"></i>
            </div>
          </div>
          <div class="form-group">
            <label for="endDate">A :</label>
            <div class="input-container">
              <input type="date" id="endDate" v-model="endDate" />
              <i class="fas fa-calendar-alt"></i>
            </div>
          </div>
          <div class="button-container">
            <button class="btn btn-primary" type="submit">
              <i class="fas fa-filter"></i>
              Filtre par date
            </button>
            <button class="btn btn-secondary" @click="resetDateFilter()">
              <i class="fas fa-undo"></i>
              Annuler
            </button>
          </div>
        </form>
        <br />
      </div>
      <br />
    </div>
    <br />
    <br />
    <div>
      <table class="table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Dépense</th>
            <th>Categorie</th>
            <th>Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="expense in expenses" :key="expense._id">
            <td>{{ expense.name }}</td>
            <td>{{ expense.amount }}</td>
            <td>{{ expense.category }}</td>
            <td>{{ formatDate(expense.date) }}</td>
            <td>
              <button class="btn btn-primary" @click="editExpense(expense)">
                Modifier
              </button>
              <button class="btn btn-danger" @click="deleteExpense(expense._id)">
                Supprimer
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <button class="btn btn-success" @click="showExpenseForm()">
        Ajouter une dépense
      </button>
      <expense-form
        v-if="showForm"
        :expense="selectedExpense"
        :closeForm="closeExpenseForm"
        :getExpenses="getExpenses"
      ></expense-form>
    </div>
  </dev>
</template>

<script>
import ExpenseForm from "../expenses/expenseForm.vue";
import api from "../api/api";
import Plotly from "plotly.js-dist";

export default {
  name: "ExpenseList",
  components: {
    ExpenseForm,
  },
  data() {
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .substr(0, 10);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
      .toISOString()
      .substr(0, 10);
    return {
      expenses: [],
      selectedExpense: null,
      showForm: false,
      startDate: firstDayOfMonth,
      endDate: lastDayOfMonth,
    };
  },
  async created() {
    await this.getExpenses();
    this.renderChart();
  },
  methods: {
    async getExpenses() {
      try {
        const response = await api.get("/expenses");
        this.expenses = response.data;
        this.renderChart();
        this.showForm = false;
      } catch (error) {
        console.log(error);
      }
    },
    async getExpensesByDateRange() {
      try {
        const response = await api.get("/expenses/by-date-range", {
          params: {
            startDate: this.startDate,
            endDate: this.endDate,
          },
        });
        this.expenses = response.data;
        this.renderChart();
      } catch (error) {
        console.log(error);
      }
    },
    resetDateFilter() {
      this.startDate = null;
      this.endDate = null;
      this.getExpenses();
    },

    async deleteExpense(id) {
      try {
        await api.delete(`/expenses/${id}`);
        this.expenses = this.expenses.filter((expense) => expense._id !== id);
        this.renderChart();
      } catch (error) {
        console.log(error);
      }
    },
    async addOrUpdateExpense(expense) {
      try {
        if (expense._id) {
          await api.put(`/expenses/${expense._id}`, expense);
        } else {
          await api.post("/expenses", expense);
        }
        await this.getExpenses();
        this.renderChart();
        this.showForm = false;
      } catch (error) {
        console.log(error);
      }
    },
    showExpenseForm() {
      this.selectedExpense = {
        name: "",
        amount: 0,
        category: "",
        date: new Date().toISOString().substr(0, 10),
      };
      this.showForm = true;
      this.renderChart();
    },
    editExpense(expense) {
      this.selectedExpense = expense;
      this.showForm = true;
      this.renderChart();
    },
    closeExpenseForm() {
      this.showForm = false;
      this.getExpenses();
      this.renderChart();
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    async renderChart() {
      // Compute total amount
      const totalAmount = this.expenses.reduce((sum, expense) => sum + expense.amount, 0);

      // Compute amount by category
      const categories = {};
      for (const expense of this.expenses) {
        if (categories.hasOwnProperty(expense.category)) {
          categories[expense.category] += expense.amount;
        } else {
          categories[expense.category] = expense.amount;
        }
      }

      // Create data trace
      const data = [
        {
          type: "pie",
          values: Object.values(categories),
          labels: Object.keys(categories).map(
            (category) => `${category} (${categories[category]}€)`
          ),
          hole: 0.4,
          textinfo: "label+percent",
          automargin: true,
        },
      ];

      // Set chart layout
      const layout = {
        height: 400,
        margin: { t: 0, b: 0, l: 0, r: 0 },
        paper_bgcolor: "rgba(0,0,0,0)", // Définit la couleur de fond du papier comme transparent
        plot_bgcolor: "rgba(0,0,0,0)", // Définit la couleur de fond de la zone de traçage comme transparent

        font: {
          color: "#FFFFFF", // Définit la couleur de la police en blanc
        },
      };

      // Plot chart
      Plotly.newPlot("chart", data, layout);
    },
  },
};
</script>

<style>
@import "../../assets/budgetTracker/btracker.css";
</style>
