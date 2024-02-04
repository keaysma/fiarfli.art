<template>
    <Panel v-model:currentPage="currentPage" :blocks="blockState" :content="contentState" :currentHash="currentCommitHash"
        :latestHash="latestCommitHash" v-model:token="token" @submitted="refresh" />
    <View v-model:currentPage="currentPage" :blocks="blockState" :content="contentState" />
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

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
const currentCommitHash = ref<string>(null);
const latestCommitHash = ref<string>(null);
const token = ref<string>(null);

const getLatestCommitHash = async () => {
    try {
        console.log(new Date(), `Admin::setup::getLatestCommitHash`);
        const response = await fetch(`${import.meta.env.PUBLIC_BACKEND}/api/grid/head`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Git-Token': token.value
            },
        });
        const data = await response.json();
        latestCommitHash.value = data.head;
    } catch (error) {
        console.error(`Admin::setup::getLatestCommitHash`, error);
        return;
    }
};

const refresh = async () => {
    currentCommitHash.value = null;

    try {
        const gridResponse = await fetch(`${import.meta.env.PUBLIC_BACKEND}/api/grid`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Git-Token': token.value
            },
        })
        const gridData = await gridResponse.json()

        const { content, index, head } = gridData;

        contentState.value = {
            ...content,
        };
        blockState.value = index.blocks;
        currentCommitHash.value = head;
    } catch (error) {
        console.error(`Admin::setup::refresh`, error);
        return;
    }
};

refresh();
getLatestCommitHash();

watch(() => token.value, () => {
    if (currentCommitHash.value === null)
        refresh();
    getLatestCommitHash();
});

onMounted(() => {
    const interval = setInterval(() => {
        getLatestCommitHash();
    }, 1000 * 60 * 10);

    const focusListener = () => {
        getLatestCommitHash();
    }
    window.addEventListener('focus', focusListener)

    return () => {
        clearInterval(interval);
        window.removeEventListener('focus', focusListener);
    }
});
</script>
