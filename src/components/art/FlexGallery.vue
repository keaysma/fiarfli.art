<template lang="">
    <div id="art" class="page">
        <div class="art-content">
            <h1>Art</h1>
            <div v-for="(block, blockIndex) in blocks" :key="blockIndex" class="art-section">
                <h2>{{ block.name }}</h2>
                <div class="art-container">
                    <div
                        v-for="(content, contentIndex) in block.content" :key="contentIndex"
                        v-bind:class="`width-${content.width} height-${content.height}`"
                        @click="setIsGalleryOpen(true);setGallerySettings({blockIndex,contentIndex})"
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
    <div v-if="isGalleryOpen" class="gallery" v-on:click.self="setIsGalleryOpen(false)">
        <button class="gallery-fullscreen" @click="setIsGalleryOpen(true)">
            <font-awesome-icon :icon="faExpandArrowsAlt" size="3x" />
        </button>
        <button class="gallery-thumb" @click="setIsGalleryOpen(false)">
            <font-awesome-icon :icon="faTimes" size="4x" />
        </button>

        <button class="gallery-left" @click="galleryPrevious()">
            <font-awesome-icon :icon="faChevronLeft" size="3x" />
        </button>
        <button class="gallery-right" @click="galleryNext()">
            <font-awesome-icon :icon="faChevronRight" size="3x" />
        </button>

        <div class="gallery-content">
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
    </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faTimes, faExpandArrowsAlt, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

export default {
    created () {
        fetch(`/art/index.json`).then(res => res.json())
        .then(({blocks}) => {
            this.blocks = [
                ... blocks
            ]
        })
        .catch((e) => {
            console.log(e)
        })
    },

    setup () {
        const isGalleryOpen = ref(false);
        const setIsGalleryOpen = (value) => (isGalleryOpen.value = value);

        const gallerySettings = ref({});
        const setGallerySettings = (value) => (gallerySettings.value = value);

        return {
            isGalleryOpen,
            setIsGalleryOpen,

            gallerySettings,
            setGallerySettings,
        }
    },

    methods: {
        galleryPrevious(){
            console.log(`previous`)
            console.log({ gallerySettings: this.gallerySettings })

            let newContentIndex = (this?.gallerySettings?.contentIndex ?? 0) - 1
            let newBlockIndex = (this?.gallerySettings?.blockIndex ?? 0)

            if(newContentIndex < 0){
                newContentIndex = 0

                if(newBlockIndex > 0){
                    newBlockIndex -= 1
                    newContentIndex = this?.blocks?.[newBlockIndex]?.content?.length - 1
                }else{
                    newBlockIndex = this?.blocks?.length - 1
                }
            }

            console.log({
                newContentIndex,
                newBlockIndex
            })

            this.gallerySettings = {
                contentIndex: newContentIndex,
                blockIndex: newBlockIndex
            }
        },

        galleryNext(){
            console.log(`next`)
            console.log({ gallerySettings: this.gallerySettings })

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

            console.log({
                newContentIndex,
                newBlockIndex
            })

            console.log(this?.blocks?.[newBlockIndex]?.content?.[newContentIndex])

            this.gallerySettings = {
                contentIndex: newContentIndex,
                blockIndex: newBlockIndex
            }
        }
    },

    components: {
        FontAwesomeIcon
    },

    data () {
        return {
            faTimes, faExpandArrowsAlt, faChevronLeft, faChevronRight,

            blocks: [],
        }
    }
}
</script>

<style lang="scss">
.page {
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

    .gallery-thumb {
        position: fixed;

        width: 50px;
        height: 50px;

        top: 50px;
        right: 50px;

        margin: 0;
        padding: 0;

        border: none;
        color: white;
        background: transparent;
    }

    .gallery-fullscreen {
        position: fixed;

        width: 50px;
        height: 50px;

        top: 50px;
        right: 150px;

        margin: 0;
        padding: 0;

        border: none;
        color: white;
        background: transparent;
    }

    .gallery-left {
        position: fixed;

        width: 50px;
        height: 50px;

        top: 50%;
        left: 50px;

        margin: 0;
        padding: 0;

        border: none;
        color: white;
        background: transparent;
    }

    .gallery-right {
        position: fixed;

        width: 50px;
        height: 50px;

        top: 50%;
        right: 50px;

        margin: 0;
        padding: 0;

        border: none;
        color: white;
        background: transparent;
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
}

@media only screen and (max-width: 650px) {
    .page {
        width: 100%;
        min-height: 300vh;

        margin: 0;

        .art-content {
            margin: 50px 10vw;
            //position: sticky;
            //top: 100px;

            //color: dimgrey;
            text-shadow: 1px 1px 3px #0004;
        }

        .art-container {
            &>div {
                width: 100% !important;
            }
        }
    }
}
</style>