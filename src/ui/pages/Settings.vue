<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "@/store";
import { IconType } from "@/models";
import DropDown from "@/components/DropDown.vue";
import SyncSettingsList from "@/components/SyncSettingsList.vue";
import Icon from "@/components/Icon.vue";

let store = useStore();

let excludePrivate = computed({
  get: () => store.state.settings.excludePrivate,
  set: (checked) => store.commit("settingsTogglePrivate", checked)
});

let colorFormat = computed({
  get: () => store.state.settings.colorFormat,
  set: (format) => store.commit("settingsSetColorFormat", format)
});
let repo = computed({
  get: () => store.state.settings.repo,
  set: (repo) => {
    store.commit("settingsSetRepo", repo)
  }
});
let githubToken = computed({
  get: () => store.state.settings.githubToken,
  set: (token) => {
    store.commit("settingsSetGithubToken", token)
  }
});
</script>

<template>
  <div class="page">
    <!-- Export settings -->
    <div class="section">
      <span class="title">Export settings</span>

      <div class="row regular">
        <label>Don't export private name (leading underscore)</label>
        <div class="value">
          <input v-model="excludePrivate" type="checkbox" />
        </div>
      </div>

      <div class="row regular">
        <label>Color format</label>
        <div class="value">
          <DropDown v-model="colorFormat" :options="['hex', 'rgba']" />
        </div>
      </div>
      <div class="row regular">
        <label>Repository name (username/repo)</label>
        <div class="value">

          <input v-model="repo" type="text" />
        </div>
      </div>

      <div class="row regular">
        <label>GitHub Token</label>
        <div class="value">
          <input v-model="githubToken" type="password" />
        </div>
    </div>

    <!-- Sync settings -->
    <div class="section">
      <div class="header">
        <span class="title">Server sync</span>
        <router-link to="/settings/add-server">
          <Icon :type="IconType.Add" />
        </router-link>
      </div>

      <SyncSettingsList />
     
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.section {
  padding-top: 4px;
}

input[type="checkbox"] {
  accent-color: var(--colors-active);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  padding: 8px;
}

.row {
  min-height: 40px;
  border-bottom: 1px solid var(--colors-selected);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
}

.value {
  min-width: 100px;
  display: flex;
  justify-content: flex-end;
}
</style>
