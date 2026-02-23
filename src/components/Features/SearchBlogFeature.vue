<script setup lang="ts">
import "https://unpkg.com/@algolia/sitesearch@latest/dist/search.min.js";

import { onMounted } from 'vue';

import APP_CONFIG from '@config/app';

onMounted(() => {
    // @ts-expect-error SiteSearch will be loaded by VueJS by now, if it works as I expected
    window.SiteSearch?.init({
        container: "#search",
        applicationId: APP_CONFIG.ALGOLIA.APPLICATION_ID,
        apiKey: APP_CONFIG.ALGOLIA.API_KEY,
        indexName: APP_CONFIG.ALGOLIA.INDEX_NAME,
        attributes: {
            primaryText: APP_CONFIG.ALGOLIA.FIRST_KEY,
            secondaryText: APP_CONFIG.ALGOLIA.SEC_KEY,
            tertiaryText: APP_CONFIG.ALGOLIA.TER_KEY,
            url: "", // the URL of the hit
            image: "" // the image URL of the hit
        },
        darkMode: document.documentElement.getAttribute('data-theme') === 'dark',
    });
});
</script>

<template>
    <div id="search"></div>
</template>

<style scoped>
@import "https://unpkg.com/@algolia/sitesearch@latest/dist/search.min.css";
</style>
