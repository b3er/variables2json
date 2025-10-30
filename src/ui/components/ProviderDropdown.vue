<script lang="ts" setup>
import { IconType, ProviderType } from "@/models";
import { onClickOutside } from "@vueuse/core";
import Icon from "@/components/Icon.vue";
import { ref } from "vue";

let target = ref();
const emit = defineEmits(["update:modelValue"]);
defineProps<{
  modelValue: string;
}>();

const providers = [
  { value: ProviderType.Github, label: 'GitHub', icon: IconType.Github, color: '#333333' },
  { value: ProviderType.Gitlab, label: 'GitLab', icon: IconType.Gitlab, color: '#FC6D26' }
];

function toggleOptions() {
  let options = document.querySelector(".provider-options") as HTMLElement;
  if (options) {
    options.style.display = options.style.display == "block" ? "none" : "block";
  }
}

function onSelect(providerValue: string) {
  emit("update:modelValue", providerValue);
  let options = document.querySelector(".provider-options") as HTMLElement;
  if (options) {
    options.style.display = "none";
  }
}

function getProvider(value: string) {
  return providers.find(p => p.value === value) || providers[0];
}

onClickOutside(target, () => {
  let options = document.querySelector(".provider-options") as HTMLElement;
  if (options) {
    options.style.display = "none";
  }
});
</script>

<template>
  <div ref="target" class="provider-dropdown" @click="toggleOptions">
    <div class="selected-provider">
      <div class="provider-icon" :style="{ color: getProvider(modelValue).color }">
        <Icon :type="getProvider(modelValue).icon" />
      </div>
      <span>{{ getProvider(modelValue).label }}</span>
    </div>
    <Icon :type="IconType.ArrowDown" :muted="true" />

    <div class="provider-options">
      <div
        v-for="provider in providers"
        :key="provider.value"
        class="provider-option"
        :class="{ selected: provider.value == modelValue }"
        @click.stop="() => onSelect(provider.value)"
      >
        <div class="provider-icon" :style="{ color: provider.color }">
          <Icon :type="provider.icon" />
        </div>
        <span>{{ provider.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.provider-dropdown {
  display: flex;
  position: relative;
  align-items: center;
  justify-content: space-between;
  padding: 0 8px;
  border-radius: 4px;
  min-width: 120px;
  height: 32px;
  cursor: pointer;
  border: 1px solid var(--colors-window-background);

  .selected-provider {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
  }

  span {
    flex: auto;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .provider-icon {
    display: flex;
    align-items: center;
    width: 20px;
    height: 20px;
    
    :deep(svg) {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }
  }
}

.provider-dropdown:hover {
  border: 1px solid var(--colors-selected);
}

.provider-options {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: var(--colors-window-background);
  border: 1px solid var(--colors-selected);
  border-radius: 4px;
  z-index: 1000;
  padding: 4px 0;
  display: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.provider-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  cursor: pointer;
  transition: background-color 0.2s;

  &.selected {
    background-color: var(--colors-selected);
  }

  &:hover {
    background-color: var(--colors-active);
  }

  .provider-icon {
    display: flex;
    align-items: center;
    width: 20px;
    height: 20px;
    
    :deep(svg) {
      width: 20px;
      height: 20px;
      fill: currentColor;
    }
  }

  span {
    flex: 1;
  }
}
</style>
