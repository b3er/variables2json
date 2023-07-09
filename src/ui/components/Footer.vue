<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "@/store";
import { IconType } from "@/models";
import { jsonFromState } from "@/helpers";
import Icon from "@/components/Icon.vue";

let store = useStore();

let version = computed<string>(() => store.state.version);

function downloadJson() {
  let json = jsonFromState(store.state);
  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(json);

  let el = document.getElementById("downloadEl");

  el?.setAttribute("href", dataStr);
  el?.setAttribute("download", "variables.json");
  el?.click();

  parent.postMessage({ pluginMessage: "notify-downloaded" }, "*");
}
</script>

<template>
  <footer class="bt">
    <a id="downloadEl" style="display: none"></a>

    <span class="small">v{{ version }}</span>

    <div class="icons">
      <a
        href="https://github.com/mark-nicepants/variables2json-docs"
        target="_blank"
      >
        <Icon :type="IconType.Github" />
      </a>
      <Icon :type="IconType.Download" @click="downloadJson" />
    </div>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  padding: 0 0.5rem;
  align-self: stretch;
}

.small {
  color: var(--colors-muted-text);
}
</style>
