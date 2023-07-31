<template>
  <div id="hero">
    <div id="hero-image" />

    <nav>
      <img class="signature" src="/Raquel-signature.svg" width="200px" height="50px" />

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
defineProps<{
  about: string;
}>();
</script>

<style lang="scss">
#hero {
  display: block;
  width: 100%;
  height: calc(100vh - 8em);

  >#hero-image {
    position: fixed;

    width: 100%;
    height: 100%;
    top: 0;

    background: linear-gradient(165deg, #000b 30%, #0000), center/cover url(/skitty.webp);
  }

  >nav {
    display: block;
    position: fixed;
    backdrop-filter: blur(20px) brightness(0.75);

    width: 100%;
    height: 80px;
    z-index: 99;

    padding: 1em 3em;

    .signature {
      margin: 0 auto 0 -0.5em;
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
      }
    }
  }

  .text-block {
    position: absolute;
    max-width: 23em;

    padding: 0 3em;
    top: 5em;

    margin: 0;

    text-align: left;

    color: white;
    white-space: break-spaces;
  }
}
</style>