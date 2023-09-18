<template>
    <div id="about" class="page">
        <div class="text-content">
            <h1>About Me</h1>
            <p>{{ about }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    about: string;
}>();
</script>

<style lang="scss">
#about.page {
    display: flex;
    flex-direction: column;

    width: 100%;

    margin: 0;

    //background: white;

    .text-content {
        margin: 225px 125px 225px;
        //position: sticky;
        top: 200px;

        color: #534957;
        text-shadow: 1px 1px 3px #53495744;

        p {
            white-space: break-spaces;
        }
    }
}

@media only screen and (max-width: 768px) {
    #about.page {
        width: 100%;
        //height: 100vh;

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