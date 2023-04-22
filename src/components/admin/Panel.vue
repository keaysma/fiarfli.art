<template>
    <div id="admin" class="page">
        <div class="content">
            <h2>Admin panel</h2>
            <div v-if="currentPage==='about'">
                <textarea 
                    class="feature-text"
                    v-model="about" 
                    @input="setState('about', $event)"
                />
            </div>

            <div v-if="currentPage==='commissions'">
                <textarea 
                    class="feature-text"
                    v-model="commissions" 
                    @input="setState('commissions', $event)"
                />
            </div>

            <div v-if="currentPage==='contactme'">
                <textarea 
                    class="feature-text"
                    v-model="contact" 
                    @input="setState('contact', $event)"
                />
                <input 
                    type="checkbox" 
                    id="contact-form-enabled" 
                    class="check" 
                    name="contact-form-enabled" 
                    v-model="contactFormEnabled" 
                    @input="setStateCheckbox('contactFormEnabled', $event)"
                />
                <label for="contact-form-enabled" class="check-label">Enable Form</label><br>
            </div>

            <div v-if="currentPage==='gallery'">
                <div v-for="(block, blockIndex) in blocks" :key="blockIndex" class="art-section" :id="`art-${block.name}`">
                    <div class="section-name">
                        <input :value="block.name" v-on:input="updateSectionName($event, blockIndex)" />
                        <div class="arrows">
                            <div @click="moveSectionUp(blockIndex)"><FontAwesomeIcon :icon="faArrowUp" /></div>
                            <div @click="moveSectionDown(blockIndex)"><FontAwesomeIcon :icon="faArrowDown" /></div>
                            <div @click="deleteSection(blockIndex)"><FontAwesomeIcon :icon="faTrash" style="color: red;" /></div>
                        </div>
                    </div>
                    <div class="art-container">
                        <div v-for="(content, contentIndex) in block.content" :key="contentIndex" class="art-piece">
                            <content v-if="(content.type || 'link') === 'link'" v-bind:content="content"/>
                            <div class="text-content">
                                <label for="type">Type</label>
                                <select name="type" :value="content.type || 'link'" v-on:input="handleContentPropertyUpdate($event, blockIndex, contentIndex, 'type')">
                                    <option value="link">link</option>
                                    <option value="iframe">iframe</option>
                                    <option value="contained">Tumblr's bullshit</option>
                                </select>

                                <div v-if="(content.type || 'link') === 'link'">
                                    <label for="url">URL</label>
                                    <div class="url-input">
                                        <input name="url" :value="content.path" v-on:input="handleContentPropertyUpdate($event, blockIndex, contentIndex, 'path')" />
                                        <button @click="uploadContent(blockIndex, contentIndex)"><FontAwesomeIcon :icon="faUpload"/></button>
                                    </div>
                                </div>
                                <div v-else class="html-input">
                                    <label for="html">HTML</label>
                                    <textarea name="html" :value="content.html" v-on:input="handleContentPropertyUpdate($event, blockIndex, contentIndex, 'html')" />
                                </div>

                                <label for="name">Name</label>
                                <input name="name" :value="content.title" v-on:input="handleContentPropertyUpdate($event, blockIndex, contentIndex, 'title')" />
                                
                                <label for="date">Date</label>
                                <input name="date" :value="content.date" v-on:input="handleContentPropertyUpdate($event, blockIndex, contentIndex, 'date')" />
                                
                                <label for="desc">Description</label>
                                <textarea name="desc" :value="content.desc" v-on:input="handleContentPropertyUpdate($event, blockIndex, contentIndex, 'desc')" />
                                
                                <br/>
                                
                                <label for="width">Width</label>
                                <select name="width" :value="content.width" v-on:input="handleContentPropertyUpdate($event, blockIndex, contentIndex, 'width')">
                                    <option value="1">1/6</option>
                                    <option value="2">2/6</option>
                                    <option value="3">3/6</option>
                                    <option value="4">4/6</option>
                                    <option value="5">5/6</option>
                                    <option value="6">full</option>
                                </select>

                                <label for="height">Height</label>
                                <select name="height" :value="content.height" v-on:input="handleContentPropertyUpdate($event, blockIndex, contentIndex, 'height')">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                </select>

                                <label for="fit">Image Fit</label>
                                <select name="fit" :value="content.fit" v-on:input="handleContentPropertyUpdate($event, blockIndex, contentIndex, 'fit')">
                                    <option value="contain">Contain</option>
                                    <option value="cover">Cover</option>
                                </select>

                                <label for="bg-color">Background Color</label>
                                <div class="color-picker">
                                    <input name="bg-color" type="color" :value="content.color" v-on:input="handleContentPropertyUpdate($event, blockIndex, contentIndex, 'color')"/>
                                    <button v-on:click="handleContentPropertyReset(blockIndex, contentIndex, 'color')">x</button>
                                </div>
                            </div>
                            <div class="arrows">
                                <div @click="moveContentUp(blockIndex, contentIndex)"><FontAwesomeIcon :icon="faArrowUp" /></div>
                                <div @click="moveContentDown(blockIndex, contentIndex)"><FontAwesomeIcon :icon="faArrowDown" /></div>
                                <div @click="deleteContent(blockIndex, contentIndex)"><FontAwesomeIcon :icon="faTrash" style="color: red;" /></div>
                            </div>
                        </div>
                        <button class="new" @click="addContent(blockIndex)">NEW ART <FontAwesomeIcon :icon="faPlus" /></button>
                    </div>
                </div>
                <button class="new" @click="addSection()">NEW SECTION <FontAwesomeIcon :icon="faPlus" /></button>
            </div>
        </div>
        
        <div class="page-nav">
            <div class="control-nav">
                <button @click="setCurrentPage('about')">about</button>
                <button @click="setCurrentPage('gallery')">art</button>
                <button @click="setCurrentPage('commissions')">commissions</button>
                <button @click="setCurrentPage('contactme')">contact me</button>
            </div>
            <div class="control-content">
                <input type="password" placeholder="github token" @input="setToken" />
                <div class="button-bar">
                    <div v-if="uploadState=='unsubmitted'">
                        <button class="submit" @click="submitChanges()">
                                Submit <div><FontAwesomeIcon :icon="faArrowRight" /></div>
                        </button>
                    </div>
                    <div v-if="uploadState=='submitted'">
                        <button class="submit">
                                uploading
                                <div><FontAwesomeIcon :icon="faSpinner" /></div>
                        </button>
                    </div>
                    <div v-if="uploadState=='success'">
                        <button class="submit">
                                done
                                <div><FontAwesomeIcon :icon="faCheck" /></div>
                        </button>
                    </div>
                    <div v-if="uploadState=='error'">
                        <button class="submit">
                                error
                                <div><FontAwesomeIcon :icon="faTimes" /></div>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

