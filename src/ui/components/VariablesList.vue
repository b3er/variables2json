<script lang="ts" setup>
import VariableListPanel from './VariableListPanel.vue';
import { VariableGroup, TokenType, AppState, VariableToken } from '../models';
import { computed, ref } from 'vue';
import ColorBox from './ColorBox.vue';
import { useStore } from 'vuex';

let store = useStore();

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

let collapsedStates = ref<Map<TokenType, boolean>>(new Map<TokenType, boolean>([
  [TokenType.Color, true],
  [TokenType.Number, true],
  [TokenType.String, true],
  [TokenType.Boolean, true],
  [TokenType.Effect, true],
  [TokenType.Typography, true],
]));

let list = computed<Array<VariableGroup>>(() => {
  let variables = (store.state as AppState).variables;
  let states = collapsedStates.value;

  let groups = variables.reduce((groups, variable) => {
    let group = groups.find((group) => group.name == variable.type);
    states.get(variable.type);

    if (group == undefined) {
      group = {
        name: variable.type,
        type: variable.type,
        collapsed: states.get(variable.type) ?? true,
        comingSoon: false,
        tokens: []
      } as VariableGroup;

      groups.push(group);
    }

    group!.tokens!.push(variable);

    return groups;
  }, new Array<VariableGroup>);

  return groups;
})

function toggle(type: TokenType) {
  collapsedStates.value.set(type, !collapsedStates.value.get(type));
}

function expandAll() {
  collapsedStates.value = new Map<TokenType, boolean>([
    [TokenType.Color, false],
    [TokenType.Number, false],
    [TokenType.String, false],
    [TokenType.Boolean, false],
    [TokenType.Effect, false],
    [TokenType.Typography, false],
  ]);
}

function collapseAll() {
  collapsedStates.value = new Map<TokenType, boolean>([
    [TokenType.Color, true],
    [TokenType.Number, true],
    [TokenType.String, true],
    [TokenType.Boolean, true],
    [TokenType.Effect, true],
    [TokenType.Typography, true],
  ]);
}

defineExpose({
  expandAll,
  collapseAll
})

</script>

<template>
  <div class="page">
    <div class="scroll-view">
      <VariableListPanel v-for="(group, index) in list" :collapsed="group.collapsed" :name="group.name"
        :on-click="() => toggle(group.type)" :coming-soon="group.comingSoon">

        <div v-for="token in group.tokens" class="token-row row regular">
          <span class="collection">{{ token.collection }}</span>
          <span class="name">{{ token.name }}</span>

          <div class="values">
            <div v-for="value in token.values" class="value">
              <VTooltip>
                <ColorBox v-if="token.type == TokenType.Color" :color="value.value" />

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
