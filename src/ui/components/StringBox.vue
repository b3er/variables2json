<script lang="ts" setup>
import { IconType } from "@/models";
import Icon from "@/components/Icon.vue";
</script>

<template>
  <div class="panel">
    <Icon :type="IconType.Text" />
  </div>
</template>

<style scoped>
.panel {
  background-color: var(--colors-panel-bg);
  color: var(--colors-panel-fg);
  text-align: center;
}
</style>
