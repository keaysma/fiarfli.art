<template>
    <div class="nav" :class="{ 'mobile-open' : isMobileOpen }">
        <a class="nav-link">Home</a>
        <a class="nav-link">Comics</a>
        <a class="nav-link">Music</a>
        <a class="nav-link">Commissions</a>
        <a class="nav-link">Bees?</a>
    </div>
    <button class="thumb" @click="setMobileOpen(true)" v-if="!isMobileOpen">
        <font-awesome-icon :icon="faBars" />
    </button>
    <button class="thumb" @click="setMobileOpen(false)" v-if="isMobileOpen">
        <font-awesome-icon :icon="faTimes" />
    </button>
</template>

<script>
import { ref } from 'vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChessQueen, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

export default {
    setup () {
        const isMobileOpen = ref(false);
        const setMobileOpen = (value) => (isMobileOpen.value = value);

        return {
            isMobileOpen,
            setMobileOpen
        }
    },
    
    data () {
        return {
            faChessQueen, faBars, faTimes
        }
    },

    components: {
        FontAwesomeIcon
    }
}
</script>

<style lang="scss">
.nav {
    position: fixed;
    display: flex;
    justify-content: center;

    z-index: 10;

    width: 100vw;

    margin: 50px auto;

    .nav-link {
        margin: 0 25px;

        font-size: 2rem;
        text-shadow: 1px 1px #8888;
    }
}

.thumb {
    display: none;
    position: fixed;

    top: 20px;
    right: 20px;
    z-index: 20;

    width: 50px;
    height: 50px;

    background: none;
    border: none;

    font-size: 2rem;
}

@media only screen and (max-width: 768px) {
    .nav {
        flex-direction: column;
        justify-content: flex-start;

        height: 100vh;

        margin-top: 0;
        padding-top: 25px;

        background: #0002;
        backdrop-filter: blur(10px);

        &:not(.mobile-open) {
            display: none;
        }

        .nav-link {
            margin: 5px 25px;
        }
    }

    .thumb {
        display: block;
    }
}
</style>