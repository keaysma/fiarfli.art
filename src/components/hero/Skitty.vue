<template>
  <div id="hero">
    <div id="hero-image" />

    <nav :class="{ scrollAtTop }">
      <!-- <img class="logo" src="/fiarfli-logo.png" width="200px" height="200px" /> -->
      <img class="signature" src="/raquel-signature.svg" width="250px" height="75px" />

      <div class="nav-links" @mouseenter="() => { navHover = true; setHover(true) }" @mouseleave="setHover(false)">
        <a id="art-link" class="nav-link" href="#art">Art <span>▼</span></a>
        <a class="nav-link" href="#commissions">Commissions</a>
        <a class="nav-link" href="#contact-me">Contact Me</a>

        <div class="art-block-links" :class="{ navHover }">
          <a v-for="(block, blockIndex) in blocks" :key="blockIndex" :href="`#${blockSections[blockIndex]}`"
            class="nav-link">
            {{ block.name }}
          </a>
        </div>
      </div>
    </nav>

    <p class="text-block">{{ about }}</p>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { Block } from '/src/types';
import { debounce } from '/src/utils';

const props = defineProps<{
  about: string;
  blocks: Block[];
}>();

const blockSections = computed(() =>
  props.blocks.map(({ name }) => name.toLowerCase().replace(/ /g, '-'))
)

const navHover = ref(false);
const setHover = debounce((value: boolean) => {
  navHover.value = value;
}, 250);

const scrollAtTop = ref(true);
const scrollHanlder = () => {
  // set scrollAtTop to true if scrollY is less than 100
  // set scrollAtTop to false if scrollY is greater than 100
  scrollAtTop.value = window.scrollY < 50;
}

onMounted(() => {
  window.addEventListener('scroll', scrollHanlder);
});

onUnmounted(() => {
  window.removeEventListener('scroll', scrollHanlder);
});
</script>

<style lang="scss">
#hero {
  --transition: all 0.25s ease-in-out;

  display: block;
  width: 100%;
  height: calc(100vh - 0em);

  >#hero-image {
    position: fixed;

    width: 100%;
    height: 100%;
    top: 0;

    background: linear-gradient(165deg, #000b 30%, #0000), center/cover url(/skitty.webp);
  }

  >nav {
    position: fixed;
    display: inline-flex;
    align-items: center;

    width: 100%;
    height: 80px;
    z-index: 89;

    padding: 1em 3em;

    backdrop-filter: invert(0) contrast(1) brightness(0.5) blur(0.5em);

    transition: var(--transition);

    @media only screen and (max-width: 768px) {
      padding: 0.5em;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      width: calc(100% - 1em);
      height: 60px;

      .signature {
        height: 35px;
        width: 120px;
      }

    }

    &:not(.scrollAtTop) {
      padding: 0.25em 3em;
      height: 35px;

      @media only screen and (max-width: 768px) {
        height: 60px;
        padding: 0.5em;
      }

      .signature {
        height: 35px;
        width: 120px;
      }

      .nav-links {
        >#art-link {
          display: flex;
          flex-direction: row;

          gap: 0.125em;

          >span {
            font-size: x-small;
          }
        }

        >.nav-link {
          font-size: 0.75em;
        }
      }
    }


    .logo {
      filter: contrast(0) brightness(2) opacity(0.3);
    }

    .signature {
      transition: var(--transition);
      margin-right: 0.5em;
      margin-left: -0.25em;
    }

    .nav-links {
      position: relative;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      gap: 1em;

      >.nav-link {
        @media only screen and (max-width: 768px) {
          font-size: 0.75em;
        }

        color: rgb(234, 205, 209);
        text-decoration: none;
        font-size: 1.25em;
        transition: var(--transition);
      }
    }

    .art-block-links {
      position: absolute;
      display: flex;
      flex-direction: column;

      top: 1.5em;
      left: -1em;
      width: 100%;

      opacity: 0;
      pointer-events: none;
      transition: opacity ease-in-out 0.25s;

      padding: 0.5em 1em;

      background: rgba(0, 0, 0, 0.75);
      border-radius: 0.5em;

      &.navHover {
        opacity: 1;
        pointer-events: all;
      }

      >a {
        color: white;
        text-decoration: none;
        font-size: 1em;
        transition: var(--transition);

        &:hover {
          color: #d389a7;
        }
      }
    }
  }

  .text-block {
    position: absolute;
    max-width: 25em;

    padding: 0 3em;
    top: 6em;

    margin: 0;

    text-align: left;

    color: white;
    white-space: break-spaces;

    @media only screen and (max-width: 768px) {
      padding: 0.5em;
    }

  }
}
</style>