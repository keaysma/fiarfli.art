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
.page {
    display: flex;
    flex-direction: column;

    width: 100%;
    min-height: 100vh;

    margin: 0;

    //background: white;

    .text-content {
        margin: 200px 200px;
        //position: sticky;
        top: 200px;

        color: #534957;
        text-shadow: 1px 1px 3px #53495744;
    }
}

@media only screen and (max-width: 650px) {
    .page {
        width: 100%;
        min-height: 100vh;

        margin: 0;

        .text-content {
            margin: 100px 10vw;
            //position: sticky;
            //top: 100px;

            //color: dimgrey;
            text-shadow: 1px 1px 3px #0004;
        }
    }
}
</style>