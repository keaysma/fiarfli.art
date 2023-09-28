<template>
    <div id="admin" class="page">
        <div class="content">
            <h2>Admin panel</h2>
            <textarea v-if="currentPage === 'about'" class="feature-text" v-model="content.about" />
            <textarea v-if="currentPage === 'commissions'" class="feature-text" v-model="content.commissions" />

            <div v-if="currentPage === 'contactme'">
                <textarea class="feature-text" v-model="content.contact" />
                <input type="checkbox" id="contact-form-enabled" class="check" name="contact-form-enabled"
                    v-model="content.contactFormEnabled" />
                <label for="contact-form-enabled" class="check-label">Enable Form</label><br>
            </div>

            <div v-if="currentPage === 'gallery'">
                <div v-for="(block, blockIndex) in blocks" class="art-section"
                    :id="`art-${block.name}`">
                    <div class="section-name">
                        <input v-model="block.name" />
                        <div class="arrows">
                            <div @click="moveSectionUp(blockIndex)">
                                <FontAwesomeIcon :icon="faArrowUp" />
                            </div>
                            <div @click="moveSectionDown(blockIndex)">
                                <FontAwesomeIcon :icon="faArrowDown" />
                            </div>
                            <div @click="deleteSection(blockIndex)">
                                <FontAwesomeIcon :icon="faTrash" style="color: red;" />
                            </div>
                        </div>
                    </div>
                    <div class="art-container">
                        <div v-for="(content, contentIndex) in block.content" class="art-piece">
                            <Content v-if="(content.type || 'link') === 'link'" v-bind:content="content" />
                            <div class="text-content">
                                <label for="type">Type</label>
                                <select name="type" v-model="content.type">
                                    <option value="link">link</option>
                                    <option value="iframe">iframe</option>
                                    <option value="contained">Tumblr's bullshit</option>
                                </select>

                                <div v-if="(content.type || 'link') === 'link'">
                                    <label for="url">URL</label>
                                    <div class="url-input">
                                        <input name="url" v-model="content.path" />
                                        <button @click="uploadContent(blockIndex, contentIndex)">
                                            <FontAwesomeIcon :icon="faUpload" />
                                        </button>
                                    </div>
                                </div>
                                <div v-else class="html-input">
                                    <label for="html">HTML</label>
                                    <textarea name="html" v-model="content.html" />
                                </div>

                                <label for="name">Name</label>
                                <input name="name" v-model="content.title" />

                                <label for="date">Date</label>
                                <input name="date" v-model="content.date" />

                                <label for="desc">Description</label>
                                <textarea name="desc" v-model="content.desc" />

                                <br />

                                <label for="width">Width</label>
                                <select name="width" v-model="content.width">
                                    <option value="1">1/6</option>
                                    <option value="2">2/6</option>
                                    <option value="3">3/6</option>
                                    <option value="4">4/6</option>
                                    <option value="5">5/6</option>
                                    <option value="6">full</option>
                                </select>

                                <label for="height">Height</label>
                                <select name="height" v-model="content.height">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>

                                <label for="fit">Image Fit</label>
                                <select name="fit" v-model="content.fit">
                                    <option value="contain">Contain</option>
                                    <option value="cover">Cover</option>
                                </select>

                                <label for="bg-color">Background Color</label>
                                <div class="color-picker">
                                    <input name="bg-color" type="color" v-model="content.color" />
                                    <button @click="content.color = undefined">x</button>
                                </div>
                            </div>
                            <div class="arrows">
                                <div @click="moveContentUp(blockIndex, contentIndex)">
                                    <FontAwesomeIcon :icon="faArrowUp" />
                                </div>
                                <div @click="moveContentDown(blockIndex, contentIndex)">
                                    <FontAwesomeIcon :icon="faArrowDown" />
                                </div>
                                <div @click="deleteContent(blockIndex, contentIndex)">
                                    <FontAwesomeIcon :icon="faTrash" style="color: red;" />
                                </div>
                            </div>
                        </div>
                        <button class="new" @click="addContent(blockIndex)">NEW ART
                            <FontAwesomeIcon :icon="faPlus" />
                        </button>
                    </div>
                </div>
                <button class="new" @click="addSection()">NEW SECTION
                    <FontAwesomeIcon :icon="faPlus" />
                </button>
            </div>
        </div>

        <div class="page-nav">
            <div class="control-nav">
                <button @click="emit('update:currentPage', 'about')">about</button>
                <button @click="emit('update:currentPage', 'gallery')">art</button>
                <button @click="emit('update:currentPage', 'commissions')">commissions</button>
                <button @click="emit('update:currentPage', 'contactme')">contact me</button>
            </div>
            <div class="control-content">
                <input type="password" placeholder="github token" v-model="token" />
                <div class="button-bar">
                    <div v-if="uploadState == 'unsubmitted'">
                        <button class="submit" @click="submitChanges()">
                            Submit <div>
                                <FontAwesomeIcon :icon="faArrowRight" />
                            </div>
                        </button>
                    </div>
                    <div v-if="uploadState == 'submitted'">
                        <button class="submit">
                            uploading
                            <div>
                                <FontAwesomeIcon :icon="faSpinner" />
                            </div>
                        </button>
                    </div>
                    <div v-if="uploadState == 'success'">
                        <button class="submit">
                            done
                            <div>
                                <FontAwesomeIcon :icon="faCheck" />
                            </div>
                        </button>
                    </div>
                    <div v-if="uploadState == 'error'">
                        <button class="submit">
                            error
                            <div>
                                <FontAwesomeIcon :icon="faTimes" />
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue';

