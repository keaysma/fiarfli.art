<template lang="">
    <div id="!" class="hero">
        <div class="image-guard" />
        <img 
            class="hero-image"
            src="/skitty.webp"
        />

        <div class="content">
            <img
                class="signature"
                src="/Raquel-signature.svg"
            />

            <div class="hero-nav">
                <div class="nav-links">
                    <!-- <a class="nav-link" href="#!">Home</a> -->
                    <a class="nav-link" href="#art">Art</a>
                    <a class="nav-link" href="#commissions">Commissions</a>
                    <a class="nav-link" href="#contact-me">Contact Me</a>
                </div>
            </div>

            <p class="text-block">{{ about }}</p>
        </div>
    </div>
</template>

<script>
import state from "../state";

import { about } from "../content.json";
export default {
  setup() {
    if (!state.about) state.about = about;
  },

  computed: {
    about() {
      return state?.about;
    },
  },
};
</script>

<style lang="scss">
.hero {
  //position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;

  width: 100vw;
  height: 100vh;

  .hero-image {
    position: fixed;

    top: 0px;

    z-index: 0;

    width: 100%;
    height: 100%;
    object-fit: cover;

    //filter: brightness(0.85);
  }

  .image-guard {
    z-index: 5;

    width: 100%;
    height: 100%;

    background: linear-gradient(165deg, #000b 30%, #0000);
  }

  .content {
    z-index: 10;
  }

  .text-block {
    position: fixed;
    display: flex;
    flex-direction: row;
    justify-content: center;

    width: 50%;
    //margin-top: -150px;

    top: 15%;
    left: 55px;

    text-align: left;
    font-size: 1.75rem;

    color: white;
  }

  .signature {
    position: fixed;

    z-index: 15px;

    top: 5%;
    left: calc(40px);

    width: 250px;
    height: 75px;
  }

  .hero-nav {
    .nav-links {
      position: fixed;
      display: flex;
      flex-direction: row;
      justify-content: center;

      //width: 100%;
      //margin-top: -150px;

      top: 7.5%;
      left: 300px;

      text-align: center;
      font-size: 1.25rem;

      .nav-link {
        color: rgb(234, 205, 209);
        text-decoration: none;
        margin: 0 10px;
      }
    }
  }
}

@media only screen and (max-width: 768px) {
  .hero {
    .hero-image {
      object-position: 65% 0;
    }
    .content {
      .signature,
      .hero-nav {
        display: none;
      }
      .text-block {
        font-size: 1.15rem;
        text-align: center;

        width: calc(100% - 50px);
        margin: 0 25px;

        top: 90px;
        left: 0;
      }
    }
    .image-guard {
      background: linear-gradient(#000 50%, #0008 65%, #0003 85%);
    }
  }
}
</style>