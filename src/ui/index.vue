<script lang="ts" setup>
import Navigation from "@/components/Navigation.vue";
import Footer from "@/components/Footer.vue";

import ResizeIcon from "@/components/ResizeIcon.vue";
import { SettingsData } from "@/models";
import { useStore } from "@/store";
import { computed } from 'vue';

let store = useStore();
let isLoadingPR = computed<boolean>(() => store.state.loadingPR);

// store.dispatch("loadSettings");
window.onmessage = (e) => {
  if (e.data.pluginMessage.type === "updateState") {
    console.log("updateState", e.data.pluginMessage.data);
    store.commit("update", e.data.pluginMessage.data);
  }
};

// Send message to plugin when settings change
store.watch(
  (state) => state.settings,
  (proxy) => {
    let settings = structuredClone({ ...proxy }) as SettingsData;

    console.log();
    parent.postMessage(
      {
        pluginMessage: {
          type: "updateSettings",
          data: settings,
        },
      },
      "*"
    );
  }
);
</script>

<template>
  <div v-if="isLoadingPR" class="loading-container">
    <p>Trying to create pr...</p>
  </div>
  <div v-else>
  <Navigation />
  <main>
    <router-view></router-view>

    <ResizeIcon class="corner-resize" />
  </main>

  <Footer />
</div>
</template>

<style lang="scss">
@import "floating-vue/dist/style.css";

.figma-light {
  --colors-active: #18a0fb;
  --colors-panel-bg: #ffffff;
  --colors-panel-fg: #2c2c2c;
  --colors-window-background: #ffffff;
  --colors-primary-text: #000000;
  --colors-muted-text: rgba(0, 0, 0, 0.3);
  --colors-selected: rgba(0, 0, 0, 0.1);
  --colors-icon: #000000;
  --colors-divider: #e5e5e5;
}

.figma-dark {
  color-scheme: dark;
  --colors-active: #18a0fb;
  --colors-panel-bg: rgba(255, 255, 255, 0.1);
  --colors-panel-fg: #ffffff;
  --colors-window-background: #2c2c2c;
  --colors-primary-text: rgba(255, 255, 255, 1);
  --colors-muted-text: rgba(255, 255, 255, 0.3);
  --colors-selected: rgba(255, 255, 255, 0.1);
  --colors-icon: #ffffff;
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

  overflow-x: hidden;
}

main {
  flex: auto;
  overflow-y: auto;
  scroll-behavior: auto;
}

.title {
  display: block;
  font-size: 1.2em;
  line-height: 16px;
  font-weight: 600;
  padding: 8px 0;
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

.scroll-view {
  flex: auto;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: auto;
}

.corner-resize {
  position: absolute;
  right: 1px;
  bottom: 1px;
  cursor: nwse-resize;
}
.loading-container {
  justify-content: center;
  align-items: center;
  display: flex;
  flex:1;
  
}
</style>
