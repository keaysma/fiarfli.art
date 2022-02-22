<template>
    <div class="nav gradient" :class="{ 'mobile-open' : isMobileMenuOpen }">
        <div class="nav-content">
            <div class="nav-signature">
                <!-- <a>Raquel</a> -->
            </div>
            <div class="nav-links">
                <nav-link-thumb name="Home" href="#!" :icon="faHome" />
                <nav-link-thumb name="About" href="#about" :icon="faAddressCard" />
                <nav-link-thumb name="Art" href="#art" :icon="faPalette" />
                <!-- <a v-bind:class="`nav-link ${navSection === 2 ? `selected` : ``}`" @click="closeMobileMenu()" href="#art" id="art-link"><font-awesome-icon :icon="faPalette" /></a> -->
                <!-- <div class="sub-links" v-if="navSection === 2">
                    <a 
                        v-for="(block, blockIndex) in blocks" 
                        :key="blockIndex" class="nav-link" 
                        :class="{selected: navArtSubsection === blockIndex}" 
                        :href="`#art-${block.name}`"
                        @click="closeMobileMenu()"
                    >
                        {{ block.name }}
                    </a>
                </div> -->
                <nav-link-thumb name="Commissions" href="#commissions" :icon="faCommentsDollar" />
                <nav-link-thumb name="Contact Me" href="#contact-me" :icon="faAddressBook" />
                
                <!-- <a v-bind:class="`nav-link ${navSection === 4 ? `selected` : ``}`" @click="closeMobileMenu()" href="#contact-me"><font-awesome-icon :icon="faAddressBook" /></a> -->
            </div>
        </div>
    </div>
    <div v-if="!isGalleryOpen" class="mobile-navbar">
        <div class="mobile-nav-signature">
            <img
                class="mobile-nav-signature"
                src="/Raquel-signature.svg"
            />
        </div>
        <button class="thumb blended" @click="openMobileMenu()" v-if="!isMobileMenuOpen">
            <font-awesome-icon :icon="faBars" />
        </button>
        <button class="thumb blended" @click="closeMobileMenu()" v-if="isMobileMenuOpen">
            <font-awesome-icon :icon="faTimes" />
        </button>
    </div>
</template>

<script>
import { ref } from 'vue';

import state from '../state';

import NavLinkThumb from './NavLinkThumb.vue';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faChessQueen, faBars, faTimes, faHome, faAddressCard, faPalette, faCommentsDollar, faAddressBook } from '@fortawesome/free-solid-svg-icons';

const pageThreshold = 101

const indexOfSmallestNegativeValue = (list) => {
    let res = 0
    let minDistance = pageThreshold
    for(const idx in list){
        const elementDistance = list[idx]
        if(elementDistance < pageThreshold){
            if(minDistance === pageThreshold || elementDistance > minDistance){
                minDistance = elementDistance
                res = idx
            }
        }
    }

    return Number(res)
}

export default {
    setup () {
        const openMobileMenu = () => {
            state.isMobileMenuOpen = true;
            document.body.style.overflow = 'hidden'

        }

        const closeMobileMenu = () => {
            state.isMobileMenuOpen = false;
            document.body.style.overflow = 'scroll'

        }

        return {
            openMobileMenu,
            closeMobileMenu
        }
    },
    
    data () {
        return {
            faChessQueen, faBars, faTimes, faHome, faAddressCard, faPalette, faCommentsDollar, faAddressBook,
            navSection: 0,
            navArtSubsection: 0
        }
    },

    components: {
        NavLinkThumb,
        FontAwesomeIcon
    },

    computed: {
        blocks(){ return state?.blocks },
        isGalleryOpen(){ return state?.isGalleryOpen },
        isMobileMenuOpen(){ return state?.isMobileMenuOpen }
    },

    mounted () {
        window?.addEventListener('scroll', this.handleScroll);
    },
    unmounted () {
        window?.removeEventListener('scroll', this.handleScroll);
    },
    methods: {
        handleScroll (event) {
            const scrollTop = document.documentElement.scrollTop

            const pageElementDistance = [
                ... document.getElementsByClassName('hero'), 
                ... document.getElementsByClassName('page')
            ].map(e => {
                let dist = e.offsetTop - scrollTop
                
                //bias the page above us
                //if (dist < 0)
                //    dist /= 2
                
                return dist //Math.abs(dist)
            })

            //const minDistance = Math.min(... pageElementDistance)
            //const section = pageElementDistance.indexOf(minDistance)
            const section = indexOfSmallestNegativeValue(pageElementDistance)

            const artSectionElementDistance = [
                ... document.getElementsByClassName('art-section'),
            ].map(e => e.offsetTop - scrollTop)
            //const artSubsection = artSectionElementDistance.indexOf(Math.min(... artSectionElementDistance))
            const artSubsection = indexOfSmallestNegativeValue(artSectionElementDistance)
            
            /*
            console.log({
                pageElementDistance,
                minDistance,
                section
            })
            */

           /*
           console.log({
               artSectionElementDistance,
               artSubsection
           })
           */

            this.navSection = section
            this.navArtSubsection = artSubsection
        }
  }
}
</script>

<style lang="scss">
.nav {
    position: sticky;

    z-index: 20;


    width: 25px;

    margin: 10px;
    padding: 0;

    backdrop-filter: blur(5px);

    .nav-content {
        position: sticky;
        display: flex;
        flex-direction: column;

        top: 20vw;
        margin: 50px 0;
    }

    .nav-signature {
        font-size: 3rem;

        margin: 0 35px 0 auto;
    }

    .nav-links {
        display: flex;
        flex-direction: column;

        margin: 0px 5px 0;


        .sub-links {
            display: flex;
            flex-direction: column;

            width: 100px;

            margin: 0 0px 0 auto;
            padding: 0 0px 0 0;

            background: #0001;
            border: 1px dashed #0002;
            border-radius: 10px 0 10px 10px;

            text-decoration: none;
            filter: brightness(1.2);

            .nav-link {
                font-size: 0.75rem;

                &.selected {
                    filter: brightness(0.2);
                }
            }
        }
    }
}

.blended {
    //filter: invert(1);
    //mix-blend-mode: difference;
    color: #ecc4f2;
}

.mobile-navbar {
    display: none;
    position: fixed;
    
    width: 100%;
    height: 60px;

    top: 0;

    z-index: 30;

    background: #0006;
    backdrop-filter: blur(4px);
}

.mobile-nav-signature {
    display: none;
    position: fixed;

    top: 10px;
    left: 20px;
    z-index: 20;

    height: 40px;

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

    top: 5px;
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

        margin: 0;
        padding-top: 25px;
        padding-left: 10px;

        //background: #0002;
        background: linear-gradient(165deg, #ADD8E6A0, #FFC0CBA0, #fffee1A0);
        backdrop-filter: blur(100px);

        transition: opacity 0.15s;

        &:not(.mobile-open) {
            opacity: 0;
            pointer-events: none;
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

                width: 90vw;

                margin: 0 25px 0 -15px;
                padding: 0 0 0 15px;

                border-top-right-radius: 10px;

                filter: brightness(1.5);

                .nav-link {
                    font-size: 2rem;
                }
            }
        }

        .nav-link {
            &#art-link.selected {
                margin-bottom: 0;
                border: 1px solid transparent;
                border-radius: 5px 5px 0 0;
                background: transparent;
            }
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