<template lang="">
    <div id="about" class="page">
        <div class="text-content">
            <h1>About Me</h1>
            <!-- <p>
                I am a Latina multimedia illustrator, animator, and comic artist, and I often utilizing both digital and traditional materials. My traditional work is mixed media on paper, utilizing colored pencils, markers, or watercolor, while my digital art employs programs such as Clip Studio Paint and Blender. No matter what medium, my art often features ethereal characters and lush natural landscapes. 
            </p>
            <br/>
            <p>
                I have drawn all my life and have come to see color relationships as a way to aid narrative storytelling and strengthen the mood of a work. I draw because the process and the end result of colorful visuals and a cute dreamy aesthetic is rewarding to me, but also because I think art can transform the world around us. I’ve felt how rewarding more representation in media of characters who look or talk like me or occupy the spaces between different cultures like I do; my goal is to create works that allow others to experience that euphoria of their presence in the world being seen, heard, and celebrated.
            </p>
            <br/> -->
            <p>{{ about }}</p>
        </div>
    </div>
</template>

<script>
import state from '../state'

import { about } from '../content.json'
export default {
    setup () {
        if(!state.about)
            state.about = about
    },
    computed: {
        about () { return state?.about }
    }
}
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