import Content from '../art/Content.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowUp, faArrowDown, faArrowRight, faTrash, faSpinner, faCheck, faTimes, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';
import { AdminPage, Block } from '/src/types';

const instance = getCurrentInstance();

const emit = defineEmits<{
    (e: 'update:currentPage', value: AdminPage);
}>();

const props = defineProps<{
    currentPage: AdminPage;
    blocks: Block[];
    content: {
        about: string;
        commissions: string;
        contact: string;
        contactFormEnabled: boolean;
    };
}>();

const mediaContent = ref<Partial<Record<string, {
    utf8: string,
    base64: string
}>>>({});
const mediaContentNames = computed(() => Object.keys(mediaContent.value));

const uploadState = ref<'unsubmitted' | 'submitted' | 'success' | 'error'>('unsubmitted');
const token = ref('');

const moveSectionUp = (id: number) => {
    //console.log(`move ${id} up`)

    if (id < 1)
        return

    const element = props.blocks.splice(id, 1)
    props.blocks.splice(id - 1, 0, ...element)

    // force update
    instance.proxy.$forceUpdate();
}

const moveSectionDown = (id: number) => {
    //console.log(`move ${id} down`)

    if (id >= props.blocks.length - 1)
        return

    const element = props.blocks.splice(id, 1)
    props.blocks.splice(id + 1, 0, ...element)

    // force update
    instance.proxy.$forceUpdate();
}

const addSection = () => {
    props.blocks.push({
        name: "New Section",
        content: []
    })
}

const deleteSection = (id: number) => {
    props.blocks.splice(id, 1)
}

const moveContentUp = (blockId: number, contentId: number) => {
    //console.log(`move ${blockId} ${contentId} up`)

    if (blockId === 0 && contentId === 0)
        return

    if (contentId === 0) {
        const element = props.blocks[blockId].content.splice(contentId, 1)[0]
        props.blocks[blockId - 1].content.push(element)
    } else {
        const element = props.blocks[blockId].content.splice(contentId, 1)
        props.blocks[blockId].content.splice(contentId - 1, 0, ...element)
    }

    // force update
    instance.proxy.$forceUpdate();
}

const moveContentDown = (blockId: number, contentId: number) => {
    //console.log(`move ${blockId} ${contentId} down`)

    if (blockId === props.blocks.length - 1 && contentId === props.blocks[props.blocks.length - 1].content.length - 1)
        return

    if (contentId === props.blocks[blockId].content.length - 1) {
        const element = props.blocks[blockId].content.splice(contentId, 1)[0]
        props.blocks[blockId + 1].content.unshift(element)
    } else {
        const element = props.blocks[blockId].content.splice(contentId, 1)
        props.blocks[blockId].content.splice(contentId + 1, 0, ...element)
    }

    // force update
    instance.proxy.$forceUpdate();
}

