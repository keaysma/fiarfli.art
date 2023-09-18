<template>
    <Panel v-model:currentPage="currentPage" :blocks="blockState" :content="contentState" />
    <View v-model:currentPage="currentPage" :blocks="blockState" :content="contentState" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Components
import View from './View.vue';
import Panel from './Panel.vue';

// Data
import content from '../content.json'
import {
    blocks
} from "../index.json"

// Types
import { AdminPage, Block } from '/src/types';

const currentPage = ref<AdminPage>('gallery');
const contentState = ref({
    ...content,
});
const blockState = ref<Block[]>(blocks);
const mediaContent = ref<Partial<Record<string, {
    utf8: string,
    base64: string
}>>>({});
</script>
