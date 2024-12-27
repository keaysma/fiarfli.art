<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
</script>

<template>
    <footer>
        <p>
            <span>Made with</span>
            <FontAwesomeIcon class="footer-icon" :icon="faHeart" />
            <a href="https://keays.io" target="_blank">keays.io</a>
        </p>
    </footer>
</template>

<style lang="scss">
footer {
    height: 64px;
    padding: 1em 0 0;

    >p {
        width: max-content;
        margin: 0 auto;
        white-space: nowrap;

        >.footer-icon {
            color: #B2DEED;
            filter: drop-shadow(0 0 3px #53495744);

            margin: 0 0.5em;
        }
    }
}
</style>