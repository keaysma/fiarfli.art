<template lang="">
    <div class="hero">
        <img 
            class="hero-image"
            src="/froggo.png" />
        <div class="text-block">
            <div class="signature">
                <p>Raquel.</p>
            </div>
            <div class="summary">
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis consectetur dui. Integer luctus mattis consequat. Integer mattis ut odio quis ultricies. Vivamus eu libero in orci hendrerit vehicula vitae sed ligula. Ut imperdiet, dui vel luctus hendrerit, risus dolor viverra nunc, non sollicitudin libero urna consectetur eros. Nam ultricies porttitor nisl, a dapibus augue semper at.</p>
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
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;

    width: 100vw;
    height: 100vh;

    .hero-image {
        width: clamp(325px, 100vw, 800px);
        
        margin: 0 auto;
        margin-top: -100px;
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

        .signature {
            font-size: 1.5rem;
        }

        .summary {
            margin: -25px auto 0;

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