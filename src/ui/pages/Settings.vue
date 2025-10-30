<script lang="ts" setup>
import {computed} from "vue";
import {useStore} from "@/store";
import {ProviderType} from "@/models";
import DropDown from "@/components/DropDown.vue";
import ProviderDropdown from "@/components/ProviderDropdown.vue";

let store = useStore();

let excludePrivate = computed({
  get: () => store.state.settings.excludePrivate,
  set: (checked) => store.commit("settingsTogglePrivate", checked)
});

let colorFormat = computed({
  get: () => store.state.settings.colorFormat,
  set: (format) => store.commit("settingsSetColorFormat", format)
});

let provider = computed({
  get: () => store.state.settings.provider,
  set: (provider) => store.commit("settingsSetProvider", provider)
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

let gitlabProject = computed({
  get: () => store.state.settings.gitlabProject,
  set: (project) => {
    store.commit("settingsSetGitlabProject", project)
  }
});

let gitlabToken = computed({
  get: () => store.state.settings.gitlabToken,
  set: (token) => {
    store.commit("settingsSetGitlabToken", token)
  }
});

let defaultBranch = computed({
  get: () => store.state.settings.defaultBranch,
  set: (branch) => {
    store.commit("settingsSetDefaultBranch", branch)
  }
});

let filePath = computed({
  get: () => store.state.settings.filePath,
  set: (path) => {
    store.commit("settingsSetFilePath", path)
  }
});

let commitMessage = computed({
  get: () => store.state.settings.commitMessage,
  set: (message) => {
    store.commit("settingsSetCommitMessage", message)
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
          <input v-model="excludePrivate" type="checkbox"/>
        </div>
      </div>

      <div class="row regular">
        <label>Color format</label>
        <div class="value">
          <DropDown v-model="colorFormat" :options="['hex', 'rgba']"/>
        </div>
      </div>
    </div>

    <!-- Git Provider Settings -->
    <div class="section">
      <span class="title">Git Provider</span>

      <div class="row regular">
        <label>Provider</label>
        <div class="value">
          <ProviderDropdown v-model="provider"/>
        </div>
      </div>

      <div class="row regular">
        <label>Default Branch</label>
        <div class="value">
          <input v-model="defaultBranch" type="text" placeholder="main"/>
        </div>
      </div>

      <div class="row regular">
        <label>File Path</label>
        <div class="value">
          <input v-model="filePath" type="text" placeholder="variables.json"/>
        </div>
      </div>

      <div class="row regular">
        <label>Commit Message</label>
        <div class="value">
          <input v-model="commitMessage" type="text" placeholder="update variables.json"/>
        </div>
      </div>

      <!-- GitHub Settings -->
      <template v-if="provider === ProviderType.Github">
        <div class="row regular">
          <label>Repository (username/repo)</label>
          <div class="value">
            <input v-model="repo" type="text" placeholder="owner/repo"/>
          </div>
        </div>

        <div class="row regular">
          <label>GitHub Token</label>
          <div class="value">
            <input v-model="githubToken" type="password"/>
          </div>
        </div>
      </template>

      <!-- GitLab Settings -->
      <template v-if="provider === ProviderType.Gitlab">
        <div class="row regular">
          <label>Project Path (group/project)</label>
          <div class="value">
            <input v-model="gitlabProject" type="text" placeholder="group/project"/>
          </div>
        </div>

        <div class="row regular">
          <label>GitLab Token</label>
          <div class="value">
            <input v-model="gitlabToken" type="password"/>
          </div>
        </div>
      </template>
    </div>

    <!-- Sync settings -->
    <!--    <div class="section">-->
    <!--      <div class="header">-->
    <!--        <span class="title">Server sync</span>-->
    <!--        <router-link to="/settings/add-server">-->
    <!--          <Icon :type="IconType.Add" />-->
    <!--        </router-link>-->
    <!--      </div>-->

    <!--      <SyncSettingsList />-->
    <!--    </div>-->
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
