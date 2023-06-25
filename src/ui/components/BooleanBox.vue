<script lang="ts" setup>
import { IconType } from '../models';
import Icon from './Icon.vue';

defineProps<{
    value: boolean;
}>();

</script>

<template>
    <div class="panel">
        <Icon :type="IconType.Check" v-if="value" />
        <Icon :type="IconType.Uncheck" v-if="!value" />
    </div>
</template>

<style scoped></style>