import { createApp } from "vue";
import ui from "./ui.vue";
import SampleComponent from "./pages/Variables.vue";
import Composites from "./pages/Composites.vue";
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  { path: "/", component: SampleComponent },
  { path: "/composites", component: Composites },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

createApp(ui)
    .use(router)
    .mount("#ui");
