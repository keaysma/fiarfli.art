<template lang="">
    <div class="hero">
        <img 
            class="hero-image"
            src="/witch_girl_jump.png" />
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
.hero {
    //position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    width: 100%;
    height: 100vh;

    .hero-image {
        width: 100%;
        height: 100%;
        object-fit: cover;

        filter: brightness(0.85);
    }

    .text-block {
        position: fixed;
        display: flex;
        flex-direction: column;
        justify-content: center;

        top: 625px;
        width: 100%;
        margin-top: -150px;

        text-align: center;

        color:sandybrown;

        .signature {
            font-size: 1.5rem;
        }

        .summary {
            margin: -250px auto 0;

            width: clamp(325px, 75vw, 800px);
        }

    }
}

@media only screen and (max-width: 650px) {
    .hero {
        .text-block {
            //margin-top: 0px;
        }
    }
}
</style>