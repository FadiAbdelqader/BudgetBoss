<template>
  <div class="modal" tabindex="-1" role="dialog" v-show="show">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">{{ title }}</h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
            @click="closeForm"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" class="form-control" id="name" v-model="expense.name" />
            </div>
            <div class="form-group">
              <label for="amount">Amount</label>
              <input
                type="number"
                class="form-control"
                id="amount"
                v-model="expense.amount"
              />
            </div>
            <div class="form-group">
              <label for="category">Category</label>
              <select class="form-control" id="category" v-model="expense.category">
                <option v-for="category in categories" :key="category">
                  {{ category }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label for="date">Date</label>
              <input type="date" class="form-control" id="date" v-model="expense.date" />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
            @click="closeForm"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary" @click="saveExpense">
            Save changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/api.js";

export default {
  name: "ExpenseForm",
  props: {
    expense: {
      type: Object,
      default: () => ({
        name: "",
        amount: 0,
        category: "",
        date: new Date().toISOString().substr(0, 10),
      }),
    },
    closeForm: {
      type: Function,
      required: true,
    },
    show: {
      type: Boolean,
      default: true,
    },
    getExpenses: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      categories: [
        "Alimentation",
        "Hébergement",
        "Transport",
        "Divertissement",
        "Vêtements",
        "Soins de santé",
        "Loisirs",
        "Éducation",
        "Impôts",
        "Assurances",
        "Investissements",
        "Dons",
        "Autres",
      ],
    };
  },
  computed: {
    title() {
      return this.expense._id ? "Edit Expense" : "Add Expense";
    },
  },
  methods: {
    async saveExpense() {
      try {
        if (this.expense._id) {
          await api.put(`/expenses/${this.expense._id}`, this.expense);
        } else {
          await api.post("/expenses", this.expense);
        }
        this.showForm = false;
        await this.getExpenses();
        this.$emit("expense-added");
        this.$emit("close");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style>
@import "../../assets/budgetTracker/btracker.css";
</style>
