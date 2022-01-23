<template>
    <div class="nav gradient" :class="{ 'mobile-open' : isMobileOpen }">
        <div class="nav-content">
            <div class="nav-signature">
                <a>Raquel</a>
            </div>
            <div class="nav-links">
                <a v-bind:class="`nav-link ${navSection === 0 ? `selected` : ``}`" @click="setMobileOpen(false)" href="#!">Home</a>
                <a v-bind:class="`nav-link ${navSection === 1 ? `selected` : ``}`" @click="setMobileOpen(false)" href="#about">About</a>
                <a v-bind:class="`nav-link ${navSection === 2 ? `selected` : ``}`" @click="setMobileOpen(false)" href="#art">Art</a>
                <div class="sub-links" v-if="navSection === 2">
                    <a class="nav-link">Illustration</a>
                    <a class="nav-link">Animation</a>
                </div>
                <a v-bind:class="`nav-link ${navSection === 3 ? `selected` : ``}`" @click="setMobileOpen(false)" href="#commissions">Commissions</a>
                <a v-bind:class="`nav-link ${navSection === 4 ? `selected` : ``}`" @click="setMobileOpen(false)" href="#contact-me">Contact Me</a>
            </div>
        </div>
    </div>
    <div class="mobile-navbar">
        <div class="mobile-nav-signature blended">
            <a>Raquel</a>
        </div>
        <button class="thumb blended" @click="setMobileOpen(true)" v-if="!isMobileOpen">
            <font-awesome-icon :icon="faBars" />
        </button>
        <button class="thumb blended" @click="setMobileOpen(false)" v-if="isMobileOpen">
            <font-awesome-icon :icon="faTimes" />
        </button>
    </div>
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
            faChessQueen, faBars, faTimes,
            navSection: 0
        }
    },

    components: {
        FontAwesomeIcon
    },

    mounted () {
        window?.addEventListener('scroll', this.handleScroll);
    },
    unmounted () {
        window?.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll (event) {
            let scroll = document.documentElement.scrollTop
            let height = document.documentElement.clientHeight
            let section = Math.round(scroll/height)
            
            /*
            console.log({
                scroll,
                height,
                section,
                var: this.navSection
            })
            */

            this.navSection = section
        }
  }
}
</script>

<style lang="scss">
.nav {
    //position: sticky;
    //display: flex;
    //justify-content: center;

    z-index: 10;

    //top: 10px;

    //height: 100vw;
    width: 200px;

    margin: 0;
    padding: 0;

    background: linear-gradient(135deg, #B2DEED, pink, #fffee1);
    //background: #0008;
    //color:white;

    backdrop-filter: blur(5px);

    .nav-content {
        position: sticky;
        display: flex;
        flex-direction: column;

        top: 200px;
        margin: 50px 0;
    }

    .nav-signature {
        font-size: 3rem;

        margin: 0 35px 0 auto;
    }

    .nav-links {
        display: flex;
        flex-direction: column;

        margin: 5px auto 0;

        .sub-links {
            display: flex;
            flex-direction: column;

            filter: brightness(2.2);

            .nav-link {
                font-size: 0.75rem;
            }
        }
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

        &:not(.selected){
            text-decoration: none;
        }

        color: #534957;

        margin: 5px 0 5px auto;
        padding: 0;

        font-size: 1.33rem;
        //text-shadow: 1px 1px #8888;
    }
}

.blended {
    filter: invert(1);
    mix-blend-mode:exclusion;
}

.mobile-navbar {
    display: none;
    position: fixed;
    
    width: 100%;
    height: 80px;

    top: 0;

    z-index: 30;

    background: #0006;
    backdrop-filter: blur(4px);
}

.mobile-nav-signature {
    display: none;
    position: fixed;

    top: 20px;
    left: 20px;
    z-index: 20;

    //width: 50px;
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

    top: 15px;
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
        position: fixed;

        flex-direction: column;
        justify-content: flex-start;

        width: 100%;
        height: 100vh;

        top: 0;
        left: 0;

        z-index: 30;

        margin-top: 0;
        padding-top: 25px;

        //background: #0002;
        background: linear-gradient(165deg, #ADD8E6A0, #FFC0CBF0, #fffee190);
        backdrop-filter: blur(10px);

        &:not(.mobile-open) {
            display: none;
        }

        .nav-content {
            position: relative;
            
            top: 20px;

            //margin: 50px 0px 0px 0px;
        }

        .nav-signature {
            display: none;
        }

        .nav-links {
            margin: 0;

            .sub-links {
                display: flex;
                flex-direction: column;

                filter: brightness(1.5);

                .nav-link {
                    font-size: 2rem;
                }
            }
        }

        .nav-link {
            margin: 5px 20px;

            font-size: 3rem;

            //color: white;
        }
    }

    .thumb, .mobile-nav-signature {
        display: block;

        z-index: 30;
    }

    .mobile-navbar {
        display: initial;
    }
}
</style>