<template>
    <div id="admin" class="page">
        <div class="content">
            <h2>Admin panel</h2>
            <textarea v-if="currentPage === 'about'" class="feature-text" v-model="content.about" />

            <div v-if="currentPage === 'commissions'">
                <textarea v-if="content.commissions.enabled" class="feature-text"
                    v-model="content.commissions.enabledMessage" />
                <textarea v-else class="feature-text"
                    v-model="content.commissions.disabledMessage" />
                <input type="checkbox" id="commissions-enabled" class="check" name="commissions-enabled"
                    v-model="content.commissions.enabled" />
                <label for="commissions-enabled" class="check-label">Enable</label><br>
            </div>

            <div v-if="currentPage === 'contactme'">
                <textarea class="feature-text" v-model="content.contact" />
                <input type="checkbox" id="contact-form-enabled" class="check" name="contact-form-enabled"
                    v-model="content.contactFormEnabled" />
                <label for="contact-form-enabled" class="check-label">Enable Form</label><br>
            </div>

            <div v-if="currentPage === 'gallery'">
                <div v-for="(block, blockIndex) in blocks" class="art-section" :id="`art-${block.name}`">
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
                                <label for="hidden">Hidden</label>
                                <input type="checkbox" name="hidden" class="check" v-model="content.hidden" />

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

                                <label for="tags">Tags</label>
                                <div class="tag-list">
                                    <button v-if="content.tags.length" v-for="tag in content.tags"
                                        @click="content.tags.splice(content.tags.indexOf(tag), 1)">
                                        {{ tag }}
                                    </button>
                                    <span v-else>No tags</span>
                                </div>
                                <fieldset class="tags">
                                    <input name="tags" />
                                    <button @click="$event => {
                                        const inputElement = (($event.target as HTMLButtonElement).previousElementSibling as HTMLInputElement)
                                        content.tags.push(inputElement.value);
                                        inputElement.value = '';
                                    }">
                                        Add
                                    </button>
                                </fieldset>

                                <br />
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
                                    <input name="bg-color" type="color" :model-value="content.color ?? '#0000'"
                                        @update:model-value="content.color = $event.target.value" />
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
            <p class="commit-hash" :class="{ warning: currentHash !== latestHash }">version: {{ currentHash ?? 'UNKNOWN' }}
            </p>
            <div class="control-nav">
                <button @click="emit('update:currentPage', 'about')">about</button>
                <button @click="emit('update:currentPage', 'gallery')">art</button>
                <button @click="emit('update:currentPage', 'commissions')">commissions</button>
                <button @click="emit('update:currentPage', 'contactme')">contact me</button>
                <div class="button-bar">
                    <button @click="emit('logout')">
                        Change token
                        <FontAwesomeIcon :icon="faLock" />
                    </button>
                    <button v-if="uploadState == 'unsubmitted'" class="submit" @click="submitChanges()">
                        {{ currentHash === null ? "loading..." : currentHash !== latestHash ? "CAREFUL!" : "Submit" }}
                        <FontAwesomeIcon :icon="faArrowRight" />
                    </button>
                    <button v-else-if="uploadState == 'submitted'" class="submit">
                        uploading
                        <FontAwesomeIcon :icon="faSpinner" />
                    </button>
                    <button v-else-if="uploadState == 'success'" class="submit">
                        done
                        <FontAwesomeIcon :icon="faCheck" />
                    </button>
                    <button v-else-if="uploadState == 'error'" class="submit">
                        error
                        <FontAwesomeIcon :icon="faTimes" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, ref, watch } from 'vue';

import Content from '../art/Content.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowUp, faArrowDown, faArrowRight, faTrash, faSpinner, faCheck, faTimes, faPlus, faUpload, faLock } from '@fortawesome/free-solid-svg-icons';
import { AdminPage, Block, SiteContent } from '/src/types';
import MarkdownIt from 'markdown-it';
import { markdownCardPlugin } from '/src/markdown-card';

const instance = getCurrentInstance();

const emit = defineEmits<{
    (e: 'update:currentPage', value: AdminPage);
    (e: 'logout');
    (e: 'submitted');
}>();

const props = defineProps<{
    token: string;
    currentPage: AdminPage;
    currentHash: string | null;
    latestHash: string | null;
    blocks: Block[];
    content: SiteContent;
}>();

const md = new MarkdownIt({ html: true })

// onRenderComplete is kind of a hack to get the rendered content from the markdown card
// to save it to the content object
md.use(markdownCardPlugin(props.token, () => {
    const renderedContent = document.querySelector('#commissions .content')

    if (renderedContent) {
        props.content.commissions.__html = renderedContent.innerHTML
    }
}))
watch(
    () => [
        props.content.commissions.enabled,
        props.content.commissions.enabledMessage,
        props.content.commissions.disabledMessage,
    ], () => {
        props.content.commissions.__html = md.render(
            props.content.commissions.enabled
                ? props.content.commissions.enabledMessage
                : props.content.commissions.disabledMessage
        )
    }
)

const mediaContent = ref<Partial<Record<string, {
    utf8: string,
    base64: string
}>>>({});

const uploadState = ref<'unsubmitted' | 'submitted' | 'success' | 'error'>('unsubmitted');

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
        title: "",
        desc: "",
        tags: [],
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

                if (fileContents.length > (10 * 1048576 /* MiB */)) {
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
            })
    }

    _tempFileInput.click()
}

const submitChanges = () => {
    if (props.currentHash !== props.latestHash) {
        const result = confirm("You are about to overwrite the latest version with the changes you made here. Are you sure?");
        if (!result) return;
    }

    // Gather in-use content from blocks
    const usedContent = props.blocks.map(
        ({ content }) => content.map(
            ({ path }) => path
        )
    ).flat()

    const payload = {
        content: props.content,
        blocks: props.blocks,
        media: Object.entries(mediaContent.value)
            .filter(([name]) => usedContent.includes(name)) // filter out content that is not used - this is not working
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
                'X-Git-Token': props.token,
            },
            body: JSON.stringify(payload)
        }
    )
        .then(({ ok }) => {
            uploadState.value = ok ? "success" : "error"
            if (ok) {
                emit('submitted')
            }
        })
        .catch(err => {
            uploadState.value = "error"
            alert(`Error, show Michael: ${err}`)
        })
        .finally(() => setTimeout(() => uploadState.value = "unsubmitted", 3000))
    uploadState.value = "submitted"
}
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

    @media (min-width: 768px) {
        max-width: 50vw;
    }

    fieldset {
        border: none;
    }

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

            .check {
                align-self: flex-start;
            }

            .tag-list {
                >span {
                    font-size: small;
                    line-height: 1.7em;
                }
            }

            .tags {
                display: flex;
                flex-direction: row;

                input {
                    flex: 1;
                }

                button {
                    margin: 0;
                }
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
        height: 65px;

        margin: 0;
        padding: 0;

        background: beige;
        border-top: 3px solid darkslateblue;

        .commit-hash {
            margin: 5px 10px;
            font-size: 0.75em;
            color: black;

            &.warning {
                color: red;
            }
        }

        .control-nav {
            display: flex;
            margin: 5px 5px 10px 5px;

            button {
                margin: 0 5px;
            }
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
                line-height: 1em;

                &:disabled {
                    background: gray;
                }
            }
        }
    }
}
</style>