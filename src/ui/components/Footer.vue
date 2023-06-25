<script lang="ts" setup>

import { computed } from 'vue';
import { useStore } from 'vuex';
import { Store } from 'vuex/types/index.js';
import { AppState, IconType } from '../models';
import Icon from './Icon.vue';

let store = useStore() as Store<AppState>;

let version = computed<string>(() => store.state.version);

</script>

<template>
    <footer class="bt">
        <span class="small">v{{ version }}</span>

        <Icon :type="IconType.Download" />
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