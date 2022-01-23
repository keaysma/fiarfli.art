<template lang="">
    <div class="page">
        <div class="content">
            <h1>About Me</h1>
            <p>
                Lungo to go spoon trifecta robusta beans cappuccino. Eu cultivar, doppio arabica, foam, to go brewed foam con panna galão. Crema coffee caramelization coffee mocha breve redeye coffee. Cortado id carajillo blue mountain sit and ristretto grounds skinny.
            </p>
            <br/><br/>
            <p>
                Single shot, bar  sweet body macchiato, steamed barista espresso black sugar. Medium cinnamon, galão caramelization, variety bar  americano doppio cinnamon coffee. Chicory filter id, single shot breve siphon, body as rich acerbic instant. Extra  con panna at, milk chicory french press id iced.
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
    min-height: 300vh;

    margin: 0;


    .content {
        margin: 200px 225px;
        position: sticky;
        top: 200px;

        //color: dimgrey;
        text-shadow: 1px 1px 3px #0004;
    }
}

@media only screen and (max-width: 650px) {
    .page {
        width: 100%;
        min-height: 300vh;

        margin: 0;

        .content {
            margin: 50px 10vw;
            position: sticky;
            top: 100px;

            //color: dimgrey;
            text-shadow: 1px 1px 3px #0004;
        }
    }
}
</style>