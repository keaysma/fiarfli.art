<template>
  <div id="hero">
    <div id="hero-image" />

    <nav :class="{ scrollAtTop }">
      <!-- <img class="logo" src="/fiarfli-logo.png" width="200px" height="200px" /> -->
      <img class="signature" src="/raquel-signature.svg" width="250px" height="75px" />

      <div class="nav-links">
        <a class="nav-link" href="#art">Art</a>
        <a class="nav-link" href="#commissions">Commissions</a>
        <a class="nav-link" href="#contact-me">Contact Me</a>
      </div>
    </nav>

    <p class="text-block">{{ about }}</p>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

defineProps<{
  about: string;
}>();

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
    z-index: 99;

    padding: 1em 3em;

    backdrop-filter: invert(0) contrast(1) brightness(0.5) blur(0.5em);

    transition: var(--transition);

    &:not(.scrollAtTop) {
      padding: 0.25em 3em;
      height: 35px;

      .signature {
        height: 35px;
        width: 120px;
      }

      .nav-links {
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
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      gap: 1em;

      >.nav-link {
        color: rgb(234, 205, 209);
        text-decoration: none;
        font-size: 1.25em;
        transition: var(--transition);
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
  }
}
</style>