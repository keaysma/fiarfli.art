<template>
    <div v-if="(content?.type || 'link') === 'link'" class="content">
        <template v-if="content?.path?.match?.(videoRegex)">
            <video 
                :controls="controls"
            >
                <source v-if="!mediaContentNames.includes(content?.path)" v-bind:src="content.path" type="video/mp4">
                <source v-if="mediaContentNames.includes(content?.path)" v-bind:src="mediaContent?.[content?.path]?.base64" type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div v-if="displayIcon" class="button-container">
                <font-awesome-icon :icon="faPlayCircle" size="3x" />
            </div>
        </template>
        <template v-else>
            <img 
                v-if="!mediaContentNames.includes(content?.path) && !content?.path?.match?.(videoRegex)"
                v-bind:src="useThumbnail ? content?.thumbnail || content?.path : content?.path"
                v-bind:class="`fit-${content?.fit} img-height-${content?.[`img-height`] ?? `full`}`"
                v-bind:style="{backgroundColor: useColor && content?.color || '#0000'}"
            />
            <img 
                v-if="mediaContentNames.includes(content?.path) && !content?.path?.match?.(videoRegex)"
                v-bind:class="`fit-${content?.fit} img-height-${content?.[`img-height`] ?? `full`}`"
                v-bind:style="{backgroundImage: `url(${mediaContent?.[content?.path]?.base64})`, backgroundSize: content?.fit}"
            />
            <div v-if="controls && !fullscreen" class="button-container" @click="setIsGalleryFullscreen(true)">
                <button class="">
                    <font-awesome-icon :icon="faExpandArrowsAlt" size="4x" />
                </button>
            </div>
        </template>
        <button v-if="fullscreen" class="close-fullscreen" @click="setIsGalleryFullscreen(false)">
            <font-awesome-icon :icon="faCompressArrowsAlt" size="2x" />
        </button>
    </div>
    <div v-else v-html="content?.html" class="iframe">
    </div>
</template>

<script>
import state from '../state';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCompressArrowsAlt, faExpandArrowsAlt, faPlayCircle } from '@fortawesome/free-solid-svg-icons';

export default {
    props: {
        content: Object,
        controls: Boolean,
        displayIcon: Boolean,
        fullscreen: Boolean,
        useColor: Boolean,
        useThumbnail: Boolean,
    },

    components: {
        FontAwesomeIcon
    },

    setup () {
        const setIsGalleryFullscreen = (value) => {
            state.isGalleryFullscreen = value
        };

        return {
            setIsGalleryFullscreen,
        }
    },

    computed: {
        mediaContentNames(){ return state?.mediaContentNames },
        mediaContent(){ return state?.mediaContent },
        isGalleryFullscreen(){ return state?.isGalleryFullscreen },
    },
    
    data: () => {
        return {
            faCompressArrowsAlt, faExpandArrowsAlt, faPlayCircle,
            videoRegex: new RegExp(/\.(mp4)$/)
        }
    }
}
</script>

<style lang="scss" scoped>
    img, video {
        width: 100%;
        height: 100%;

        margin: 0 auto;

        background-repeat: no-repeat;
        background-position: center;
    }

    img {
        &.fit-contain {
            object-fit: contain;
        }
        &.fit-cover {
            object-fit: cover;
        }
    }

    .close-fullscreen {
        position: fixed;
        z-index: 10;

        top: 25px;
        right: 25px;

        width: 50px;
        height: 50px;
        
        border: none;

        color: white;
        background: transparent;

        mix-blend-mode: difference;
    }

    .content, .iframe {
        position: relative;
        height: 100%;
        width: 100%;
    }

    .iframe {
        display: flex;
        justify-content: center;

        &>* {
            width: 100%;
        }
    }

    .button-container {
        position: absolute;

        width: 100%;
        height: 100%;

        top: 0;

        display: flex;
        justify-content: center;
        align-items: center;

        &>button {
            position: absolute;

            width: 80px;
            height: 80px;
            
            top: calc(50% - 40px);
            left: calc(50% - 40px);
            margin: auto;

            color: #FFFF;
            background: #0008;
            border: none;
            border-radius: 50px;

            opacity: 0;
            transition: opacity 0.15s;
        }

        &:hover>button {
            opacity: 1;
        }
    }
</style>