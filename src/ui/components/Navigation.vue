<script lang="ts" setup>

</script>

<template>
    <div class="nav bb">
        <router-link class="item" to="/">Variables</router-link>
        <router-link class="item" to="/composites">Composites</router-link>
    </div>
    <Divider />
</template>

<style scoped>
.nav {
    display: flex;
    align-items: flex-start;
    align-self: stretch;
}


.item {
    color: var(--colors-muted-text);
    text-decoration: none;
    padding: 1rem .75rem;
}

.router-link-active {
    color: var(--colors-primary-text);
}

.item:hover {
    color: var(--colors-primary-text);
}
</style>
