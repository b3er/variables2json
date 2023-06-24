<script lang="ts" setup>
import { computed } from 'vue';

let props = defineProps<{
    color: string;
}>();

let solidColor = computed(() => {

    // If rgba, get r, g, b parts and set opacity to 1
    // Regex to match rgba(0, 0, 0, 0.5)
    let rgbaRegex = /rgba\((\d+), (\d+), (\d+), (\d+\.?\d*)\)/;
    let match = props.color.match(rgbaRegex);
    if (match) {
        let [_, r, g, b] = match;
        return `rgba(${r}, ${g}, ${b}, 1)`;
    } else {
        return props.color;
    }
});


</script>

<template>
    <div class="color-value">
        <div class="solid-panel" :style="{ backgroundColor: solidColor }" />
        <div class="opacity">
            <div class="opacity-bg" />
            <div class="opacity-panel" :style="{ backgroundColor: color }" />
        </div>
    </div>
</template>

<style scoped>
.color-value {
    display: flex;
    align-items: center;
    width: 16px;
    height: 16px;
    border-radius: 2px;
}

.solid-panel {
    width: 50%;
    height: 100%;
    border-radius: 2px 0 0 2px;
}

.opacity-panel {
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 0 2px 2px 0;
}

.opacity-bg {
    position: absolute;
    background: #eee url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" fill-opacity=".25"> <rect x="200" width="200" height="200" /><rect y="200" width="200" height="200" /></svg>');
    background-size: 5px 5px;
    width: 100%;
    height: 100%;
    border-radius: 0 2px 2px 0;
}

.opacity {
    position: relative;
    width: 50%;
    height: 100%;
}
</style>