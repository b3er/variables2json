<script lang="ts" setup>
import Icon from '../components/Icon.vue';
import ViewToggle from '../components/ViewToggle.vue';
import { IconType } from '../models';
</script>

<template>
  <div class="toolbar">
    <div class="left-icons">
      <Icon :type="IconType.Expand" />
      <Icon :type="IconType.Collapse" />
    </div>

    <div class="right-icons">
      <ViewToggle />
    </div>
  </div>
</template>

<style>
.toolbar {
  display: flex;
  padding: 4px 8px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}

.left-icons {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
</style>
