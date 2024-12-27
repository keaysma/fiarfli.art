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
      <img v-if="!mediaContentNames?.includes(content?.path)" ref="imgRef"
        :src="useThumbnail ? content.thumbnail ?? content.path : content.path"
        :class="`fit-${content.fit} img-height-${content[`img-height`] ?? `full`}`" :style="{
          backgroundColor: (useColor && content?.color) ?? '#0000',
        }" @load="onLoad" />
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
import { ref, watch } from 'vue';
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

const imgRef = ref<HTMLImageElement>();
watch(() => props.content.thumbnail, (content) => {
  console.log(`Content::setup::watch`, content, imgRef);
  if (!imgRef.value) return;

  imgRef.value.style.opacity = '0';
  imgRef.value.parentElement.style.backgroundSize = 'contain';
});
const onLoad = () => {
  console.log(`Content::setup::onLoad`, imgRef.value);
  if (!imgRef.value) return;

  imgRef.value.style.opacity = '1';
  imgRef.value.parentElement.style.backgroundSize = '0';
};

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

  background: url('/loading.gif') no-repeat center center;
  background-size: 0;
  background-repeat: no-repeat;
  background-position: center;

  img,
  video {
    width: 100%;
    height: 100%;

    margin: 0 auto;

    transition: opacity 0.25s ease;

    // background: url('https://gifdb.com/images/high/animated-stars-loading-icon-38ccjfav8iijnqrb.gif');
    // background-size: 0; //50px;
    // background-repeat: no-repeat;
    // background-position: center;
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

.iframe > iframe {
  min-width: unset !important;
}

.contained {
  // z-index: 999;

  // Asserting my control over Instagram embeds
  > iframe, > blockquote {
    min-width: unset !important;
    min-height: unset !important;
    // height: auto;
    width: 100% !important;
  }

  &>* {
    z-index: 9;
  }
}
</style>