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
            <Content v-bind:content="currentContent" :controls="true" :use-thumbnail="true" @click="gallerySettings.fullscreen = true" />
            <button class="gallery-icon gallery-go-fullscreen">
                <FontAwesomeIcon :icon="faExpand" size="2x" />
            </button>
            <div class="gallery-text">
                <div class="gallery-header">
                    <div class="gallery-title">
                        <h1>{{ currentContent?.title }}
                        </h1>
                        <a @click="getShortcutLink(getShortcutFromTitle(currentContent?.title))">share</a>
                    </div>
                    <h2>{{ currentContent?.date }}</h2>
                </div>
                <div class="gallery-body">
                    <p>{{ currentContent?.desc }}</p>
                </div>
            </div>
        </div>

        <!-- Fullscreen Gallery -->
        <div v-if="gallerySettings.fullscreen" class="gallery-fullscreen" @touchstart="touchStart" @touchend="touchEnd">
            <Content :key="currentContent.desc" :content="currentContent" :controls="true" :fullscreen="true" />
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

    background: #000d;
    backdrop-filter: blur(20px);

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
        display: flex;
        flex-direction: column;

        width: clamp(200px, 50vw, 100%);
        height: auto;

        margin: 100px auto;

        >.content {
            height: 50vh;

            transition: filter 0.25s;

            cursor: pointer;

            >img {
                object-fit: contain;
            }

            &:hover {
                filter: brightness(0.8);

                + .gallery-go-fullscreen {
                    opacity: 1;
                    filter: brightness(1);
                }
            }
        }

        .gallery-text {
            .gallery-header {
                display: flex;
                flex-direction: column;

                h1 {
                    font-size: 0.7em;
                    color: #fffcf7;
                }

                h2 {
                    margin: 0;

                    line-height: 0.9rem;
                    font-size: 1rem;
                    color: #61605e;
                }

                .gallery-title {
                    display: flex;
                    flex-direction: row;
                    align-items: flex-end;

                    a {
                        font-family: Arial, Helvetica, sans-serif;
                        font-size: 15px;
                        color: blue;

                        margin: 0 0 25px 5px;
                    }
                }
            }

            .gallery-body {
                margin: 0;

                color: #dedcd7;
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
