<script lang="ts" setup>
import { useStore } from "@/store";
import { computed } from "vue";
import { jsonFromState } from "@/helpers";

let store = useStore();
let json = computed<string>(() => jsonFromState(store.state));
</script>

<template>
  <div class="content scroll-view">
    <pre>{{ json }}</pre>
  </div>
</template>

<style scoped>
.content {
  -webkit-user-select: text;
  -ms-user-select: text;
  user-select: text;

  padding: 0 1em;
}

pre {
  font-size: 1.2em;
  line-height: 1.5em;
}
</style>
