<script lang="ts" setup>
import Icon from '../components/Icon.vue';
import VariablesList from '../components/VariablesList.vue';
import VariablesJson from '../components/VariablesJson.vue';
import { IconType } from '../models';
import { useRoute } from 'vue-router';

const route = useRoute();
</script>

<template>
  <div class="toolbar bb">
    <div class="icons">
      <Icon :type="IconType.Expand" />
      <Icon :type="IconType.Collapse" />
    </div>

    <div class="icons">
      <router-link to="/variables/list">
        <Icon :type="IconType.List" :class="route.params.type == 'list' ? 'active' : ''" />
      </router-link>
      <router-link to="/variables/json">
        <Icon :type="IconType.Json" :class="route.params.type == 'json' ? 'active' : ''" />
      </router-link>
    </div>
  </div>

  <VariablesList v-if="route.params.type == 'list'" />
  <VariablesJson v-else />
</template>

<style>
.toolbar {
  display: flex;
  padding: 4px 8px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
}

.icons {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
</style>