import state from '../state';
import contentData from '../content.json'

import Content from '../art/Content.vue'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowUp, faArrowDown, faArrowRight, faTrash, faSpinner, faCheck, faTimes, faPlus, faUpload } from '@fortawesome/free-solid-svg-icons';

const {
    about,
    commissions,
    contact,
    contactFormEnabled,
    ... otherContent
} = contentData;

export default {
    setup() {
        const uploadState = ref('unsubmitted');

        const token = ref('');
        const setToken = (event) => {
            token.value = event.target.value
        };

        const { 
            about : stateAbout,
            commissions : stateCommissions,
            contact : stateContact,
            contactFormEnabled : stateContactFormEnabled
        } = state;

        state.about = stateCommissions || about
        state.commissions = stateAbout || commissions
        state.contact = stateContact || contact
        state.contactFormEnabled = stateContactFormEnabled || contactFormEnabled

        return {
            uploadState,

            token, setToken
        }
    },

    components: {
        FontAwesomeIcon,
        Content
    },

    methods: {
        updateSectionName (event, index) {
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

        moveSectionUp (id) {
            //console.log(`move ${id} up`)

            if(id < 1)
                return

            const element = state.blocks.splice(id, 1)
            state.blocks.splice(id - 1, 0, ... element)
        },

        moveSectionDown (id) {
            //console.log(`move ${id} down`)

            if(id >= state.blocks.length - 1)
                return

            const element = state.blocks.splice(id, 1)
            state.blocks.splice(id + 1, 0, ... element)
        },

        addSection () {
            state.blocks.push({
                name: "New Section",
                content: []
            })
        },

        deleteSection (id) {
            state.blocks.splice(id, 1)
        },

        moveContentUp (blockId, contentId) {
            //console.log(`move ${blockId} ${contentId} up`)

            if(blockId === 0 && contentId === 0)
                return

            if(contentId === 0){
                const element = state.blocks[blockId].content.splice(contentId, 1)
                state.blocks[blockId - 1].content.push(... element)
            }else{
                const element = state.blocks[blockId].content.splice(contentId, 1)
                state.blocks[blockId].content.splice(contentId - 1, 0, ... element)
            }
        },

        moveContentDown (blockId, contentId) {
            //console.log(`move ${blockId} ${contentId} down`)

            if(blockId === state.blocks.length - 1 && contentId === state.blocks[state.blocks.length - 1].content.length - 1)
                return

            if(contentId === state.blocks[blockId].content.length - 1){
                const element = state.blocks[blockId].content.splice(contentId, 1)
                state.blocks[blockId + 1].content.unshift(... element)
            }else{
                const element = state.blocks[blockId].content.splice(contentId, 1)
                state.blocks[blockId].content.splice(contentId + 1, 0, ... element)
            }
        },

        addContent (blockId) {
            const now = new Date()
            const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`

            state.blocks[blockId].content.push({
                date,
                path: "",
                width: "6",
                height: "1",
                fit: "cover",
                title: "New Masterpiece",
                desc: "This is some new art by Raquel",
            })
        },

        readFileBytes : async (file) => new Promise((res, rej) => {
            const reader = new FileReader()
            reader.readAsText(file, 'UTF-8')
            reader.onload = () => res(reader.result)
            reader.onerror = error => rej(error)
        }),
        readFileBase64 : async (file) => new Promise((res, rej) => {
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => res(reader.result)
            reader.onerror = error => rej(error)
        }),

        // the chungus
        uploadContent (blockId, contentId) {
            const _tempFileInput = document.createElement('input')
            _tempFileInput.type = 'file'

            _tempFileInput.onchange = event => { 
                const file = event.target.files[0]
                const filename = event.target.files[0].name
                const path = `/art/${filename}`

                Promise.all([this.readFileBytes(file), this.readFileBase64(file)])
                    .then(([fileContents, base64FileContents]) => {
                        //console.log({ filename, path, fileContents, base64FileContents })
                        console.log(`fileContents`, fileContents.length)

                        if(fileContents.length > (2 * 1048576 /* MiB */)){
                            console.error("TOO BIG OF A FILE")
                            state.blocks[blockId].content[contentId].path = "ERROR TOO BIG, talk to Michael for upload"
                            return
                        }

                        state.mediaContent[path] = {
                            utf8: fileContents,
                            base64: base64FileContents
                        }
                        state.mediaContentNames = Object.keys(state.mediaContent)

                        //TODO bind to content
                        state.blocks[blockId].content[contentId].path = path

                        console.log({
                            mediaContentNames: state.mediaContentNames,
                            meidaContent: state.mediaContent
                        })

                        //console.log({ test: state.mediaContent?.[state.blocks[blockId].content[contentId].path]?.base64 })
                    })
            }

            _tempFileInput.click()
        },

        deleteContent (blockId, contentId) {
            state.blocks[blockId].content.splice(contentId, 1)
        },

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

        submitChanges() {

            const {
                about,
                commissions,
                contact,
                contactFormEnabled,

                blocks,
                mediaContent
            } = state

            // Gather in-use content from blocks
            const usedContent = blocks.map(
                ({ content }) => content.map(
                    ({ path }) => path
                )
            ).flat()

            console.log({ usedContent })

            const payload = {
                token: this.token,

                content : {
                    ... otherContent,
                    about,
                    commissions,
                    contact,
                    contactFormEnabled
                },

                blocks: [ ... blocks ],
                media: Object.entries(mediaContent)
                            .filter(([ name ]) => true) // filter out content that is not used
                            //.filter(([ name ]) => usedContent.includes(name)) // filter out content that is not used - this is not working
                            .map(([ name, values ]) => ({ name, content: values.base64.split(',')[1] }))
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
                .then(res => this.uploadState = res.ok ? "success" : "error")
                .catch(err => this.uploadState = "error")
                .finally(() => setTimeout(() => this.uploadState = "unsubmitted", 3000))
            this.uploadState = "submitted"
        }
    },

    computed: {
        blocks(){ return state?.blocks },
        about(){ return state?.about },
        commissions(){ return state?.commissions },
        contact(){ return state?.contact },
        contactFormEnabled(){ return state?.contactFormEnabled },
        mediaContentNames(){ return state?.mediaContentNames },
        mediaContent(){ return state?.mediaContent },
        currentPage(){ return state?.adminCurrentPage }
        
    },

    data () {
        return {
            faArrowUp, faArrowDown, faArrowRight, faTrash, faSpinner, faCheck, faTimes, faPlus, faUpload
        }
    }
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

    &>.content {
        margin-bottom: 25px;
        padding: 0 10px;

        .feature-text {
            width: 99%;
            height: 75vh;
        }

        .check, .check-label {
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

            &>*{
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

            &>*{
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

            &>*{
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