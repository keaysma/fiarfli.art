<template>
    <footer>
        <p class="text-content">
            <span>Made with</span>
            <font-awesome-icon class="footer-icon" :icon="faHeart" />
            <a href="https://keays.io" target="_blank">keays.io</a>
        </p>
    </footer>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default {
    components: {
        FontAwesomeIcon
    },

    data() {
        return {
            faHeart
        }
    }
}
</script>

<style lang="scss">
footer {
    position: relative;
    width: 100%;
    height: 50px;

    margin: 0;

    .text-content {
        display: flex;
        flex-direction: row;
        align-content: center;
        justify-content: center;

        margin: 0px auto;
        //position: sticky;
        //top: 200px;

        color: #534957;
        text-shadow: 1px 1px 3px #53495744;

        .footer-icon {
            width: 0.75em;
            color: #B2DEED;
            filter: drop-shadow(1px 2px 1px #BA9EA2);

            margin: 0 0.25em;
        }
    }
}
</style>