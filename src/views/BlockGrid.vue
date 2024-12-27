<script setup lang="ts">
import { ref, onMounted, computed } from "vue";

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

const selectedTags = ref<string[]>([]);
const tags = computed(() =>
  new Set<string>(props.blocks.map((block) => block.content.map((content) => content.tags)).flat(2))
);

const filteredBlocks = computed(() => {
  if (selectedTags.value.length === 0) {
    return props.blocks;
  }

  return props.blocks.map((block) => {
    return {
      ...block,
      content: block.content.filter((content) => {
        return content.tags.some((tag) => selectedTags.value.includes(tag));
      }),
    };
  });
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
</script>

<template>
  <div id="art" class="page">
    <!-- <h1>Art</h1> -->
    <!-- <div class="tag-list">
        <button v-for="(tag, tagIndex) in tags" :key="tagIndex" :id="`tag-${tag}`"
          @click="selectedTags.includes(tag) ? selectedTags.splice(selectedTags.indexOf(tag), 1) : selectedTags.push(tag)">
          {{ tag }} {{ selectedTags.includes(tag) ? "✓" : "" }}
        </button>
      </div> -->
    <div v-for="(block, blockIndex) in filteredBlocks" :key="blockIndex" class="art-section" :id="`art-${block.name}`">
      <template v-if="block.content.length > 0">
        <h2 :id="block.name.toLowerCase().replaceAll(/\ /g, '-')">{{ block.name }}</h2>
        <div class="art-container">
          <template v-for="(content, contentIndex) in block.content" :key="contentIndex">
            <template v-if="content.hidden !== true">
              <Content :class="content.type" :style="{ gridArea: `span ${content.height} / span ${content.width}` }"
                :content="content" :displayIcon="true" :useColor="true" :useThumbnail="true"
                @click="gallerySettings = { blockIndex, contentIndex, open: true, fullscreen: false }" />
            </template>
          </template>
        </div>
      </template>
    </div>
  </div>

  <!-- Gallery -->
  <Gallery :blocks="filteredBlocks" :gallerySettings="gallerySettings" />
</template>

<style lang="scss">
#art.page {
  margin: 0;
  overflow: hidden;
  text-align: center;


  .tag-list {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 5px;

    button {
      padding: 5px 10px;
      margin: 15px 0;

      border: 1px solid #0002;
      border-radius: 5px;

      background-color: #fff4;
      backdrop-filter: blur(5px);

      font-size: 1em;

      gap: 10px;

      &:hover {
        background-color: #fff4;
      }
    }
  }

  .art-section {
    max-width: 900px;
    margin: auto;

    >h2 {
      scroll-margin-top: 120px;
    }
  }

  .art-container {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 8px;

    &>.content {
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
    .art-section {
      // padding-top: 100px;
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
  }
}
</style>