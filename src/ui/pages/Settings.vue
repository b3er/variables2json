<script lang="ts" setup>
import { useStore, Store } from "vuex";
import DropDown from "@/components/DropDown.vue";
import { computed } from "vue";
import { AppState } from "@/models";

let store = useStore() as Store<AppState>;

let excludePrivate = computed({
  get: () => store.state.settings.excludePrivate,
  set: (checked) => store.commit("settingsTogglePrivate", checked)
});

let colorFormat = computed({
  get: () => store.state.settings.colorFormat,
  set: (format) => store.commit("settingsSetColorFormat", format)
});
</script>

<template>
  <div class="page">
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
    </div>
  </div>
</template>

<style scoped lang="scss">
input[type="checkbox"] {
  accent-color: var(--colors-active);
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
