<script lang="ts" setup>
import { IconType } from "@/models";
import Icon from "@/components/Icon.vue";

const emit = defineEmits(["update:modelValue"]);
defineProps<{
  options: Array<String>;
  modelValue: String;
}>();

function toggleOptions() {
  let options = document.querySelector(".options") as HTMLElement;
  options.style.display = options.style.display == "block" ? "none" : "block";
}

function onSelect(option: String) {
  console.log("click option", option);
  emit("update:modelValue", option);
}
</script>

<template>
  <div class="dropdown" @click="toggleOptions">
    <span>{{ modelValue }}</span>
    <Icon :type="IconType.ArrowDown" :muted="true" />

    <div class="options">
      <div
        v-for="option in options"
        :key="option"
        class="option"
        :class="{ selected: option == modelValue }"
        @click="() => onSelect(option)"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.dropdown {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  border-radius: 4px;
  min-width: 100px;
  height: 32px;
  border: 1px solid var(--colors-selected);
  cursor: pointer;
}

.options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: var(--colors-window-background);
  border: 1px solid var(--colors-selected);
  border-radius: 4px;
  z-index: 1;
  padding: 8px 0;
  display: none;
}

.dropdown:hover {
  border: 1px solid var(--colors-primary-text);
}

.option {
  padding: 4px 8px;

  &.selected {
    background-color: var(--colors-selected);
  }

  &:hover {
    background-color: var(--colors-active);
  }
}
</style>
