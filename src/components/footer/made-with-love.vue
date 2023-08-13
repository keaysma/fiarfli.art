<template>
    <footer>
        <p class="text-content">
            <span>Made with</span>
            <FontAwesomeIcon class="footer-icon" :icon="faHeart"/>
            <a href="https://keays.io" target="_blank">keays.io</a>
        </p>
    </footer>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
</script>

<style lang="scss">
footer {
    position: relative;
    width: 100%;
    height: 50px;

    margin: 0;

    > .text-content {
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;

        margin: 0px auto;

        color: #534957;
        text-shadow: 1px 1px 3px #53495744;

        > .footer-icon {
            width: 0.75em;
            color: #B2DEED;
            filter: drop-shadow(0 0 3px #53495744);

            margin: 0 0.25em;
        }
    }
}
</style>