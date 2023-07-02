<script lang="ts" setup>
defineProps<{
  number: number;
}>();
</script>

<template>
  <div class="panel">
    {{ number }}
  </div>
</template>

<style scoped>
.panel {
  background-color: var(--colors-panel-bg);
  color: var(--colors-panel-fg);
  text-align: center;
}
</style>
