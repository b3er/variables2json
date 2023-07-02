<script lang="ts" setup>
import { computed } from "vue";

let props = defineProps<{
  color: {
    r: number;
    g: number;
    b: number;
    a: number;
  };
}>();

let solidColor = computed(() => {
  let r = props.color.r;
  let g = props.color.g;
  let b = props.color.b;

  return `rgba(${r}, ${g}, ${b}, 1)`;
});

let actualColor = computed(() => {
  let r = props.color.r;
  let g = props.color.g;
  let b = props.color.b;
  let a = props.color.a;

  return `rgba(${r}, ${g}, ${b}, ${a})`;
});
</script>

<template>
  <div class="color-value">
    <div class="solid-panel" :style="{ backgroundColor: solidColor }" />
    <div class="opacity">
      <div class="opacity-bg" />
      <div class="opacity-panel" :style="{ backgroundColor: actualColor }" />
    </div>
  </div>
</template>

<style scoped>
.color-value {
  display: flex;
  align-items: center;
  width: 16px;
  height: 16px;
  border-radius: 2px;
}

.solid-panel {
  width: 50%;
  height: 100%;
  border-radius: 2px 0 0 2px;
}

.opacity-panel {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 0 2px 2px 0;
}

.opacity-bg {
  position: absolute;
  background: #eee
    url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill-opacity=".25"> <rect x="200" width="200" height="200" /><rect y="200" width="200" height="200" /></svg>');
  background-size: 5px 5px;
  width: 100%;
  height: 100%;
  border-radius: 0 2px 2px 0;
}

.opacity {
  position: relative;
  width: 50%;
  height: 100%;
}
</style>
