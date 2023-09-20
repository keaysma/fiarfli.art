<template>
    <div id="admin-view">
        <About v-if="currentPage === 'about'" :about="content.about" />
        <Art v-if="currentPage === 'gallery'" :blocks="blocks" />
        <Commissions v-if="currentPage === 'commissions'" :commissions="content.commissions" />
        <Contact v-if="currentPage === 'contactme'" :contact="content.contact"
            :contactFormEnabled="content.contactFormEnabled" />
    </div>
</template>

<script setup lang="ts">
import About from '../about/BasicAlt.vue'
import Art from '../art/BlockGrid.vue'
import Commissions from '../commissions/Basic.vue'
import Contact from '../contact-me/Basic.vue'
import { AdminPage, Block } from '/src/types';

defineProps<{
    currentPage: AdminPage;
    blocks: Block[];
    content: {
        about: string;
        commissions: string;
        contact: string;
        contactFormEnabled: boolean;
    };
}>();
</script>

<style>
#admin-view {
    width: 60%;
    height: 100vh;

    overflow: scroll;
}
</style>