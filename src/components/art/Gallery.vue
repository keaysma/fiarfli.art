<template>
    <div class="gallery" :class="{ open: gallerySettings.open }" @click.self="gallerySettings.open = false">
        <button class="gallery-icon gallery-thumb" @click="gallerySettings.open = false">
            <FontAwesomeIcon :icon="faTimes" size="2x" />
        </button>

        <button class="gallery-bar gallery-left" @click="previous()">
            <FontAwesomeIcon :icon="faChevronLeft" size="2x" />
        </button>
        <button class="gallery-bar gallery-right" @click="next()">
            <FontAwesomeIcon :icon="faChevronRight" size="2x" />
        </button>

        <div class="gallery-content" v-on:touchstart="touchStart" v-on:touchend="touchEnd">
            <Content v-bind:content="currentContent" :controls="true" :use-thumbnail="true"
                @click="gallerySettings.fullscreen = true" />

            <div class="gallery-text">
                <h1 class="gallery-header">{{ currentContent.title }}</h1>
                <br />
                <h2 class="gallery-header">{{ standardDate(currentContent.date) }}</h2>
                <hr />
                <p class="gallery-body">{{ currentContent.desc }}</p>
                <br>
                <a>
                    share
                </a>
            </div>
        </div>

        <!-- Fullscreen Gallery -->
        <div v-if="gallerySettings.fullscreen" class="gallery-fullscreen" @touchstart="touchStart" @touchend="touchEnd">
            <Content :key="currentContent.desc" :content="currentContent" :controls="true" :fullscreen="true"
                @click="gallerySettings.fullscreen = false" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"
import {
    faTimes,
    faExpand,
    faChevronLeft,
    faChevronRight,
    faShare,
} from "@fortawesome/free-solid-svg-icons";

import { getShortcutFromTitle } from "/src/utils";

import { Block, GallerySettings } from "/src/types";
import Content from "./Content.vue";

const props = defineProps<{
    gallerySettings: GallerySettings;
    blocks: Block[];
}>();

const currentContent = computed(() => {
    return props.blocks[props.gallerySettings.blockIndex].content?.[props.gallerySettings.contentIndex];
});

const touchStartEvent = ref<TouchEvent>();
const touchStart = (touchEvent: TouchEvent) => {
    touchStartEvent.value = touchEvent;
}
const touchEnd = (touchEvent: TouchEvent) => {
    if (!touchStartEvent.value) return;

    const xMove =
        touchEvent.changedTouches[0].screenX -
        touchStartEvent.value.changedTouches[0].screenX;

    if (xMove >= 50) previous();
    if (xMove <= -50) next();
};

const previous = () => {
    const previousBlock = props.gallerySettings.blockIndex - 1;
    const previousContent = props.gallerySettings.contentIndex - 1;

    if (previousContent >= 0) {
        props.gallerySettings.contentIndex = previousContent;
        return;
    }

    if (previousBlock >= 0) {
        props.gallerySettings.blockIndex = previousBlock;
        props.gallerySettings.contentIndex = props.blocks[previousBlock].content.length - 1;
        return;
    }

    props.gallerySettings.blockIndex = props.blocks.length - 1;
    props.gallerySettings.contentIndex = props.blocks[props.gallerySettings.blockIndex].content.length - 1;
}

const next = () => {
    const nextBlock = props.gallerySettings.blockIndex + 1;
    const nextContent = props.gallerySettings.contentIndex + 1;

    const currentContent = props.blocks[props.gallerySettings.blockIndex].content;
    if (nextContent < currentContent.length) {
        props.gallerySettings.contentIndex = nextContent;
        return;
    }

    props.gallerySettings.contentIndex = 0;
    props.gallerySettings.blockIndex = nextBlock < props.blocks.length ? nextBlock : 0;
}

const standardDate = (dateString: string): string => {
    const date = new Date(dateString);

    const formattedDate = date.toLocaleString('default', { month: 'long', year: 'numeric' });
    if (formattedDate === "Invalid Date") {
        return dateString;
    }

    return formattedDate;
}

// Gets the full path to a shortcut
const getShortcutLink = (shortcut: string) => {
    const shortcutUrl = `${location.host}/#${shortcut}`;
    console.debug(`getShortcutLink`, shortcutUrl);

    if (!navigator.clipboard) {
        console.warn("Clipboard is not enabled, link cannot be copied");
        return;
    }

    navigator.clipboard
        .writeText(shortcutUrl)
        .then(() => console.debug("copied"));
}

const keyboardListener = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
        if (props.gallerySettings.fullscreen === false) {
            props.gallerySettings.open = false;
            // document.body.style.overflow = "auto";
        }

        props.gallerySettings.fullscreen = false;
    }

    if (e.key === "f") {
        if (props.gallerySettings.open)
            props.gallerySettings.fullscreen = !props.gallerySettings.fullscreen;
    }

    if (e.key === "ArrowLeft") {
        previous();
    }

    if (e.key === "ArrowRight") {
        next();
    }
}

onMounted(() => {
    window.addEventListener("keydown", keyboardListener);
})

onUnmounted(() => {
    window.removeEventListener("keydown", keyboardListener);
})
</script>

<style lang="scss">
.gallery {
    position: fixed;

    width: 100vw;
    height: 100vh;

    top: 0;
    left: 0;

    z-index: 999;

    background: #111d;
    backdrop-filter: blur(50px);

    transition: opacity 0.15s;

    opacity: 0;

    &:not(.open) {
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
        opacity: 0;
        top: 33%;
        right: calc(50% - 25px);

        transition: opacity 0.25s;

        pointer-events: none;
    }

    .gallery-left {
        left: 0px;
    }

    .gallery-right {
        right: 0px;
    }

    .gallery-content {
        position: fixed;
        top: 25%;
        left: 12.5%;

        display: flex;
        flex-direction: row;
        gap: 1em;

        width: 75%;
        height: 50vh;
        justify-content: center;
        align-items: center;

        @media only screen and (max-width: 768px) {
            flex-direction: column;
        }

        >.content {
            flex: 1;
            // height: 100%;

            transition: filter 0.25s;

            cursor: pointer;

            >img {
                height: 100%;
                max-height: 100%;
                object-fit: contain;

                @media only screen and (max-width: 768px) {
                    width: 75vw;
                    max-height: 50vh;
                }
            }

            &:hover {
                filter: brightness(0.8);

                &::after {
                    content: "⛶";
                    color: white;
                    position: absolute;
                    left: calc(50% - 14px);
                    top: calc(50% - 22px);
                }
            }


        }

        >.gallery-text {
            flex: 1;
            line-height: 0.65em;

            @media only screen and (max-width: 768px) {
                width: 100%;
            }

            >*:not(hr) {
                display: inline-block;
            }

            >h1,
            h2,
            p {
                margin: 0;
                text-align: left;
            }

            h1 {
                color: #dedcd7;
                font-size: 1.5em;
                line-height: 0.75em;
            }

            h2 {
                color: #c0bdb8;
                font-size: 0.75em;
            }

            p {
                color: #858480;
                line-height: 0.75em;
            }

            hr {
                border-color: #5c5c5a;
                margin: 5px 0;
            }

            a {
                color: royalblue;
                font-size: 0.75em;
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

        >.content {

            width: 100%;
            height: 100%;

            z-index: 50;

            img {
                object-fit: contain;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
            }
        }
    }
}
</style>
