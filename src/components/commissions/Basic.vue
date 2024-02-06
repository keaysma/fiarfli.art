<template>
    <div id="commissions" class="page">
        <h2>Commissions</h2>
        <div v-html="markdown.render(commissions.enabledMessage)" />
    </div>
</template>

<script setup lang="ts">
import MarkdownIt from "markdown-it";
import { SiteContent } from "/src/types";

const markdown = new MarkdownIt();

defineProps<{
    commissions: SiteContent['commissions']
}>();
</script>

<style lang="scss">
#commissions.page {
    position: relative;
    display: block;

    width: auto;
    min-height: 100vh;

    padding: 0 3em;

    //background: white;

    h2 {
        padding-top: 4em;
    }

    p {
        white-space: break-spaces;
    }

    @media only screen and (max-width: 768px) {
        padding: 0 0.5em;
        min-height: unset;
    }
}
</style>