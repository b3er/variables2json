import { createApp } from "vue";
import ui from "./ui.vue";
import Variables from "./pages/Variables.vue";
import Composites from "./pages/Composites.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import FloatingVue from "floating-vue";

const routes = [
  { path: "/", redirect: "/variables/list" },
  { path: "/variables/:type", component: Variables, name: "variables" },
  { path: "/composites", component: Composites },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(ui)
  .use(router)
  .use(FloatingVue)
  .mount("#ui");
