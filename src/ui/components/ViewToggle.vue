<script lang="ts" setup>
import { IconType } from '../models';
import Icon from './Icon.vue';
import { ref } from 'vue';



const listShowing = ref(true);

let onClick = (value: boolean) => {
    listShowing.value = value;
}
</script>

<template>
    <div class="toggle">
        <Icon :type="IconType.List" :class="listShowing ? 'active' : ''" @click="() => onClick(true)" />
        <Icon :type="IconType.Json" :class="!listShowing ? 'active' : ''" @click="() => onClick(false)" />
    </div>
</template>


<style scoped>
.active {
    background-color: var(--colors-selected);
    border-radius: 2px;
}

.toggle {
    display: flex;
    justify-content: center;
}
</style>