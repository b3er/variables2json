<script lang="ts" setup>
import Icon from './Icon.vue';
import VariableListPanel from './VariableListPanel.vue';
import { IconType, VariableGroup, VariableToken, ModeValue, TokenType } from '../models';
import { ref, toValue } from 'vue';
import ColorBox from './ColorBox.vue';


let list = ref<Array<VariableGroup>>([
  {
    name: 'Colors',
    collapsed: true,
    comingSoon: false,
    tokens: [
      {
        collection: 'Theme',
        name: 'colors/windowBackground',
        type: TokenType.Color,
        values: [
          {
            modeName: 'Light',
            value: 'rgba(255, 255, 255, .5)'
          },
          {
            modeName: 'Dark',
            value: '#2C2C2C'
          }
        ]
      }
    ],
  },
  {
    name: 'Numbers',
    collapsed: true,
    comingSoon: false,
    tokens: [

    ]
  },
  {
    name: 'Strings',
    collapsed: true,
    comingSoon: false,
    tokens: [

    ]
  },
  {
    name: 'Booleans',
    collapsed: true,
    comingSoon: false,
    tokens: [

    ]
  },
  {
    name: 'Typography',
    collapsed: true,
    comingSoon: true,
    tokens: [

    ]
  },
  {
    name: 'Effects',
    collapsed: true,
    comingSoon: true,
    tokens: [

    ]
  },
])


function toggle(index: number) {
  let values = list.value;
  let old = values[index];

  if (old.comingSoon) return;
  list.value[index] = {
    ...old,
    collapsed: !old.collapsed
  }
}

function expandAll() {
  list.value.map((group) => {
    if (!group.comingSoon) {
      group.collapsed = false;
    }
  })
}

function collapseAll() {
  list.value.map((group) => {
    group.collapsed = true;
  })
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
        :on-click="() => toggle(index)" :coming-soon="group.comingSoon">

        <div v-for="token in group.tokens" class="token-row row regular">
          <span class="collection">{{ token.collection }}</span>
          <span class="name">{{ token.name }}</span>

          <div class="values">
            <div v-for="value in token.values" class="value">
              <VTooltip>
                <ColorBox v-if="token.type == TokenType.Color" :color="value.value" />

                <template #popper>
                  {{ value.modeName }}: {{ value.value }}
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
