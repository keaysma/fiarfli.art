<template lang="">
    <div id="commissions" class="page">
        <div class="text-content">
            <h1>Commissions</h1>
            <p>{{ commissions }}</p>
        </div>
    </div>
</template>

<script>
import state from '../state'

import { commissions } from '../content.json'

export default {
    setup () {
        if(!state.commissions)
            state.commissions = commissions
    },
    computed: {
        commissions () { return state?.commissions }
    }
}
</script>

<style lang="scss">
#commissions.page {
    display: flex;
    flex-direction: column;

    width: 100%;
    min-height: 100vh;

    margin: 0;

    //background: white;

    .text-content {
        margin: 20px 200px 20px 200px;
        //position: sticky;
        top: 200px;

        color: #534957;
        text-shadow: 1px 1px 1px #d389a7f4;

        p {
            white-space: break-spaces;
        }
    }
}

@media only screen and (max-width: 768px) {
    #commissions.page {
        width: 100%;
        min-height: 100vh;

        margin: 0;

        .text-content {
            font-size: 1rem;
            margin: 50px 35px;
            //position: sticky;
            //top: 100px;

            //color: dimgrey;
            text-shadow: 1px 1px 3px #0004;
        }
    }
}
</style>