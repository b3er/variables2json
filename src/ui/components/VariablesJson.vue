<script lang="ts" setup>
import { useStore } from 'vuex';
import { AppState, TokenType, VariableToken } from '../models';
import { Store } from 'vuex/types/index.js';
import { computed } from 'vue';
import { ModeAwareCache } from 'typescript';

let store = useStore() as Store<AppState>;

interface VariableValue {
  name: string;
  type: TokenType
  value: any;
}

interface CollectionMode {
  name: string;
  variables: Array<VariableValue>;
}

interface Collection {
  name: string;
  modes: Array<CollectionMode>;
}

let json = computed<string>(() => {

  let output = new Array<Collection>();
  let variables = store.state.variables;

  for (let variable of variables) {
    let collection = output.find(c => c.name == variable.collection);

    if (collection == undefined) {
      collection = {
        name: variable.collection,
        modes: []
      } as Collection;

      output.push(collection);
    }

    for (let value of variable.values) {
      let mode = collection?.modes.find(m => m.name == value.modeName);

      let tokenValue = {
        name: variable.name,
        type: variable.type,
        value: value.value,
      } as VariableValue;

      if (mode != undefined) {
        mode.variables.push(tokenValue);
      } else {
        collection?.modes.push({
          name: value.modeName,
          variables: [tokenValue]
        });
      }
    }
  }

  return JSON.stringify({
    version: 1,
    metadata: {},
    collections: output
  }, null, 2);
});
</script>

<template>
  <div class="page">
    <div class="content scroll-view">
      <pre>{{ json }}</pre>
    </div>
  </div>
</template>

<style scoped>
.page {
  overflow-y: hidden;
  height: 92%;
}
</style>
