<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStore } from "@/store";
import { IconType, ProviderType } from "@/models";
import { createPR, createGitLabMR, jsonFromState } from "@/helpers";
import Icon from "@/components/Icon.vue";

let store = useStore();

let version = computed<string>(() => store.state.version);
let provider = computed(() => store.state.settings.provider);
let repo = computed<string>(() => store.state.settings.repo);
let githubToken = computed<string>(() => store.state.settings.githubToken);
let gitlabProject = computed<string>(() => store.state.settings.gitlabProject);
let gitlabToken = computed<string>(() => store.state.settings.gitlabToken);
let defaultBranch = computed<string>(() => store.state.settings.defaultBranch);
let filePath = computed<string>(() => store.state.settings.filePath);
let isLoading = ref(false);

function downloadJson() {
  let json = jsonFromState(store.state);
  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(json);

  let el = document.getElementById("downloadEl");
  const fileName = filePath.value.split('/').pop() || 'variables.json';

  el?.setAttribute("href", dataStr);
  el?.setAttribute("download", fileName);
  el?.click();

  parent.postMessage({ pluginMessage: "notify-downloaded" }, "*");
}


let sendPr = async () => {
  let json = jsonFromState(store.state);
  store.commit("setLoadingPR", true);
  
  try {
    if (provider.value === ProviderType.Github) {
      if (!repo.value || !githubToken.value) {
        alert("Please fill in the GitHub repository and token fields in settings.");
        store.commit("setLoadingPR", false);
        return;
      }
      const pr = await createPR(repo.value, json, githubToken.value, defaultBranch.value, filePath.value);
      store.commit("setLoadingPR", false);
      alert('Pull request created successfully! \n\n' + pr.html_url);
    } else if (provider.value === ProviderType.Gitlab) {
      if (!gitlabProject.value || !gitlabToken.value) {
        alert("Please fill in the GitLab project and token fields in settings.");
        store.commit("setLoadingPR", false);
        return;
      }
      const mr = await createGitLabMR(gitlabProject.value, json, gitlabToken.value, defaultBranch.value, filePath.value);
      store.commit("setLoadingPR", false);
      alert('Merge request created successfully! \n\n' + mr.web_url);
    }
  } catch (error) {
    store.commit("setLoadingPR", false);
    alert(`Failed to create ${provider.value === ProviderType.Github ? 'pull request' : 'merge request'}: ${error.message}`);
  }
};

</script>

<template>
  <footer class="bt">
    <a id="downloadEl" style="display: none"></a>

    <span class="small">v{{ version }}</span>

    <div class="icons">
      <a
        href="https://github.com/mark-nicepants/variables2json-docs"
        target="_blank"
      >
        <Icon :type="IconType.Github" />
      </a>
      <Icon :type="IconType.Download" @click="downloadJson" />
      <Icon :type="IconType.PullRequest" @click="sendPr" />
    </div>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  padding: 0 0.5rem;
  align-self: stretch;
}

.small {
  color: var(--colors-muted-text);
}
</style>
