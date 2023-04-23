<template>
    <div id="admin-view">
        <About v-if="state.adminCurrentPage === 'about'" />
        <Art v-if="state.adminCurrentPage === 'gallery'" />
        <Commissions v-if="state.adminCurrentPage === 'commissions'" />
        <Contact v-if="state.adminCurrentPage === 'contactme'" />
    </div>
</template>

<script setup lang="ts">
import state from '../state'

import About from '../about/BasicAlt.vue'
import Art from '../art/FlexGallery.vue'
import Commissions from '../commissions/Basic.vue'
import Contact from '../contact-me/Basic.vue'
</script>

<style>
#admin-view {
    width: 60%;
    height: 100vh;

    overflow: scroll;
}
</style>