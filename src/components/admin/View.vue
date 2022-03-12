<template>
  <div id="admin-view">
        <About v-if="currentPage === 'about'"/>
        <Art v-if="currentPage === 'gallery'"/>
        <Commissions v-if="currentPage === 'commissions'"/>
        <Contact v-if="currentPage === 'contactme'"/>
    </div>
</template>

<script>
import state from '../state'

import About from '../about/BasicAlt.vue'
import Art from '../art/FlexGallery.vue'
import Commissions from '../commissions/Basic.vue'
import Contact from '../contact-me/Basic.vue'

export default {
    computed: {
        currentPage : () => state?.adminCurrentPage
    },

    components: {
        About, Art, Commissions, Contact
    }
}
</script>

<style>
#admin-view {
    width: 60%; 
    height: 100vh; 
    
    overflow: scroll;
}
</style>