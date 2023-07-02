<script lang="ts" setup>
import { ref } from "vue";
import { IconType, ResizeOptions } from "@/models";
import Icon from "@/components/Icon.vue";

const capturing = ref(false);

const minWidth = 250;
const minHeight = 300;

const maxWidth = 350;
const maxHeight = 800;

function resizeWindow(e) {
  if (capturing.value != true) return;

  const options = {
    w: Math.floor(Math.max(minWidth, Math.min(maxWidth, e.clientX))),
    h: Math.floor(Math.max(minHeight, Math.min(maxHeight, e.clientY)))
  } as ResizeOptions;

  parent.postMessage({ pluginMessage: { type: "resize", data: options } }, "*");
}

function onPointerDown(e: PointerEvent) {
  if (e.target instanceof Element) {
    e.target.setPointerCapture(e.pointerId);
    capturing.value = true;
  }
}

function onPointerUp(e: PointerEvent) {
  if (e.target instanceof Element) {
    e.target.releasePointerCapture(e.pointerId);
    capturing.value = false;
  }
}
</script>

<template>
  <Icon
    :type="IconType.CornerResize"
    :dark="true"
    class="corner-resize"
    @pointerdown="onPointerDown"
    @pointermove="resizeWindow"
    @pointerup="onPointerUp"
  />
</template>

<style scoped></style>
