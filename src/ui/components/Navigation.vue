<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <div class="nav bb">
    <router-link
      class="item"
      to="/variables/list"
      :class="[{ 'router-link-active': route.name === 'variables' }]"
      >Variables</router-link
    >
    <router-link class="item" to="/composites">Composites</router-link>

    <router-link class="item" to="/settings">Settings</router-link>
  </div>
  <Divider />
</template>

<style scoped>
.nav {
  display: flex;
  align-items: flex-start;
  align-self: stretch;
}

.item {
  color: var(--colors-muted-text);
  text-decoration: none;
  padding: 1rem 0.75rem;
}

.router-link-active {
  color: var(--colors-primary-text);
}

.item:hover {
  color: var(--colors-primary-text);
}
</style>
