<script lang="ts" setup>
import VariableListPanel from './VariableListPanel.vue';
import { VariableGroup, TokenType, AppState, VariableToken } from '../models';
import { computed, ref } from 'vue';
import ColorBox from './ColorBox.vue';
import { useStore } from 'vuex';
import { Store } from 'vuex/types/index.js';
import NumberBox from './NumberBox.vue';
import StringBox from './StringBox.vue';
import BooleanBox from './BooleanBox.vue';

let store = useStore() as Store<AppState>;

function sanitizedValue(type: TokenType, value: any) {
  if (type == TokenType.Color) {
    let r = Math.floor(value.r * 255);
    let g = Math.floor(value.g * 255);
    let b = Math.floor(value.b * 255);
    let a = value.a;

    console.log(r, g, b, a);

    // To Hex string with alpha
    return `#${r.toString(16)}${g.toString(16)}${b.toString(16)} (${Math.floor(a * 100)}%)`.toUpperCase();
  }

  return value;
}

interface RowState {
  collapsed: boolean;
  name: string;
  comingSoon: boolean;
}

let rowStates = ref<Map<TokenType, RowState>>(new Map<TokenType, RowState>([
  [TokenType.Color, {
    collapsed: true,
    name: 'Colors',
    comingSoon: false
  }],
  [TokenType.Number, {
    collapsed: true,
    name: 'Numbers',
    comingSoon: false
  }],
  [TokenType.String, {
    collapsed: true,
    name: 'Strings',
    comingSoon: false
  }],
  [TokenType.Boolean, {
    collapsed: true,
    name: 'Booleans',
    comingSoon: false
  }],
  [TokenType.Typography, {
    collapsed: true,
    name: 'Typography',
    comingSoon: true
  }],
  [TokenType.Effect, {
    collapsed: true,
    name: 'Effects',
    comingSoon: true
  }],
]));

let list = computed<Map<TokenType, Array<VariableToken>>>(() => {
  let variables = store.state.variables;

  let groups = new Map<TokenType, Array<VariableToken>>();

  rowStates.value.forEach((value, key) => {
    let group = groups.get(key);

    if (group == undefined) {
      group = new Array<VariableToken>();
      groups.set(key, group);
    }

    variables.forEach((variable) => {
      if (variable.type == key) {
        group!.push(variable);
      }
    });
  });

  return groups;
})

function toggle(type: TokenType) {
  let collapsed = rowStates.value.get(type)!.collapsed;
  updateRow(type, !collapsed);
}

function updateRow(type: TokenType, collapsed: boolean) {
  rowStates.value.set(type, {
    ...rowStates.value.get(type)!,
    collapsed: collapsed
  });
}

function expandAll() {
  rowStates.value.forEach((value, key) => {
    if (value.comingSoon || list.value.get(key)!.length == 0) {
      return;
    }
    updateRow(key, false);
  });
}

function collapseAll() {
  rowStates.value.forEach((value, key) => {
    updateRow(key, true);
  });
}

function comingSoon(type: TokenType) {
  return rowStates.value.get(type)?.comingSoon == true;
}

function isCollapsed(type: TokenType): boolean {
  return rowStates.value.get(type)?.collapsed == true;
}

function rowName(type: TokenType): string {
  return rowStates.value.get(type)!.name;
}

defineExpose({
  expandAll,
  collapseAll
})

</script>

<template>
  <div class="page">
    <div class="scroll-view">
      <VariableListPanel v-for="[type, tokens] in list" :collapsed="isCollapsed(type)" :name="rowName(type)"
        :on-click="() => toggle(type)" :coming-soon="comingSoon(type)" :item-count="tokens.length">

        <div v-for="token in tokens" class="token-row row regular bb">
          <span class="collection">{{ token.collection }}</span>
          <span class="name">{{ token.name }}</span>

          <div class="values">
            <div v-for="value in token.values" class="value">
              <VTooltip>
                <ColorBox v-if="token.type == TokenType.Color" :color="value.value" />
                <NumberBox v-else-if="token.type == TokenType.Number" :number="value.value" />
                <StringBox v-else-if="token.type == TokenType.String" />
                <BooleanBox v-else-if="token.type == TokenType.Boolean" :value="value.value" />

                <template #popper>
                  {{ value.modeName }}: {{ sanitizedValue(token.type, value.value) }}
                </template>
              </VTooltip>
            </div>
          </div>
        </div>
      </VariableListPanel>
    </div>
  </div>
</template>

<style scoped>
.page {
  overflow-y: hidden;
  height: 92%;
}

.scroll-view {
  flex: auto;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  scroll-behavior: auto;
}

.row {
  display: flex;
  align-items: center;
  padding: 4px 8px 4px 28px;
  align-self: stretch;
  min-height: 40px;
  color: var(--colors-muted-text);
}

.collection {
  width: 60px;
  text-overflow: ellipsis;
  max-lines: 1;
}

.name {
  flex: auto;
  text-overflow: ellipsis;
  max-lines: 1;
}

.values {
  display: flex;
  align-items: center;
  gap: 2px;
}

.value {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 2px solid var(--colors-divider);
}
</style>
