<template lang="">
    <div id="art" class="page">
        <div class="art-content">
            <h1>Art</h1>
            <div v-for="(block, blockIndex) in blocks" :key="blockIndex" class="art-section" :id="`art-${block.name}`">
                <h2>{{ block.name }}</h2>
                <div class="art-container">
                    <div
                        v-for="(content, contentIndex) in block.content" :key="contentIndex"
                        v-bind:style="{gridArea: `span ${content.height} / span ${content.width}`, gridGap: `5px`}"
                        @click="setGallerySettings({blockIndex,contentIndex});setIsGalleryOpen(true)"
                    >
                        <content v-bind:content="content" :displayIcon="true" :useColor="true" :useThumbnail="true"/>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Gallery -->
    <div class="gallery" :class="{open: isGalleryOpen}" v-on:click.self="closeGallery()">
        <!-- <button class="gallery-icon gallery-go-fullscreen" @click="setIsGalleryFullscreen(true)">
            <font-awesome-icon :icon="faExpandArrowsAlt" size="2x" />
        </button> -->
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
            <div class="image-container hover-focus">
                <content v-bind:content="blocks?.[gallerySettings?.blockIndex]?.content?.[gallerySettings?.contentIndex]" :controls="true" />
            </div>
            <div class="gallery-text">
                <div class="gallery-header">
                    <div class="gallery-title">
                        <h1>{{ blocks?.[gallerySettings?.blockIndex]?.content?.[gallerySettings?.contentIndex]?.title }}</h1>
                        <a @click="getShortcutLink(getShortcutFromTitle(blocks?.[gallerySettings?.blockIndex]?.content?.[gallerySettings?.contentIndex]?.title))">share</a>
                    </div>
                    <h2>{{ blocks?.[gallerySettings?.blockIndex]?.content?.[gallerySettings?.contentIndex]?.date }}</h2>
                </div>
                <div class="gallery-body">
                    <p>{{ blocks?.[gallerySettings?.blockIndex]?.content?.[gallerySettings?.contentIndex]?.desc }}</p>
                </div>
            </div>
        </div>

        <!-- Fullscreen Gallery -->
        <div v-if="isGalleryFullscreen" class="gallery-fullscreen" v-on:touchstart="touchStart" v-on:touchend="touchEnd">
            <content v-bind:content="blocks?.[gallerySettings?.blockIndex]?.content?.[gallerySettings?.contentIndex]" :controls="true" :fullscreen="true"/>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from "vue";

import state from "../state";

import indexData from "../index.json";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faTimes,
  faExpandArrowsAlt,
  faCompressArrowsAlt,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import Content from "./Content.vue";

