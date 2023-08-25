<template>
  <div v-if="!content.type || content.type === 'link'" class="content" :class="{ controls, fullscreen }">
    <template v-if="content.path.match(videoRegex)">
      <video :controls="controls ?? false">
        <source v-if="!mediaContentNames?.includes(content.path)" :src="content.path" type="video/mp4" />
        <source v-else :src="mediaContent?.[content.path]?.base64" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </template>

    <template v-else>
      <img v-if="!mediaContentNames?.includes(content?.path)"
        :src="useThumbnail ? content.thumbnail ?? content.path : content.path"
        :class="`fit-${content.fit} img-height-${content[`img-height`] ?? `full`}`" :style="{
          backgroundColor: (useColor && content?.color) || '#0000',
        }" />
      <img v-else :class="`fit-${content.fit} img-height-${content[`img-height`] ?? `full`}`" :style="{
        backgroundImage: `url(${mediaContent?.[content?.path]?.base64})`,
        backgroundSize: content?.fit,
      }" />
    </template>
  </div>
  <div v-else-if="content.type === 'contained'" v-html="content.html" class="contained" @click="openContainerLink()" />
  <div v-else v-html="content.html" class="iframe" />
</template>

<script setup lang="ts">
import { Content } from '/src/types';

const props = defineProps<{
  content: Content;
  displayIcon?: boolean;
  useColor?: boolean;
  useThumbnail?: boolean;
  controls?: boolean;
  fullscreen?: boolean;

  // Admin view props
  mediaContentNames?: string[];
  mediaContent?: Record<string, { base64: string }>;
}>();

const videoRegex = new RegExp(/\.(mp4)$/);
const openContainerLink = () => {
  if (!props.content.html) return;
  const parser = new DOMParser();
  const htmlDoc = parser.parseFromString(props.content.html, "text/html");
  console.log({ htmlDoc });

  const link = htmlDoc.body.innerText;
  window.history.pushState({}, '', link);
}

</script>

<style lang="scss">
.content {

  img,
  video {
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
}

.iframe,
.contained {
  display: flex;
  justify-content: center;

  &>* {
    width: 100%;
  }
}

.contained {
  // z-index: 999;

  &>* {
    z-index: 9;
  }
}</style>