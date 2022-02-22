<template>
    <a class="nav-link-container" :href="href" @click="closeMobileMenu()">
        <div v-bind:class="`nav-link`"><font-awesome-icon :icon="icon" /></div>
        <div class="nav-text">
            {{ name }}
        </div>
    </a>
</template>

<script>
import state from '../state';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
    props: {
        name: String,
        href: String,
        icon: Object
    },
    components: {
        FontAwesomeIcon
    },
    setup () {

        const closeMobileMenu = () => {
            state.isMobileMenuOpen = false;
            document.body.style.overflow = 'scroll'
        }

        return {
            closeMobileMenu
        }
    }
}
</script>

<style lang="scss">
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

    &:not(.selected){
        text-decoration: none;
    }

    &#art-link.selected {
        margin-bottom: 0;
        border: 1px dashed #0003;
        border-bottom: 0;
        border-radius: 5px 5px 0 0;
        background: #0001;
    }

    // color: #534957;
    color:whitesmoke;

    margin: 5px 0 5px auto;
    padding: 0 10px;

    font-size: 1.33rem;

    filter: drop-shadow(0px 0px 5px #53495788);
}

.nav-text {
    position: absolute;

    top: 8px;
    left: 50px;

    padding: 2px 0.5rem;

    white-space: nowrap;

    color: white;
    background: #00000060;
    border: 1px solid transparent;
    border-radius: 25px;
    backdrop-filter: blur(40px);

    transition: all 0.15s;
}

.nav-link-container {
    position: relative;

    z-index: 10;

    &:hover {
        .nav-text {
            opacity: 1;
        }
    }

    &:not(:hover) {
        .nav-text {
            opacity: 0;
        }
    }
}

@media only screen and (max-width: 768px) {
    .nav-link {
        margin: 0;

        font-size: 2.5rem;
    }

    .nav-text {
        top: 12px;
        left: 75px;

        white-space: nowrap;

        background: transparent;
        font-size: 1.75rem;
        border: none;
        border-radius: 0px;
        backdrop-filter: none;
    }

    .nav-link-container {
        margin: 10px 0;

        .nav-text {
            &:hover, &:not(:hover) {
                opacity: 1;
            }
        }
    }
}
</style>