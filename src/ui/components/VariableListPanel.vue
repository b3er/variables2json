<script lang="ts" setup>
import Icon from "@/components/Icon.vue";
import { IconType } from "@/models";

let props = defineProps<{
  collapsed: boolean;
  itemCount: number;
  name: string;
  onClick: () => void;
}>();

function requestClick() {
  if (props.itemCount == 0) {
    return;
  }

  props.onClick();
}
</script>

<template>
  <div class="card" :class="props.collapsed ? 'collapsed' : 'open'">
    <header
      class="card-header semi bb"
      :class="props.itemCount == 0 ? 'disabled' : ''"
      @click="requestClick"
    >
      <div class="leading">
        <span class="card-header-icon">
          <Icon
            v-if="props.collapsed"
            :type="IconType.CaretRight"
            :muted="props.collapsed"
          />
          <Icon
            v-if="!props.collapsed"
            :type="IconType.CaretDown"
            :muted="props.collapsed"
          />
        </span>

        {{ props.name }}
      </div>
      <div class="small">
        <span>{{ itemCount }} items</span>
      </div>
    </header>
    <div class="card-content" :class="{ 'is-hidden': props.collapsed }">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.card-header {
  display: flex;
  justify-content: space-between;
  padding: 12px 8px;
  align-self: stretch;
}

.leading {
  display: flex;
  align-items: flex-start;
  align-self: stretch;
  gap: 4px;
}

.card-header:not(.disabled):hover {
  cursor: pointer;
  background-color: var(--colors-selected);
}

.card-header-icon {
  width: 16px;
  height: 16px;
}

.collapsed {
  color: var(--colors-muted-text);
  fill: var(--colors-muted-text) !important;
}

.is-hidden {
  display: none;
}
</style>
