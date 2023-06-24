import { createApp } from "vue";
import { createStore } from "vuex";
import ui from "./ui.vue";
import Variables from "./pages/Variables.vue";
import Composites from "./pages/Composites.vue";
import { createRouter, createWebHashHistory } from "vue-router";
import FloatingVue from "floating-vue";
import { AppState, VariableGroup } from "./models";

const routes = [
  { path: "/", redirect: "/variables/list" },
  { path: "/variables/:type", component: Variables, name: "variables" },
  { path: "/composites", component: Composites },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

const store = createStore({
  state () {
    return {
      version: "0.0.1",
      loaded: false,
      variables: [],
    } as AppState
  },
  mutations: {
    update (state: AppState, data: AppState) {
      console.log('update it!');
      state.version = data.version;
      state.loaded = data.loaded;
      state.variables = data.variables;
    },
  }
})

createApp(ui)
  .use(store)
  .use(router)
  .use(FloatingVue)
  .mount("#ui");
