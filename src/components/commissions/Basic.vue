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
    max-width: 75vw;
    min-height: 100vh;

    padding: 0 3em;

    //background: white;

    h2 {
        /* padding-top: 4em; */
        margin: 0;
    }

    .content {
        font-size: 0.7em;
        line-height: 1em;

        & > * {
            white-space: pre-wrap;
        }

        pre {
            margin: 0;
        }
    }

    .md-card {
        display: flex;
        flex-direction: column;

        max-width: 400px;
        /* max-height: 400px; */

        margin: 1em auto;

        border-radius: 10px;
        border: 2px solid pink;

        overflow: hidden;

        // background: linear-gradient(225deg, pink, skyblue);
        --light-blue: 173, 216, 230;
        background: linear-gradient(180deg, transparent 0, rgba(var(--light-blue), 0.125) 12%, rgba(var(--light-blue), 1) 40%, pink 65%, #fffee1);

        transition: box-shadow 0.5s;

        &:hover {
            box-shadow: 0 0 10px 5px pink;
        }

        a {
            display: contents;

            color: black;

            >img{
                max-width: 400px;
                max-height: 200px;
            }

            >h3 {
                text-decoration: underline;
                padding: 0 1em;
                margin: 0.25em 0;
            }

            >p {
                font-size: 0.8em;
                padding: 0 1.5em;
                margin: 0.25em 0;
            }

            @media only screen and (max-width: 768px) {
                >h3 {
                    padding: 0 0.7em;
                    margin: 0.25em 0 0 0;
                    font-size: 3em;
                }

                >p {
                    font-size: 2em;
                }
            }
        }
    }

    @media only screen and (max-width: 768px) {
        padding: 1em;
        min-height: unset;

        .content {
            font-size: 0.75em;
            word-wrap: break-word;
            white-space: pre-wrap;
        }
    }
}
</style>
