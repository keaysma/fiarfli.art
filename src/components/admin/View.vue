<script setup lang="ts">
import About from '/src/components/about/BasicAlt.vue'
import Art from '/src/views/BlockGrid.vue'
import Commissions from '/src/views/Commissions.vue'
import Contact from '/src/views/ContactMe.vue'
import type { AdminPage, Block, SiteContent } from '/src/types';

defineProps<{
    currentPage: AdminPage;
    blocks: Block[];
    content: SiteContent;
}>();
</script>

<template>
    <div id="admin-view">
        <About v-if="currentPage === 'about'" :about="content.about" />
        <Art v-if="currentPage === 'gallery'" :blocks="blocks" />
        <Commissions v-if="currentPage === 'commissions'" :commissions="content.commissions"
            :commissionsEnabled="content.contactFormEnabled" />
        <Contact v-if="currentPage === 'contactme'" :contact="content.contact"
            :contactFormEnabled="content.contactFormEnabled" />
    </div>
</template>

<style>
#admin-view {
    width: 60%;
    height: calc(100vh - 2em);

    padding: 2em 2em 0;

    overflow: scroll;

    background: ivory
}
</style>