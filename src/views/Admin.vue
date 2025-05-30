<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

// Components
import View from '/src/components/admin/View.vue';
import Panel from '/src/components/admin/Panel.vue';

// Types
import type { AdminPage, Block, LocalDataShape, SiteContent } from '/src/types';
import { LOCAL_STORAGE_BLOCK_KEY, LOCAL_STORAGE_CONTENT_KEY } from '/src/consts';

// In this context, 'authenticated' means the user has entered a token, but the token has not been verified
const authenticated = ref<boolean>(false);
const loading = ref<boolean>(false);
const token = ref<string>(null);

const currentPage = ref<AdminPage>('gallery');
const contentState = ref<SiteContent | null>(null);
const blockState = ref<Block[] | null>(null);
const currentCommitHash = ref<string>(null);
const latestCommitHash = ref<string>(null);

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

const submitted = () => {
    deleteLocalData();
    refresh();
}

const deleteLocalData = () => {
    console.log("deleted local storage")
    localStorage.removeItem(LOCAL_STORAGE_CONTENT_KEY);
    localStorage.removeItem(LOCAL_STORAGE_BLOCK_KEY);
}

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
        const gridData: {
            content: SiteContent,
            index: {
                $schema: any
                blocks: Block[]
            },
            head: string
        } = await gridResponse.json()

        const { content, index, head } = gridData;

        currentCommitHash.value = head;

        let doReload: boolean | undefined = undefined;

        const localContentStateSerialized = localStorage.getItem(LOCAL_STORAGE_CONTENT_KEY);
        if (localContentStateSerialized !== null) {
            const localContentState: LocalDataShape<SiteContent> = JSON.parse(localContentStateSerialized);
            if (localContentState.hash === currentCommitHash.value) {
                doReload = confirm("continue where you left off?")
                if (doReload === true) {
                    contentState.value = {
                        ...localContentState.data,
                    }
                }
            }
        }

        if (contentState.value === null) {
            contentState.value = {
                ...content,
            };
        }

        const localBlockStateSerialized = localStorage.getItem(LOCAL_STORAGE_BLOCK_KEY);
        if (localBlockStateSerialized !== null) {
            const localBlockState: LocalDataShape<Block[]> = JSON.parse(localBlockStateSerialized);
            if (localBlockState.hash === currentCommitHash.value) {
                if (doReload === undefined) {
                    doReload = confirm("continue where you left off??????")
                }
                if (doReload === true) {
                    blockState.value = localBlockState.data
                }
            }
        }

        if (blockState.value === null) {
            blockState.value = index.blocks;
        }

        await getLatestCommitHash();
    } catch (error) {
        console.error(`Admin::setup::refresh`, error);
        return;
    }
};

const login = async () => {
    loading.value = true;
    try {
        if (!currentCommitHash.value) {
            console.log(`Admin::setup::login::refresh`);
            await refresh();
        } else {
            await getLatestCommitHash();
        }
        authenticated.value = true;
    } catch (error) {
        console.error(`Admin::setup::login`, error);
        return;
    } finally {
        loading.value = false;
    }
};

const logout = () => {
    authenticated.value = false;
    token.value = null;
    currentCommitHash.value = null;
    latestCommitHash.value = null;
};

onMounted(() => {
    const interval = setInterval(() => {
        if (!authenticated.value) return;
        getLatestCommitHash();
    }, 1000 * 60 * 10);

    const focusListener = () => {
        if (!authenticated.value) return;
        getLatestCommitHash();
    }
    window.addEventListener('focus', focusListener)

    return () => {
        clearInterval(interval);
        window.removeEventListener('focus', focusListener);
    }
});

const deep = true
watch(
    contentState,
    () => {
        localStorage.setItem(
            LOCAL_STORAGE_CONTENT_KEY,
            JSON.stringify(
                {
                    hash: currentCommitHash.value,
                    data: contentState.value
                } satisfies LocalDataShape<SiteContent>
            )
        )
    },
    { deep }
)

watch(
    blockState,
    () => {
        localStorage.setItem(
            LOCAL_STORAGE_BLOCK_KEY,
            JSON.stringify(
                {
                    hash: currentCommitHash.value,
                    data: blockState.value
                } satisfies LocalDataShape<Block[]>
            )
        )
    },
    { deep }
)
</script>

<template>
    <div id="admin-view-login" :class="{ authenticated }">
        <p>Bootleg password</p>
        <input type="password" v-model="token" />
        <button @click="login">{{ loading ? "Hold on..." : "Submit" }}</button>
    </div>
    <template v-if="authenticated">
        <template v-if="blockState && contentState">
            <Panel v-model:currentPage="currentPage" :blocks="blockState" :content="contentState"
                :currentHash="currentCommitHash" :latestHash="latestCommitHash" :token="token"
                @logout="authenticated = false" @clear-localstorage="deleteLocalData" @submitted="submitted" />
            <View v-model:currentPage="currentPage" :blocks="blockState" :content="contentState" />
        </template>
        <div v-else id="admin-view-login">
            <p>Something broke I think?</p>
            <button @click="logout">Refresh</button>
        </div>
    </template>
</template>

<style lang="scss">
#admin-view-login {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    z-index: 100;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    line-height: 1.25em;

    background: linear-gradient(pink, skyblue);

    transition: opacity 0.5s ease;

    >button {
        margin-top: 1rem;
    }

    &.authenticated {
        opacity: 0;
        pointer-events: none;
    }
}
</style>
