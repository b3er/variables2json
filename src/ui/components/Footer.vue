<script lang="ts" setup>
import { computed, ref } from "vue";
import { useStore } from "@/store";
import { IconType } from "@/models";
import { createPR, jsonFromState } from "@/helpers";
import Icon from "@/components/Icon.vue";

let store = useStore();

let version = computed<string>(() => store.state.version);
let repo = computed<string>(() => store.state.settings.repo);
let githubToken = computed<string>(() => store.state.settings.githubToken);
let isLoading = ref(false);
function downloadJson() {
  let json = jsonFromState(store.state);
  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(json);

  let el = document.getElementById("downloadEl");

  el?.setAttribute("href", dataStr);
  el?.setAttribute("download", "variables.json");
  el?.click();

  parent.postMessage({ pluginMessage: "notify-downloaded" }, "*");
}


let sendPr = async () => {
  let json = jsonFromState(store.state);
  store.commit("setLoadingPR", true);
  if (!repo.value || !githubToken.value) {
    alert("Please fill in the repository and token fields in settings.");
    isLoading.value = false;
    return;
  }
  try {
    const pr = await createPR(repo.value, json, githubToken.value);
    store.commit("setLoadingPR", false);
    alert('Pull request created successfully! \n\n' + pr.html_url);
  } catch (error) {
    store.commit("setLoadingPR", false);
    alert(`Failed to create pull request: ${error.message}`);
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
