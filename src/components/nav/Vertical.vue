<template>
    <div class="nav gradient" :class="{ 'mobile-open' : isMobileOpen }">
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
    <div class="mobile-nav-signature blended">
        <a>Raquel</a>
    </div>
    <button class="thumb blended" @click="setMobileOpen(true)" v-if="!isMobileOpen">
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

    height: 100vw;
    width: 250px;

    margin: 0;
    padding: 0;

    background: linear-gradient(135deg, lightblue, pink, #fffee1);
    //background: #0008;
    //color:white;

    backdrop-filter: blur(5px);

    .nav-content {
        display: flex;
        flex-direction: column;

        margin: 50px auto;
    }

    .nav-signature {
        font-size: 3rem;
    }

    .nav-links {
        display: flex;
        flex-direction: column;

        margin: 5px auto 0;
    }

    .nav-link {
        &::before {
            content: '';
        }

        &::after {
            content: '';
        }

        &::before, &::after {
            color: #8882;

            font-weight: 200;
        }

        margin: 5px 0 5px auto;
        padding: 0;

        font-size: 1.33rem;
        text-shadow: 1px 1px #8888;
    }
}

.blended {
    filter: invert(1);
    mix-blend-mode:exclusion;
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

    //filter: invert(0.6);
    //mix-blend-mode: difference;

    //filter: invert(1);
    //mix-blend-mode:exclusion;
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

    //filter: invert(1);
    //mix-blend-mode: exclusion;

}

@media only screen and (max-width: 768px) {
    .nav {
        flex-direction: column;
        justify-content: flex-start;

        width: 100%;
        height: 100vh;

        margin-top: 0;
        padding-top: 25px;

        //background: #0002;
        background: linear-gradient(165deg, #ADD8E6A0, #FFC0CBF0, #fffee190);
        backdrop-filter: blur(10px);

        &:not(.mobile-open) {
            display: none;
        }

        .nav-content {
            margin: 50px 0px;
        }

        .nav-signature {
            display: none;
        }

        .nav-links {
            margin: 0;
        }

        .nav-link {
            margin: 5px 20px;

            font-size: 3rem;

            //color: white;
        }
    }

    .thumb, .mobile-nav-signature {
        display: block;
    }
}
</style>