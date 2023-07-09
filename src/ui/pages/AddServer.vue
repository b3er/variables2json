<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "@/store";
import Icon from "@/components/Icon.vue";
import { IconType } from "@/models";

let store = useStore();

let servers = computed(() => store.state.servers);

let url = computed(() => "");
let username = computed(() => "");
let password = computed(() => "");
</script>

<template>
  <div class="dialog">
    <div class="content">
      <div class="header bb">
        <router-link to="/settings">
          <Icon :type="IconType.Back" />
        </router-link>
        <span class="title">Add server</span>
      </div>

      <div class="section">
        <div class="row regular">
          <label>Server URL</label>
          <div class="value">
            <input v-model="url" type="text" />
          </div>
        </div>

        <div class="row regular">
          <label>Username</label>
          <div class="value">
            <input v-model="username" type="text" />
          </div>
        </div>

        <div class="row regular">
          <label>Password</label>
          <div class="value">
            <input v-model="password" type="password" />
          </div>
        </div>
      </div>

      <div class="footer">
        <button class="button">Add</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 0.5rem;
  align-self: stretch;
}

.dialog {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: var(--colors-window-background);
}

.row {
  padding-top: 4px;
}

.value {
  display: flex;
}

label {
  display: block;
  padding: 0 8px;
  font-weight: bold;
}

input {
  border-radius: 2px;
  min-height: 28px;
  background-color: var(--colors-window-background);
  border: 1px solid var(--colors-selected);
  padding: 1px 4px;
  margin: 4px 8px;
  flex: 1;
}

input:focus {
  border: 2px solid var(--colors-active);
  padding: 0px 3px;
}

textarea:focus,
input:focus {
  outline: none;
}
</style>
