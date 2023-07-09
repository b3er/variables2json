<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "@/store";

let store = useStore();
let servers = computed(() => store.state.servers);
</script>

<template>
  <div class="sync-settings">
    <div v-if="servers.length == 0" class="placeholder regular bb">
      To synchronize the json content, you need to add providers. Click the +
      button to add a server for synchronization.
    </div>
    <div v-else>{{ servers.length }} servers found</div>
  </div>
</template>

<style scoped>
.placeholder {
  text-align: center;
  padding: 8px 26px;
}
</style>
