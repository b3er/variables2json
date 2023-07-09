import { createApp } from "vue";
import ui from "./index.vue";
import Variables from "@/pages/Variables.vue";
import Composites from "@/pages/Composites.vue";
import Settings from "@/pages/Settings.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import FloatingVue from "floating-vue";
import { pluginStore } from "./store";

const routes = [
  { path: "/", redirect: "/variables/list" },
  { path: "/variables/:type", component: Variables, name: "variables" },
  { path: "/composites", component: Composites },
  { path: "/settings", component: Settings }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

const store = pluginStore();

createApp(ui).use(store).use(router).use(FloatingVue).mount("#ui");
