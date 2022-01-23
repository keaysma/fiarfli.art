<template lang="">
    <div id="footer" class="page">
        <div class="text-content">
            <p>Made with</p>
            <font-awesome-icon class="footer-icon" :icon="faHeart" size="1x" />
            <a href="https://keays.io" target="_blank">keays.io</a>
        </div>
    </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default {
    components: {
        FontAwesomeIcon
    },

    data () {
        return {
            faHeart
        }
    }
}
</script>

<style lang="scss">
#footer.page {
    width: 100%;
    height: 50px;

    margin: 0;

    //background: white;

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

        &>* {
            margin: auto 5px;
        }

        .footer-icon {
            color: #B2DEED;
            filter: drop-shadow(1px 2px 1px #BA9EA2);
        }
    }
}
</style>