import Vue from "vue";
import Router from "vue-router";
import ExpenseList from '../components/expenses/expenseList.vue';
import ToBuy from '../components/tobuy/ToBuy.vue'


Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/expenses',
      name: 'expenses',
      component: ExpenseList
    },
    {
      path: '/tobuy',
      name: 'ToBuy',
      component: ToBuy,
      meta: {
        title:'To Buy List'
      }
    }
  ]
});
