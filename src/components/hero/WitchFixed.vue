<template lang="">
    <div id="!" class="hero">
        <div class="image-guard" />
        <img 
            class="hero-image"
            src="/witch_girl_jump_thumbnail.webp"
        />

        <div class="content">
            <img
                class="signature"
                src="/Raquel-signature.svg"
            />

            <div class="hero-nav">
                <div class="nav-links text-block">
                    <!-- <a class="nav-link" href="#!">Home</a> -->
                    <a class="nav-link" href="#about">About</a>
                    <a class="nav-link" href="#art">Art</a>
                    <a class="nav-link" href="#commissions">Commissions</a>
                    <a class="nav-link" href="#contact-me">Contact Me</a>
                </div>
            </div>
        </div>
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

        background: linear-gradient(#0005 80%, #0009);
    }

    .content {
        z-index: 10;
    }

    .text-block {
        position: fixed;
        display: flex;
        flex-direction: row;
        justify-content: center;

        width: 100%;
        //margin-top: -150px;

        bottom: 15%;

        text-align: center;
        font-size: 1.25rem;

        color: white;

        .nav-link {
            margin: 0 10px;
        }

    }

    .signature {
        position: fixed;

        z-index: 15px;

        bottom: 20%;
        left: calc(50% - 140px);

        width: 250px;
        height: 75px;
    }

    .hero-nav {
        .nav-link {
            color: white;
            text-decoration: none;
        }
    }
}

@media only screen and (max-width: 768px) {
    .hero {
        .content {
            display: none;
        }
    }
}
</style>