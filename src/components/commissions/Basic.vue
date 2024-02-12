<template>
    <div id="commissions" class="page">
        <h2>Commissions</h2>
        <div v-html="markdown.render(commissions.enabled ? commissions.enabledMessage : commissions.disabledMessage)" />
    </div>
</template>

<script setup lang="ts">
import MarkdownIt from "markdown-it";
import { SiteContent } from "/src/types";

defineProps<{
    commissions: SiteContent['commissions']
}>();

const markdown = new MarkdownIt({ html: true, breaks: true });
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