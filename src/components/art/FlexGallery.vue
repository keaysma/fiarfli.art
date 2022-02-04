<template lang="">
    <div id="art" class="page">
        <div class="art-content">
            <h1>Art</h1>
            <div v-for="(block, blockIndex) in blocks" :key="blockIndex" class="art-section" :id="`art-${block.name}`">
                <h2>{{ block.name }}</h2>
                <div class="art-container">
                    <div
                        v-for="(content, contentIndex) in block.content" :key="contentIndex"
                        v-bind:class="`width-${content.width} height-${content.height}`"
                        @click="setGallerySettings({blockIndex,contentIndex});setIsGalleryOpen(true)"
                    >
                        <img 
                            v-bind:src="content.path"
                            v-bind:class="`fit-${content.fit} img-height-${content[`img-height`] ?? `full`}`"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- <div v-if="isGalleryOpen" class="gallery" v-on:click.self="closeGallery()"> -->
    <div class="gallery" :class="{open: isGalleryOpen}" v-on:click.self="closeGallery()">
        <button class="gallery-icon gallery-go-fullscreen" @click="setIsGalleryFullscreen(true)">
            <font-awesome-icon :icon="faExpandArrowsAlt" size="2x" />
        </button>
        <button class="gallery-icon gallery-thumb" @click="closeGallery()">
            <font-awesome-icon :icon="faTimes" size="2x" />
        </button>

        <button class="gallery-bar gallery-left" @click="galleryPrevious()">
            <font-awesome-icon :icon="faChevronLeft" size="2x" />
        </button>
        <button class="gallery-bar gallery-right" @click="galleryNext()">
            <font-awesome-icon :icon="faChevronRight" size="2x" />
        </button>

        <div class="gallery-content" v-on:touchstart="touchStart" v-on:touchend="touchEnd">
            <img
                v-bind:src="blocks?.[gallerySettings?.blockIndex]?.content?.[gallerySettings?.contentIndex]?.path"
            />
            <div class="gallery-text">
                <div class="gallery-header">
                    <h1>{{ blocks?.[gallerySettings?.blockIndex]?.content?.[gallerySettings?.contentIndex]?.title }}</h1>
                    <h2>{{ blocks?.[gallerySettings?.blockIndex]?.content?.[gallerySettings?.contentIndex]?.date }}</h2>
                </div>
                <div class="gallery-body">
                    <p>{{ blocks?.[gallerySettings?.blockIndex]?.content?.[gallerySettings?.contentIndex]?.desc }}</p>
                </div>
            </div>
        </div>

        <div v-if="isGalleryFullscreen" class="gallery-fullscreen" v-on:touchstart="touchStart" v-on:touchend="touchEnd">
            <button class="" @click="setIsGalleryFullscreen(false)">
                <font-awesome-icon :icon="faCompressArrowsAlt" size="2x" />
            </button>

            <img
                v-bind:src="blocks?.[gallerySettings?.blockIndex]?.content?.[gallerySettings?.contentIndex]?.path"
            />
        </div>
    </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue';

import state from '../state';

