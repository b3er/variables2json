<script lang="ts" setup>

import { computed } from 'vue';
import { useStore } from 'vuex';
import { Store } from 'vuex/types/index.js';
import { AppState, IconType } from '../models';
import { jsonFromState } from '../helpers';
import Icon from './Icon.vue';

let store = useStore() as Store<AppState>;

let version = computed<string>(() => store.state.version);

function downloadJson() {
    let json = jsonFromState(store.state);
    let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(json);

    let el = document.getElementById('downloadEl');

    el?.setAttribute("href", dataStr);
    el?.setAttribute("download", "variables.json");
    el?.click();

    parent.postMessage({ pluginMessage: 'notify-downloaded' }, '*');
}

</script>

<template>
    <footer class="bt">
        <a id="downloadEl" style="display:none"></a>

        <span class="small">v{{ version }}</span>

        <Icon :type="IconType.Download" @click="downloadJson" />
    </footer>
</template>


<style scoped>
footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
    padding: 0 0.5rem;
    align-self: stretch;
}

.small {
    color: var(--colors-muted-text);
}
</style>