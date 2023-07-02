<script lang="ts" setup>
import { IconType } from "@/models";
import Icon from "@/components/Icon.vue";

defineProps<{
  value: boolean;
}>();
</script>

<template>
  <div class="panel">
    <Icon v-if="value" :type="IconType.Check" />
    <Icon v-if="!value" :type="IconType.Uncheck" />
  </div>
</template>

<style scoped></style>
