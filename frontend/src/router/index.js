import Vue from "vue";
import Router from "vue-router";
import ExpenseList from '../components/expenses/expenseList.vue';
import ToBuy from '../components/tobuy/ToBuy.vue'
import ExpenseResume from '../components/expenses/expenseResume.vue'

import Comparator from "../components/comparator/comparator.vue";
import Results from "../components/comparator/results.vue";

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
      path: '/expenses/export',
      name: 'expenses',
      component: ExpenseResume
    },
    {
      path: '/tobuy',
      name: 'ToBuy',
      component: ToBuy,
      meta: {
        title:'To Buy List'
      }
    },
    {
      path: "/comparator",
      component: Comparator 
    },
    { 
      path: "/results/:region/:carburant",
      name: "results", 
      component: Results 
    }
  ]
});
