<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStore } from "@/store";
import VariableListPanel from "@/components/VariableListPanel.vue";
import ColorBox from "@/components/ColorBox.vue";
import NumberBox from "@/components/NumberBox.vue";
import StringBox from "@/components/StringBox.vue";
import BooleanBox from "@/components/BooleanBox.vue";
import { TokenType, VariableToken } from "@/models";

let store = useStore();

function sanitizedValue(type: TokenType, value: any) {
  if (type == TokenType.Color) {
    let r = value.r.toString(16).padStart(2, "0");
    let g = value.g.toString(16).padStart(2, "0");
    let b = value.b.toString(16).padStart(2, "0");
    let a = value.a;

    // To Hex string with alpha
    return `#${r}${g}${b} (${Math.floor(a * 100)}%)`.toUpperCase();
  }

  return value;
}

interface RowState {
  collapsed: boolean;
  name: string;
}

let rowStates = ref<Map<TokenType, RowState>>(
  new Map<TokenType, RowState>([
    [
      TokenType.Color,
      {
        collapsed: true,
        name: "Colors",
      },
    ],
    [
      TokenType.Number,
      {
        collapsed: true,
        name: "Numbers",
      },
    ],
    [
      TokenType.String,
      {
        collapsed: true,
        name: "Strings",
      },
    ],
    [
      TokenType.Boolean,
      {
        collapsed: true,
        name: "Booleans",
      },
    ],
    [
      TokenType.Typography,
      {
        collapsed: true,
        name: "Typography",
      },
    ],
    [
      TokenType.Effect,
      {
        collapsed: true,
        name: "Effects",
      },
    ],
    [
      TokenType.Grid,
      {
        collapsed: true,
        name: "Grids",
      },
    ],
  ])
);

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
});

function toggle(type: TokenType) {
  let collapsed = rowStates.value.get(type)!.collapsed;
  updateRow(type, !collapsed);
}

function updateRow(type: TokenType, collapsed: boolean) {
  rowStates.value.set(type, {
    ...rowStates.value.get(type)!,
    collapsed: collapsed,
  });
}

function expandAll() {
  rowStates.value.forEach((value, key) => {
    if (list.value.get(key)!.length == 0) {
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

function isCollapsed(type: TokenType): boolean {
  return rowStates.value.get(type)?.collapsed == true;
}

function rowName(type: TokenType): string {
  return rowStates.value.get(type)!.name;
}

defineExpose({
  expandAll,
  collapseAll,
});
</script>

<template>
  <div class="scroll-view">
    <VariableListPanel
      v-for="[type, tokens] in list"
      :key="type"
      :collapsed="isCollapsed(type)"
      :name="rowName(type)"
      :on-click="() => toggle(type)"
      :item-count="tokens.length"
    >
      <div
        v-for="token in tokens"
        :key="token.name"
        class="token-row row regular bb"
      >
        <span class="collection">{{ token.collection }}</span>
        <span class="name">{{ token.name }}</span>

        <div class="values">
          <div
            v-for="value in token.values"
            :key="value.value + '-' + token.name"
          >
            <div v-if="value.isAlias"></div>
            <div v-else class="value">
              <VTooltip>
                <ColorBox
                  v-if="token.type == TokenType.Color"
                  :color="value.value"
                />
                <NumberBox
                  v-else-if="token.type == TokenType.Number"
                  :number="value.value"
                />
                <StringBox v-else-if="token.type == TokenType.String" />
                <BooleanBox
                  v-else-if="token.type == TokenType.Boolean"
                  :value="value.value"
                />

                <template #popper>
                  {{ value.modeName }}:
                  {{ sanitizedValue(token.type, value.value) }}
                </template>
              </VTooltip>
            </div>
          </div>
        </div>
      </div>
    </VariableListPanel>
  </div>
</template>

<style scoped>
.row {
  display: flex;
  align-items: center;
  padding: 4px 8px 4px 28px;
  align-self: stretch;
  min-height: 40px;
  color: var(--colors-muted-text);
}

.collection {
  width: 70px;
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