//import indexData from '../../../public/art/index.json'
import indexData from '../index.json'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTimes, faExpandArrowsAlt, faCompressArrowsAlt, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default {
    created () {
        onMounted(() => {
            /*fetch(`/art/index.json`).then(res => res.json())
            .then(({blocks}) => {
                state.blocks = [
                    ... blocks
                ]
            })
            .catch((e) => {
                console.log(e)
            })*/

            window.addEventListener('keydown', (e) => {
                //console.log({key: e.key})
                //console.log({this: this})

                if (e.key === 'Escape') {
                    if(this.isGalleryFullscreen === false){
                        state.isGalleryOpen = false
                        document.body.style.overflow = 'auto'
                    }

                    this.isGalleryFullscreen = false
                }

                if (e.key === 'f') {
                    if(state.isGalleryOpen === true)
                        this.isGalleryFullscreen = !this.isGalleryFullscreen
                }

                if (e.key === 'ArrowLeft') {
                    this.galleryPrevious()
                }

                if (e.key === 'ArrowRight') {
                    this.galleryNext()
                }

            })
        })
    },

    setup () {
        state.blocks = [ ... indexData.blocks ]

        const isGalleryFullscreen = ref(false);
        const setIsGalleryFullscreen = (value) => {
            isGalleryFullscreen.value = value
        };

        //const isGalleryOpen = ref(false);
        const setIsGalleryOpen = (value) => {
            state.isGalleryOpen = value
            document.body.style.overflow = 'hidden'
        };
        const closeGallery = () => {
            state.isGalleryOpen = false
            isGalleryFullscreen.value = false
            document.body.style.overflow = 'auto'
        }

        const gallerySettings = ref({});
        const setGallerySettings = (value) => (gallerySettings.value = value);

        const touchStartEvent = ref();

        return {
            isGalleryFullscreen,
            setIsGalleryFullscreen,

            //isGalleryOpen,
            setIsGalleryOpen,
            closeGallery,

            gallerySettings,
            setGallerySettings,
        }
    },

    methods: {
        touchStart (touchEvent) {
            //console.log({touchEvent})
            this.touchStartEvent = touchEvent;
        },

        touchEnd (touchEvent) {
            //console.log({touchEvent})
            
            const xMove = touchEvent?.changedTouches?.[0]?.screenX - this.touchStartEvent?.changedTouches?.[0]?.screenX;
            //console.log(xMove)

            if(xMove >= 50)
                this.galleryPrevious()

            if(xMove <= -50)
                this.galleryNext()
        },

        galleryPrevious(){
            //console.log(`previous`)
            //console.log({ gallerySettings: this.gallerySettings })

            let newContentIndex = (this?.gallerySettings?.contentIndex ?? 0) - 1
            let newBlockIndex = (this?.gallerySettings?.blockIndex ?? 0)

            if(newContentIndex < 0){
                newBlockIndex -= 1

                if(newBlockIndex < 0){
                    newBlockIndex = this?.blocks?.length - 1
                }

                newContentIndex = this?.blocks?.[newBlockIndex]?.content?.length - 1
            }

            /*console.log({
                newContentIndex,
                newBlockIndex
            })*/

            this.gallerySettings = {
                contentIndex: newContentIndex,
                blockIndex: newBlockIndex
            }
        },

        galleryNext(){
            //console.log(`next`)
            //console.log({ gallerySettings: this.gallerySettings })

            let newContentIndex = (this?.gallerySettings?.contentIndex ?? 0) + 1
            let newBlockIndex = (this?.gallerySettings?.blockIndex ?? 0)

            if(newContentIndex >= this?.blocks?.[newBlockIndex]?.content?.length){
                newContentIndex = 0
                newBlockIndex += 1

                if(newBlockIndex >= this?.blocks?.length){
                    newBlockIndex = 0
                    newContentIndex = 0
                }
            }

            /*console.log({
                newContentIndex,
                newBlockIndex
            })*/

            //console.log(this?.blocks?.[newBlockIndex]?.content?.[newContentIndex])

            this.gallerySettings = {
                contentIndex: newContentIndex,
                blockIndex: newBlockIndex
            }
        }
    },
    computed: {
        blocks(){ return state?.blocks },
        isGalleryOpen(){ return state?.isGalleryOpen }
    },

    components: {
        FontAwesomeIcon
    },

    data () {
        return {
            faTimes, faExpandArrowsAlt, faCompressArrowsAlt, faChevronLeft, faChevronRight,

            //blocks: [ ... indexData.blocks ],
        }
    }
}
</script>

<style lang="scss">
#art.page {
    display: flex;
    flex-direction: column;

    width: 100%;
    min-height: 100vh;

    margin: 0;

    .art-content {
        margin: 75px 125px;
        //position: sticky;
        top: 200px;

        color: #534957;
        text-shadow: 1px 1px 3px #53495744;
    }

    .art-section {
        margin: 0 0 50px 0;

        h2 {
            position: sticky;
            top: 0px;

            padding: 5px 0px;

            backdrop-filter: blur(14px);
            text-shadow: 0 0 10px #FFF2F3;
        }
    }

    .art-container {
        display: flex;
        
        flex-direction: row;
        flex-wrap: wrap;


        //border: 1px solid black;
        //border-radius: 25px;

        &>div {
            min-width: 150px;
            max-width: 100%;
            height: 300px;

            margin: 0 auto;

            background: #E6E4D5AA;

            transition: filter 0.15s;

            &:hover, &:focus {
                filter: brightness(0.85);
            }

            &.width-1\/3 {
                width: 33.33%
            }
            &.width-1\/2 {
                width: 50%
            }
            &.width-2\/3 {
                width: 66.66%
            }
            &.width-full {
                width: 100%;
            }

            &.height-1 {
                height: 150px;
            }
            &.height-2 {
                height: 200px;
            }
            &.height-3 {
                height: 250px;
            }
            &.height-4 {
                height: 300px;
            }
            &.height-5 {
                height: 350px;
            }
            &.height-6 {
                height: 400px;
            }

            img {
                width: 100%;
                height: 100%;

                margin: 0 auto;


                &.fit-contain {
                    object-fit: contain;
                }
                &.fit-cover {
                    object-fit: cover;
                }

                &.img-height-1\/3 {
                    height: 50%;
                    padding-top: 16%;
                }
                &.img-height-2\/3 {
                    height: 66%;
                    padding-top: 7%;
                }
                &.img-height-full {
                    height: 100%;
                }
            }
        }
    }
}