const addContent = (blockId: number) => {
    const now = new Date()
    const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`

    props.blocks[blockId].content.push({
        date,
        path: "",
        width: "6",
        height: "1",
        fit: "cover",
        title: "New Masterpiece",
        desc: "This is some new art by Raquel",
    })
};

const deleteContent = (blockId: number, contentId: number) => {
    props.blocks[blockId].content.splice(contentId, 1)
}

const readFileBytes = async (file: File) => new Promise<string | ArrayBuffer>((res, rej) => {
    const reader = new FileReader()
    reader.readAsText(file, 'UTF-8')
    reader.onload = () => res(reader.result)
    reader.onerror = error => rej(error)
});
const readFileBase64 = async (file: File) => new Promise<string | ArrayBuffer>((res, rej) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => res(reader.result)
    reader.onerror = error => rej(error)
});
const decodeArrayBuffer = (maybeArrayBuffer: string | ArrayBuffer): string => {
    if (typeof maybeArrayBuffer === 'string') return maybeArrayBuffer;
    const decoder = new TextDecoder("utf-8");
    return decoder.decode(maybeArrayBuffer);
}

// the chungus
const uploadContent = (blockId: number, contentId: number) => {
    const _tempFileInput = document.createElement('input')
    _tempFileInput.type = 'file'

    _tempFileInput.onchange = (event: Event) => {
        const target = event.target as HTMLInputElement | undefined
        if (!target) return;

        const file: File | undefined = target.files?.[0]
        if (!file) return;

        const filename = file.name
        const path = `/art/${filename}`

        Promise.all([readFileBytes(file), readFileBase64(file)])
            .then(([fileContentsRaw, base64FileContentsRaw]) => {
                const fileContents = decodeArrayBuffer(fileContentsRaw);
                const base64FileContents = decodeArrayBuffer(base64FileContentsRaw);

                //console.log({ filename, path, fileContents, base64FileContents })
                console.debug(`fileContents`, fileContents.length)

                if (fileContents.length > (2 * 1048576 /* MiB */)) {
                    console.error("TOO BIG OF A FILE")
                    props.blocks[blockId].content[contentId].path = "ERROR TOO BIG, talk to Michael for upload"
                    return
                }

                mediaContent.value[path] = {
                    utf8: fileContents,
                    base64: base64FileContents
                }

                //TODO bind to content
                props.blocks[blockId].content[contentId].path = path

                //console.log({ test: state.mediaContent?.[state.blocks[blockId].content[contentId].path]?.base64 })
            })
    }

    _tempFileInput.click()
}

const submitChanges = () => {
    // Gather in-use content from blocks
    const usedContent = props.blocks.map(
        ({ content }) => content.map(
            ({ path }) => path
        )
    ).flat()

    console.log({ usedContent })

    const payload = {
        token: token.value,

        content: props.content,
        blocks: props.blocks,
        media: Object.entries(mediaContent.value)
            .filter(([name]) => true) // filter out content that is not used
            //.filter(([ name ]) => usedContent.includes(name)) // filter out content that is not used - this is not working
            .map(([name, values]) => ({ name, content: values.base64.split(',')[1] }))
    }

    console.log(`${import.meta.env.PUBLIC_BACKEND}/api/grid`)
    console.log({ payload })

    fetch(
        `${import.meta.env.PUBLIC_BACKEND}/api/grid`,
        {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }
    )
        .then(res => uploadState.value = res.ok ? "success" : "error")
        .catch(err => uploadState.value = "error")
        .finally(() => setTimeout(() => uploadState.value = "unsubmitted", 3000))
    uploadState.value = "submitted"
}

/*
export default {
    methods: {
        updateSectionName(event, index) {
            //console.log('updateSectionName')
            //console.log({ index, event })
            //console.log(event.target.value)
            //console.log(state.blocks[index].name)

            state.blocks[index].name = event.target.value
        },

        handleContentPropertyUpdate(event, blockIndex, contentIndex, property) {
            //console.log({ event, blockIndex, contentIndex, property, value: event.target.value })

            state.blocks[blockIndex].content[contentIndex][property] = event.target.value
        },

        handleContentPropertyReset(blockIndex, contentIndex, property) {
            delete state.blocks[blockIndex].content[contentIndex][property]
        },

        

        readFileBytes: async (file) => new Promise((res, rej) => {
            const reader = new FileReader()
            reader.readAsText(file, 'UTF-8')
            reader.onload = () => res(reader.result)
            reader.onerror = error => rej(error)
        }),
        readFileBase64: async (file) => new Promise((res, rej) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => res(reader.result)
            reader.onerror = error => rej(error)
        }),

        setCurrentPage(page) {
            state.adminCurrentPage = page
        },

        setState(stateName, event) {
            //console.log({ event, content: event.target.value })
            state[stateName] = event.target.value
        },

        setStateCheckbox(stateName, event) {
            //console.log({ event, content: event.target.checked })
            state[stateName] = event.target.checked
        },
    },
}
*/
</script>

<style lang="scss">
#admin.page {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: scroll;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    margin: 0;
    padding: 0;

    color: floralwhite;
    background: linear-gradient(pink, skyblue);

    &>.content {
        margin-bottom: 25px;
        padding: 0 10px;

        .feature-text {
            width: 99%;
            height: 75vh;
        }

        .check,
        .check-label {
            color: black;
        }

        h2 {
            padding: 5px;

            background: gray;
            border-radius: 5px;
        }

        button.new {
            width: 100%;

            padding: 25px;

            color: white;
            background: green;

            box-shadow: none;
            border: none;
            border-radius: 5px;
        }
    }

    .section-name {
        display: flex;
        flex-direction: row;

        .arrows {
            display: flex;
            flex-direction: row;

            &>* {
                margin: 0 10px;
            }
        }
    }

    .art-section {
        padding: 15px;
        margin: 10px 0;

        background: #777;
        border: 1px dashed gray;
        border-radius: 5px;
    }

    .art-piece {
        display: flex;
        flex-direction: row;

        margin: 15px 0;

        border: 1px dotted #AAA;
        border-radius: 5px;


        .content {
            width: 20%;

            margin: auto 0;

            object-fit: contain;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }

        .text-content {
            display: flex;
            flex-direction: column;
            flex: 1;

            margin: 5px 20px 5px 5px;

            &>* {
                margin: 0;
                padding: 0;
            }

            .color-picker {
                display: flex;

                button {
                    border-radius: 5px;

                    color: white;
                    background: red;
                }
            }

            .url-input {
                display: flex;
                flex-direction: row;

                input {
                    flex: 1;
                }
            }

            .html-input {
                display: flex;
                flex-direction: column;

                textarea {
                    height: 200px;

                    resize: vertical;
                }
            }
        }

        .arrows {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            width: 10%;

            background: #3333;

            &>* {
                margin: 5px 0;
            }
        }
    }

    .page-nav {
        position: sticky;

        display: flex;
        flex-direction: column;

        flex: none;

        bottom: 0;
        left: 0;

        width: 100%;
        height: 75px;

        margin: 0;
        padding: 0;

        background: beige;

        .control-nav {
            margin: 5px 5px 10px 5px;

            button {
                margin: 0 5px;
            }
        }

        .control-content {
            display: flex;
            flex-direction: row;
        }

        input {
            height: 20px;
            width: 100%;
            max-width: 250px;

            margin: auto 10px;
            padding: 0 0 0 10px;
            border: 1px solid slategray;
            border-radius: 25px;
        }

        .button-bar {
            display: flex;
            flex-direction: row;
            justify-content: flex-end;
            align-items: center;

            height: 100%;

            margin-left: auto;


            button {
                display: flex;

                height: 25px;

                margin: 0 25px;
                padding: 5px 5px 20px 10px;

                box-shadow: 0px 0px 5px 1px darkgrey;
                border: none;
                border-radius: 25px;

                &>* {
                    padding: 0 5px;
                }

            }

            .submit {
                color: white;
                background: green;
            }
        }
    }
}
</style>