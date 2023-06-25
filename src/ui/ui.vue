<script lang="ts" setup>
import Navigation from './components/Navigation.vue';
import Footer from './components/Footer.vue';
import { useStore } from 'vuex';

let store = useStore();

window.onmessage = (e) => {

  if (e.data.pluginMessage.type === 'updateState') {
    store.commit('update', e.data.pluginMessage.data);
  }
};

</script>

<template>
  <Navigation />
  <main>
    <router-view></router-view>
  </main>


  <Footer />
</template>

<style lang="scss">
@import 'floating-vue/dist/style.css';

.figma-light {
  --colors-panel-bg: #FFFFFF;
  --colors-panel-fg: #2C2C2C;
  --colors-window-background: #FFFFFF;
  --colors-primary-text: #000000;
  --colors-muted-text: rgba(0, 0, 0, 0.30);
  --colors-selected: rgba(0, 0, 0, 0.10);
  --colors-icon: #000000;
  --colors-divider: #E5E5E5;
}

.figma-dark {
  color-scheme: dark;
  --colors-panel-bg: rgba(255, 255, 255, 0.1);
  --colors-panel-fg: #FFFFFF;
  --colors-window-background: #2C2C2C;
  --colors-primary-text: rgba(255, 255, 255, 1);
  --colors-muted-text: rgba(255, 255, 255, .30);
  --colors-selected: rgba(255, 255, 255, .10);
  --colors-icon: #FFFFFF;
  --colors-divider: #444444;
}

html,
body {
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  height: 100%;
  width: 100%;
  padding: 0;
  margin: 0;
}

#ui {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

/*  */
body {
  background-color: var(--colors-window-background);
  color: var(--colors-primary-text);

  /* DefaultText */
  font-size: 11px;
  font-family: Inter;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.11px;
}

main {
  flex: auto;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: auto;
}


.regular {
  font-weight: 400;
}

.semi {
  font-weight: 500;
}

.small {
  font-size: 9px;
  line-height: 14px;
  font-weight: 400;
}

.bb {
  border-bottom: 1px solid var(--colors-divider);
}

.bt {
  border-top: 1px solid var(--colors-divider);
}

.active {
  background-color: var(--colors-selected);
  border-radius: 2px;
}
</style>