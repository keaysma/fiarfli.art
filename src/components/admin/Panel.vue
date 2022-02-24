<template>
    <div id="admin" class="page">
        <div class="content">
            <h2>Admin panel</h2>
            <div v-for="(block, blockIndex) in blocks" :key="blockIndex" class="art-section" :id="`art-${block.name}`">
                <div class="section-name">
                    <input :value="block.name" v-on:input="updateSectionName($event, blockIndex)" />
                    <div class="arrows">
                        <div><FontAwesomeIcon :icon="faArrowUp" /></div>
                        <div><FontAwesomeIcon :icon="faArrowDown" /></div>
                    </div>
                </div>
                <div class="art-container">
                    <div v-for="(content, contentIndex) in block.content" :key="contentIndex" class="art-piece">
                        <img v-bind:src="content.path"/>
                        <div class="text-content">
                            <label for="name">Name</label>
                            <input name="name" :value="content.title" v-on:input="handleContentPropertyUpdate($event, blockIndex, contentIndex, 'title')" />
                            
                            <label for="date">Date</label>
                            <input name="date" :value="content.date" v-on:input="handleContentPropertyUpdate($event, blockIndex, contentIndex, 'date')" />
                            
                            <label for="desc">Description</label>
                            <textarea name="desc" :value="content.desc" v-on:input="handleContentPropertyUpdate($event, blockIndex, contentIndex, 'desc')" />
                            
                            <br/>
                            <input :value="content.width" v-on:input="handleContentPropertyUpdate($event, blockIndex, contentIndex, 'width')" />
                            <input :value="content.height" v-on:input="handleContentPropertyUpdate($event, blockIndex, contentIndex, 'height')" />
                        </div>
                        <div class="arrows">
                            <div><FontAwesomeIcon :icon="faArrowUp" /></div>
                            <div><FontAwesomeIcon :icon="faArrowDown" /></div>
                            <div><FontAwesomeIcon :icon="faTrash" /></div>
                        </div>
                    </div>
                    <p>NEW ART</p>
                </div>
            </div>
            <p>NEW SECTION</p>
        </div>
        
        <div class="page-nav">
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
</template>

<script>
import { ref } from 'vue';

import state from '../state';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowUp, faArrowDown, faArrowRight, faTrash, faSpinner, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

export default {
    setup() {
        const uploadState = ref('unsubmitted');

        const token = ref('');
        const setToken = (event) => {
            token.value = event.target.value
        };

        return {
            uploadState,
            
            token, setToken
        }
    },

    components: {
        FontAwesomeIcon
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
            console.log({ event, blockIndex, contentIndex, property })

            state.blocks[blockIndex].content[contentIndex][property] = event.target.value
        },

        submitChanges() {
            const payload = {
                token: this.token,
                blocks: [ ... state.blocks ]
            }

            console.log(`${import.meta.env.PUBLIC_BACKEND}/api/grid`)
            console.log({ payload })

            this.uploadState = "submitted"
            fetch(
                `${import.meta.env.PUBLIC_BACKEND}/api/grid`,
                {
                    method: `POST`,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    data: JSON.stringify(payload)
                }
            )
                .then(res => this.uploadState = res.ok ? "success" : "error")
                .catch(err => this.uploadState = "error")
                .finally(() => setTimeout(() => this.uploadState = "unsubmitted", 3000))
        }
    },

    computed: {
        blocks(){ return state?.blocks },
    },

    data () {
        return {
            faArrowUp, faArrowDown, faArrowRight, faTrash, faSpinner, faCheck, faTimes
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

    margin: 0;
    padding: 0;

    color: white;
    background: gray;

    .content {
        padding: 0 10px;
    }

    .section-name {
        display: flex;
        flex-direction: row;

        .arrows {
            display: flex;
            flex-direction: row;
        }
    }

    .art-piece {
        display: flex;
        flex-direction: row;

        margin: 15px 0;

        border: 1px dotted #AAA;
        border-radius: 5px;
        

        img {
            width: 20%;

            object-fit: contain;
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
        flex-direction: row;

        bottom: 0;
        left: 0;

        width: 100%;
        height: 50px;

        margin: 0;
        padding: 0;

        background: orange;

        input {
            height: 20px;
            width: 100%;
            max-width: 250px;

            margin: auto 10px;
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

                box-shadow: 0px 0px 5px 1px orchid;
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