import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Controle from "../views/Controle.vue";
import Registro from "../views/Registro.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/controle", name: "Controle de Gastos", component: Controle },
  { path: "/controle/:nomeRegistro", component: Registro },
];

const router = new VueRouter({
  routes,
});

export default router;
