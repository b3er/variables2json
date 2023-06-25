<script lang="ts" setup>
import { useStore } from 'vuex';
import { AppState } from '../models';
import { Store } from 'vuex/types/index.js';

let store = useStore() as Store<AppState>;
  

</script>

<template>

  <div class="content">
    Json
  </div>
</template>

<style>
</style>
