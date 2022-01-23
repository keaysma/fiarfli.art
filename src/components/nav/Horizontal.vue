<template>
    <div class="nav" :class="{ 'mobile-open' : isMobileOpen }">
        <div class="nav-content">
            <div class="nav-signature">
                <a>Raquel</a>
            </div>
            <div class="nav-links">
                <a class="nav-link">Home</a>
                <a class="nav-link">About</a>
                <a class="nav-link">Art</a>
                <a class="nav-link">Commissions</a>
                <a class="nav-link">Contact Me</a>
            </div>
        </div>
    </div>
    <div class="mobile-nav-signature">
        <a>Raquel</a>
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
    //justify-content: center;

    z-index: 10;

    height: 100px;
    width: 100vw;

    margin: 0;
    padding: 0;

    background: #0008;
    color:white;

    backdrop-filter: blur(5px);

    .nav-content {
        display: flex;
        flex-direction: row;

        margin: auto 50px;
    }

    .nav-signature {
        font-size: 3rem;
    }

    .nav-links {
        margin: auto 0 6px 15px;
    }

    .nav-link {
        &::before {
            content: '[';
        }

        &::after {
            content: ']';
        }

        &::before, &::after {
            color: #8882;

            font-weight: 200;
        }

        margin: auto 10px;

        font-size: 1.33rem;
        text-shadow: 1px 1px #8888;
    }
}

.mobile-nav-signature {
    display: none;
    position: fixed;

    top: 25px;
    left: 20px;
    z-index: 20;

    width: 50px;
    height: 50px;

    background: none;
    border: none;

    font-size: 2rem;
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

    .thumb, .mobile-nav-signature {
        display: block;
    }
}
</style>