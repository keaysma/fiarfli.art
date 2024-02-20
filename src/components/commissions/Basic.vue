<template>
    <div id="commissions" class="page">
        <h2>Commissions</h2>
        <div class="content" v-html="commissions.__html" />
    </div>
</template>

<script setup lang="ts">
import { type SiteContent } from "/src/types";

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

    .md-card {
        display: flex;
        flex-direction: column;

        max-width: 600px;
        // height: 400px;

        border-radius: 10px;
        border: 1px solid #e0e0e0;

        overflow: hidden;

        // background: linear-gradient(225deg, pink, skyblue);
        --light-blue: 173, 216, 230;
        background: linear-gradient(180deg, transparent 0, rgba(var(--light-blue), 0.125) 12%, rgba(var(--light-blue), 1) 40%, pink 65%, #fffee1);


        a {

            >h3,
            >p {
                padding: 0 1em;
                margin: 0.5em 0;
            }
        }
    }

    @media only screen and (max-width: 768px) {
        padding: 0 0.5em;
        min-height: unset;
    }
}
</style>