export default {
  created() {
    onMounted(() => {
      console.debug(`FlexGallery::created::onMounted`, location.hash);

      const hashPath = location.hash.slice(1);
      console.debug({
        hashPath,
        setIsGalleryOpen: this.setIsGalleryOpen,
        blocks: this.blocks,
      });

      // Select gallery item by hashPath
      // Find blockIndex, contentIndex
      const blockIndex = this.blocks.findIndex((block) =>
        block.content.find((content) => 
          this.getShortcutFromTitle(content.title) === hashPath
        )
      );

      console.debug({ blockIndex });

      if (blockIndex > -1) {
        const contentIndex = this.blocks[blockIndex].content.findIndex(
          (content) => this.getShortcutFromTitle(content.title) === hashPath
        );

        if (contentIndex > -1) {
          console.log(`Found content with path ${hashPath}`, {
            blockIndex,
            contentIndex,
          });

          document.getElementById('art').scrollIntoView();

          this.setGallerySettings({ blockIndex, contentIndex });
          this.setIsGalleryOpen(true);
        }
      }

      window.addEventListener("keydown", (e) => {
        //console.log({key: e.key})
        //console.log({this: this})

        if (e.key === "Escape") {
          if (this.isGalleryFullscreen === false) {
            state.isGalleryOpen = false;
            document.body.style.overflow = "auto";
          }

          this.isGalleryFullscreen = false;
        }

        if (e.key === "f") {
          if (state.isGalleryOpen === true)
            state.isGalleryFullscreen = !state.isGalleryFullscreen;
        }

        if (e.key === "ArrowLeft") {
          this.galleryPrevious();
        }

        if (e.key === "ArrowRight") {
          this.galleryNext();
        }
      });
    });
  },

  setup() {
    state.blocks = indexData.blocks;

    const setIsGalleryFullscreen = (value) => {
      state.isGalleryFullscreen = value;
    };

    // TODO: Use TypeScript :(((
    const setIsGalleryOpen = (value /* boolean */) => {
      state.isGalleryOpen = value;
      document.body.style.overflow = "hidden";
    };
    const closeGallery = () => {
      state.isGalleryOpen = false;
      state.isGalleryFullscreen = false;
      document.body.style.overflow = "auto";
    };

    const gallerySettings = ref({});
    const setGallerySettings = (value) => (gallerySettings.value = value);

    const touchStartEvent = ref();

    return {
      setIsGalleryFullscreen,

      setIsGalleryOpen,
      closeGallery,

      gallerySettings,
      setGallerySettings,
    };
  },

  methods: {
    touchStart(touchEvent) {
      this.touchStartEvent = touchEvent;
    },

    touchEnd(touchEvent) {
      const xMove =
        touchEvent?.changedTouches?.[0]?.screenX -
        this.touchStartEvent?.changedTouches?.[0]?.screenX;

      if (xMove >= 50) this.galleryPrevious();

      if (xMove <= -50) this.galleryNext();
    },

    // Turns any given string into a snake-case string
    // Used for quick-finding art pieces
    // Hangin' (full color) -> hangin-full-color
    getShortcutFromTitle(title /* string */) {
      return title
        .replaceAll(/[^A-Za-z0-9 ]/g, " ") // Turn all non-alphanumeric characters into spaces
        .replaceAll(/[ ]+/g, "-") // Condense all groups of spaces into '-'
        .replace(/-$/, "") // If there's a trailing '-' remove it
        .toLowerCase(); // All lowercase
    },

    // Gets the full path to a shortcut
    getShortcutLink(shortcut /* string */) {
        const shortcutUrl = `${location.host}/#${shortcut}`
        console.debug(`getShortcutLink`, shortcutUrl)

        if(navigator.clipboard){
            console.warn('Clipboard is not enabled, link cannot be copied')
            return
        }

        navigator.clipboard.writeText(shortcutUrl).then(() => console.debug('copied'))
    },

    galleryPrevious() {
      let newContentIndex = (this?.gallerySettings?.contentIndex ?? 0) - 1;
      let newBlockIndex = this?.gallerySettings?.blockIndex ?? 0;

      if (newContentIndex < 0) {
        newBlockIndex -= 1;

        if (newBlockIndex < 0) {
          newBlockIndex = this?.blocks?.length - 1;
        }

        newContentIndex = this?.blocks?.[newBlockIndex]?.content?.length - 1;
      }

      this.gallerySettings = {
        contentIndex: newContentIndex,
        blockIndex: newBlockIndex,
      };
    },

    galleryNext() {
      let newContentIndex = (this?.gallerySettings?.contentIndex ?? 0) + 1;
      let newBlockIndex = this?.gallerySettings?.blockIndex ?? 0;

      if (newContentIndex >= this?.blocks?.[newBlockIndex]?.content?.length) {
        newContentIndex = 0;
        newBlockIndex += 1;

        if (newBlockIndex >= this?.blocks?.length) {
          newBlockIndex = 0;
          newContentIndex = 0;
        }
      }

      this.gallerySettings = {
        contentIndex: newContentIndex,
        blockIndex: newBlockIndex,
      };
    },
  },

  computed: {
    blocks() {
      return state?.blocks;
    },
    mediaContentNames() {
      return state?.mediaContentNames;
    },
    mediaContent() {
      return state?.mediaContent;
    },

    isGalleryOpen() {
      return state?.isGalleryOpen;
    },
    isGalleryFullscreen() {
      return state?.isGalleryFullscreen;
    },
  },

  components: {
    FontAwesomeIcon,
    Content,
  },

  data() {
    return {
      faTimes,
      faExpandArrowsAlt,
      faCompressArrowsAlt,
      faChevronLeft,
      faChevronRight,
    };
  },
};
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
      z-index: 11;

      padding: 5px 0px;

      backdrop-filter: blur(14px);
      text-shadow: 0 0 10px #fff2f3;
    }
  }

  .art-container {
    display: grid;
    grid-template-rows: auto minmax(0, 150px);
    grid-template-columns: repeat(6, 1fr);

    & > div {
      width: 100%;
      height: 100%;

      justify-self: center;

      margin: 0 auto;

      transition: filter 0.15s;

      &:hover,
      &:focus {
        filter: brightness(0.85);
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

    & > div.image-container,
    img {
      width: 100%;
      height: 100%;

      object-fit: contain;

      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }

    .gallery-text {
      .gallery-header {
        display: flex;
        flex-direction: column;

        h1 {
          margin: 25px 0 0 0;
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
                font-size: 10px;
                color: blue;

                margin: 0 0 10px 5px;
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

    img {
      width: 100%;
      height: 100%;

      z-index: 50;

      object-fit: contain;
      background-size: contain;
      background-repeat: no-repeat;
      background-position: center;
    }
  }
}

.hover-focus {
  &:hover,
  &:focus {
    filter: brightness(0.95);
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
      & > div {
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