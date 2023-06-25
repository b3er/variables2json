<script lang="ts" setup>

import { computed } from 'vue';
import { useStore } from 'vuex';
import { Store } from 'vuex/types/index.js';
import { AppState } from '../models';

let store = useStore() as Store<AppState>;

let version = computed<string>(() => store.state.version);

</script>

<template>
    <footer class="bt">
        <span class="small">v{{ version }}</span>
    </footer>
</template>


<style scoped>
footer {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 4px;
    padding: 0.5rem 1rem;
    align-self: stretch;
}

.small {
    color: var(--colors-muted-text);
}
</style>