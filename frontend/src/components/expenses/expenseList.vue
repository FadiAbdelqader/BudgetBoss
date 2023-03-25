<template>
  <div class="container">
    <h1>List of Expenses</h1>
    <div id="chart"></div>
    <table class="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Category</th>
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
            <button class="btn btn-primary" @click="editExpense(expense)">Edit</button>
            <button class="btn btn-danger" @click="deleteExpense(expense._id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <button class="btn btn-success" @click="showExpenseForm()">Add Expense</button>
    <expense-form
      v-if="showForm"
      :expense="selectedExpense"
      :closeForm="closeExpenseForm"
      :getExpenses="getExpenses"
    ></expense-form>
  </div>
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
    return {
      expenses: [],
      selectedExpense: null,
      showForm: false,
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
      };

      // Plot chart
      Plotly.newPlot("chart", data, layout);
    },
  },
};
</script>

<style>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.table {
  width: 100%;
  margin-bottom: 20px;
  border-collapse: collapse;
  border-spacing: 0;
}

.table th {
  background-color: #f7f7f7;
  border-bottom: 2px solid #ddd;
  text-align: left;
  padding: 8px;
}

.table td {
  border-bottom: 1px solid #ddd;
  padding: 8px;
}

.btn {
  display: inline-block;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.btn:hover {
  background-color: #0056b3;
}

.btn-primary {
  background-color: #007bff;
}

.btn-success {
  background-color: #28a745;
}

.btn-danger {
  background-color: #dc3545;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  font-size: 1rem;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  font-size: 1rem;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}

.form-group select {
  font-size: 1rem;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ddd;
  width: 100%;
  box-sizing: border-box;
}

.form-group button {
  display: block;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  margin-top: 20px;
}

.form-group button:hover {
  background-color: #0056b3;
}
</style>
