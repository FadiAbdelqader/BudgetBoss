<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">Budget Tracker</a>
      </div>
    </nav>
    <div class="container mt-4">
      <expense-list></expense-list>
    </div>
  </div>
</template>

<script>
import ExpenseList from "./components/expenses/expenseList.vue";
import ExpenseForm from "./components/expenses/expenseForm.vue";

export default {
  name: "App",
  components: {
    ExpenseList,
    ExpenseForm,
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
