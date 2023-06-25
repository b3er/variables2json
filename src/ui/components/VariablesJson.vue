<script lang="ts" setup>
import { useStore } from 'vuex';
import { AppState, TokenType, VariableToken } from '../models';
import { Store } from 'vuex/types/index.js';
import { computed } from 'vue';
import { jsonFromState } from '../helpers';

let store = useStore() as Store<AppState>;
let json = computed<string>(() => jsonFromState(store.state));

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

.content {
  -webkit-user-select: text;
  -ms-user-select: text;
  user-select: text;

  padding: 0 1em;
}
</style>
