<script lang="ts" setup>
import { AppState, Server } from "@/models";
import { ComputedRef, computed } from "vue";
import { useStore } from "@/store";

let store = useStore();
let servers = computed(() => store.state.servers) as ComputedRef<Array<Server>>;
</script>

<template>
  <div class="sync-settings">
    <div v-if="servers.length == 0" class="placeholder"></div>
  </div>
</template>

<style scoped></style>
