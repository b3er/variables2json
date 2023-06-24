<script lang="ts" setup>
import Icon from './Icon.vue';
import { IconType, VariableGroup } from '../models';
import { ref } from 'vue';

let list = ref<Record<string, VariableGroup>>({
  'Colors': { collapsed: true, comingSoon: false },
  'Numbers': { collapsed: true, comingSoon: false },
  'Strings': { collapsed: true, comingSoon: false },
  'Booleans': { collapsed: true, comingSoon: false },
  'Typography': { collapsed: true, comingSoon: true },
  'Effects': { collapsed: true, comingSoon: true },
})

function toggle(title: string) {
  let values = list.value;
  let old = values[title];

  if (old.comingSoon) return;

  list.value = {
    ...list.value,
    [title]: {
      ...old,
      collapsed: !old.collapsed
    }
  }
}
</script>

<template>
  <div class="card" :class="group.collapsed ? 'collapsed' : 'open'" v-for="(group, title) in list" :key="title">
    <header class="card-header semi bb" :class="group.comingSoon ? 'disabled' : ''" @click="() => toggle(title)">
      <div class="leading">
        <span class="card-header-icon">
          <Icon :type="IconType.CaretRight" v-if="group.collapsed" :muted="group.collapsed" />
          <Icon :type="IconType.CaretDown" v-if="!group.collapsed" :muted="group.collapsed" />
        </span>

        {{ title }}
      </div>
      <div v-if="group.comingSoon" class="small">
        Coming soon
      </div>
    </header>
    <div class="card-content" :class="{ 'is-hidden': group.collapsed }">
      <div class="content">
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.</p>
      </div>
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