.gallery {
    position: fixed;

    width: 100vw;
    height: 100vh;

    top: 0;
    left: 0;

    background: #000D;
    backdrop-filter: blur(8px);

    transition: opacity 0.15s;

    opacity: 0;
    &:not(.open){
        pointer-events: none;
    }

    &.open {
        opacity: 1;
    }
    
    .gallery-icon {
        position: fixed;

        width: 50px;
        height: 50px;

        z-index: 20;

        margin: 0;
        padding: 0;
        
        border: none;

        color: white;
        background: transparent;
    }

    .gallery-bar {
        position: fixed;

        width: 150px;
        height: 100vh;

        top: 0;

        z-index: 10;

        margin: 0;
        padding: 0;
        
        border: none;

        color: white;
        background: transparent;
    }

    .gallery-thumb {
        top: 25px;
        right: 25px;
    }

    .gallery-go-fullscreen {
        top: 25px;
        right: 100px;
    }

    .gallery-left {
        left: 0px;
    }

    .gallery-right {
        right: 0px;
    }

    .gallery-content {
        display: flex;
        flex-direction: column;

        width: clamp(200px, 50vw, 100%);
        height: 50vh;

        margin: 150px auto;

        img {
            width: 100%;
            height: 100%;

            object-fit: contain;
        }

        .gallery-text {
            .gallery-header {
                display: flex;
                flex-direction: row;

                h1 {
                    margin: 25px 0 0 0;
                    color: #FFFCF7;
                }

                h2 {
                    margin: 25px 15px 0 15px;

                    color: #C4C2BE;
                }
            }
            .gallery-body {
                margin: 0;

                color: #DEDCD7;
            }
        }
    }

    .gallery-fullscreen {
        position: fixed;

        width: 100vw;
        height: 100vh;
        
        z-index: 40;

        top: 0;
        left: 0;

        background: black;

        button {
            position: fixed;

            top: 25px;
            right: 25px;
            
            border: none;

            color: white;
            background: transparent;

            mix-blend-mode: difference;
        }

        img {
            width: 100%;
            height: 100%;

            z-index: 50;

            object-fit: contain;

        }
    }
}

@media only screen and (max-width: 768px) {
    #art.page {
        width: 100%;
        //min-height: 300vh;

        margin: 0;

        .art-content {
            margin: 50px 10vw;
            //position: sticky;
            //top: 100px;

            //color: dimgrey;
            text-shadow: 1px 1px 3px #0004;
        }

        .art-section {
            h2 {
                position: initial;
            }
        }

        .art-container {
            &>div {
                width: 100% !important;
            }
        }
    }

    .gallery {
        .gallery-bar {
            width: 50px;
            height: 50px;

            top: 25px;
        }

        .gallery-left {
            left: 25px;
        }

        .gallery-right {
            left: 125px;
        }

        .gallery-content {
            width: clamp(200px, 100vw, 100%);
            height: 50vh;

            margin: 100px 0;
            padding: 0;

            img {
                width: 100%;
                height: 100%;

                margin: 0;
                padding: 0;

                object-fit: cover;
            }

            .gallery-text {
                margin: 25px;

                .gallery-header {
                    flex-direction: column;

                    h1 {
                        margin: 25px 0 0 0;
                    }

                    h2 {
                        margin: 0;

                        font-size: 0.5rem;
                    }
                }
            }
        }
    }
}
</style>