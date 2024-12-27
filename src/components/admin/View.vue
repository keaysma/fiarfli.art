<template>
    <div id="admin-view">
        <About v-if="currentPage === 'about'" :about="content.about" />
        <Art v-if="currentPage === 'gallery'" :blocks="blocks" />
        <Commissions v-if="currentPage === 'commissions'" :commissions="content.commissions" :commissionsEnabled="content.contactFormEnabled" />
        <Contact v-if="currentPage === 'contactme'" :contact="content.contact"
            :contactFormEnabled="content.contactFormEnabled" />
    </div>
</template>

<script setup lang="ts">
import About from '../about/BasicAlt.vue'
import Art from '../art/BlockGrid.vue'
import Commissions from '../commissions/Commissions.vue'
import Contact from '../../views/ContactMe.vue'
import { AdminPage, Block, SiteContent } from '/src/types';

defineProps<{
    currentPage: AdminPage;
    blocks: Block[];
    content: SiteContent;
}>();
</script>

<style>
#admin-view {
    width: 60%;
    height: 100vh;

    overflow: scroll;
}
</style>