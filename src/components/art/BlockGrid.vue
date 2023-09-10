<template>
  <div id="art" class="page">
    <div class="art-content">
      <!-- <h1>Art</h1> -->
      <div v-for="(block, blockIndex) in blocks" :key="blockIndex" class="art-section" :id="`art-${block.name}`">
        <h2>{{ block.name }}</h2>
        <div class="art-container">
          <Content v-for="(content, contentIndex) in block.content" :key="contentIndex" :class="content.type"
            :style="{ gridArea: `span ${content.height} / span ${content.width}` }" :content="content" :displayIcon="true"
            :useColor="true" :useThumbnail="true"
            @click="gallerySettings = { blockIndex, contentIndex, open: true, fullscreen: false }" />
        </div>
      </div>
    </div>
  </div>

  <!-- Gallery -->
  <Gallery :blocks="blocks" :gallerySettings="gallerySettings" />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import Content from "/src/components/art/Content.vue";
import Gallery from "/src/components/art/Gallery.vue";

import { Block, GallerySettings } from "/src/types";
import { getShortcutFromTitle } from "/src/utils";

const props = defineProps<{
  blocks: Block[];
}>();

const gallerySettings = ref<GallerySettings>({
  blockIndex: 0,
  contentIndex: 0,
  open: false,
  fullscreen: false,
});

onMounted(() => {
  console.debug(`FlexGallery::setup::onMounted`, location.hash);

  const hashPath = location.hash.slice(1);
  if (hashPath.length > 1) {
    // Select gallery item by hashPath
    // Find blockIndex, contentIndex
    const blockIndex = props.blocks.findIndex((block) =>
      block.content.find(
        (content) => getShortcutFromTitle(content.title) === hashPath
      )
    );

    if (blockIndex > -1) {
      const contentIndex = props.blocks[blockIndex].content.findIndex(
        (content) => getShortcutFromTitle(content.title) === hashPath
      );

      if (contentIndex > -1) {
        console.log(`Found content with path ${hashPath}`, {
          blockIndex,
          contentIndex,
        });

        document.getElementById("art").scrollIntoView();

        gallerySettings.value = { blockIndex, contentIndex, open: true, fullscreen: false };
      }
    }
  }

});

// TODO: do this with a listener
// const setIsGalleryOpen = (value?: ContentType) => {
//   if (!value || value === "link") {
//     isGalleryOpen.value = true;
//     document.body.style.overflow = "hidden";
//   }
// };

// const closeGallery = () => {
//   isGalleryOpen.value = false;
//   isGalleryFullscreen.value = false;
//   document.body.style.overflow = "auto";
// };
</script>

<style lang="scss">
#art.page {
  display: flex;
  flex-direction: column;

  width: 100%;
  min-height: 100vh;

  margin: 0;

  overflow: hidden;

  .art-content {
    margin: 75px 125px;
    top: 200px;

    color: #534957;
    text-shadow: 1px 1px 1px #d389a7f4;
  }

  .art-section {
    margin: 0 0 50px 0;

    max-width: 900px;
    margin: auto;

    h2 {
      position: sticky;
      top: 0px;
      z-index: 11;

      padding: 5px 0px;
    }
  }

  .art-container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 8px;

    &>.content {
      //max-width: 20vw;
      // max-height: 20vw;
      transition: filter 0.15s;

      &:hover:not(.iframe, .contained),
      &:focus:not(.iframe, .contained) {
        filter: brightness(0.85);
      }
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
        font-size: 1.5rem;
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

    .art-content {
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




      .content>* {

        &:hover,
        &:focus {
          filter: brightness(0.95);
        }
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