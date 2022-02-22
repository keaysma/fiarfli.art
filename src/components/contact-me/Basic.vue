<template lang="">
    <div id="contact-me" class="page">
        <div class="text-content">
            <h1>Contact Me</h1>
            <p>
                Lungo to go spoon trifecta robusta beans cappuccino. Eu cultivar, doppio arabica, foam, to go brewed foam con panna galão. Crema coffee caramelization coffee mocha breve redeye coffee. Cortado id carajillo blue mountain sit and ristretto grounds skinny.
            </p>
        </div>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss">
#contact-me.page {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 95vh;

    justify-content: center;

    .text-content {
        margin: -50px 250px 0;
        color: #534957;
        text-shadow: 1px 1px 3px #53495744;
    }
}

@media only screen and (max-width: 768px) {
    #contact-me.page {
        width: 100%;
        height: 95vh;

        margin: 0;

        .text-content {
            margin: 100px 35px;
            //position: sticky;
            //top: 100px;

            //color: dimgrey;
            text-shadow: 1px 1px 3px #0004;
        }
    }
}
</style>