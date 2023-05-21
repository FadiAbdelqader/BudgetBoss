import Vue from "vue";
import VueRouter from "vue-router";

import Comparator from "./components/comparator/comparator.vue";
import Results from "./components/comparator/results.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    { path: "/comparator", component: Comparator },
    { path: "/results/:region/:carburant", name: "results", component: Results },
  ],
});

export default router;