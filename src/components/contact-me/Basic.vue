<template lang="">
    <div id="contact-me" class="page">
        <div class="content-wrapper" v-bind:class="{ 'split-page': contactFormEnabled }">
            <div class="text-content">
                <h2>Contact Me</h2>
                <p>
                    {{ contact }}
                </p>
            </div>
            <div v-if="contactFormEnabled" class="contact-form">
                <form action="mailto:raquel@fiarfli.art" method="get" enctype="text/plain">
                    <div class="form-group">
                        <div class="field-group">
                            <input type="text" name="name" />
                            <label for="name">Name</label>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="field-group">
                            <input type="text" name="subject" autocomplete="off" />
                            <label for="subject">Subject</label>
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="field-group">
                            <textarea name="body"></textarea>
                            <label for="body">Message</label>
                        </div>
                    </div>

                    <div class="form-group">
                        <button class="submit-button">send it! <font-awesome-icon :icon="faPaperPlane" /></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import state from '../state'
import { contact, contactFormEnabled } from '../content.json'

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default {
    setup () {
        if(!state.contact)
            state.contact = contact

        if(state.contactFormEnabled === undefined)
            state.contactFormEnabled = contactFormEnabled
    },
    computed: {
        contact () { return state?.contact },
        contactFormEnabled () { return state?.contactFormEnabled }
    },
    components: {
        FontAwesomeIcon
    },
    data () {
        return {
            faPaperPlane
        }
    }
}
</script>

<style lang="scss">
#contact-me.page {
    display: flex;
    flex-direction: column;

    width: 100%;
    height: 95vh;

    justify-content: center;

    .content-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        
        width: 80%;
        
        margin: -50px auto 0;

        &.split-page {
            .text-content {
                flex: 0.4;

            }

            .contact-form {
                flex: 0.55;

                &, form, .form-group, .field-group {
                    width: 100%;
                }
            }
        }

        .text-content {
            margin: 0;

            color: #534957;
            text-shadow: 1px 1px 3px #53495744;

            h2, p {
                white-space: break-spaces;
            }
        }

        .contact-form {
            .submit-button {
                display: flex;
                flex-direction: row;
                justify-content: space-evenly;
                align-items: center;

                margin-left: auto;
                margin-top: 10px;
                padding: 10px;

                color: slateblue;
                background: transparent;

                border: 2px solid slateblue;
                border-radius: 15px;

                transition: all 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);

                &>* {
                    margin: 0 5px;
                }

                &:hover, &:focus {
                    color: white;

                    //background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
                    //background-size: 400% 400%;

                    animation: gradient 2s infinite, pulse 0.75s infinite;
                }

                @keyframes gradient {
                      0%{background-color: red;}
                     25%{background-color: rgb(0, 255, 0);}
                     50%{background-color: rgb(255, 0, 255);}
                     75%{background-color: rgb(0, 255, 255);}
                    100%{background-color: rgb(255, 0, 179);}
                }

                @keyframes pulse {
                    0%{transform: scale(1);}
                    50%{transform: scale(1.25);}
                    100%{transform: scale(1);}
                }

                @keyframes gradient1 {
                     0%{background-position:0% 0%;      transform: scale(1);}
                    25%{background-position:100% 0%;    transform: scale(1.1)   rotate(-10deg);}
                    50%{background-position:100% 100%;  transform: scale(1.4)   rotate(10deg);}
                    75%{background-position:0% 100%;    transform: scale(1);}
                }
            }

            .form-group {
                display: flex;
                flex-direction: row;
            }

            .field-group {
                display: flex;
                flex-direction: column-reverse;

                margin: 10px 0;

                label {
                    width: 100px;
                    margin-left: 5px;

                    color: slateblue;

                    transition: all 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);

                    //transform: translate(5px, 10px);
                }

                input {
                    height: 30px;
                }

                textarea {
                    height: 250px;
                }

                input, textarea {
                    padding: 3px;
                    border-width: 2px;
                    border-style: solid;
                    border-color: slateblue;
                    border-radius: 5px;

                    background: transparent;

                    transition: all 0.2s;

                    &:focus {
                        outline: none;
                        // border-radius: 4px;
                        // border-image: linear-gradient(pink, blue) 1;
                        border: solid 1px transparent;
                        border-radius: 5px;
                        background-image: linear-gradient(#FFFD, #FFFD), 
                                            linear-gradient(135deg, pink, blue);
                        background-origin: border-box;
                        background-clip: content-box, border-box;

                        +label {
                            transform: scale(1.25) rotate(-20deg) translate(-20px, -20px);

                            background: linear-gradient(135deg, pink, blue);
                            -webkit-background-clip: text;
                            background-clip: text;
                            -webkit-text-fill-color: transparent;
                        }
                    }
                }
            }
        }
    }
}

@media only screen and (max-width: 768px) {
    #contact-me.page {
        width: 100%;

        margin: 0;

        .content-wrapper {
            display: flex;
            flex-direction: column;

            &.split-page {
                .text-content, .contact-form, form {
                    width: 100%;
                    max-width: 100%;
                }
            }
            
            .text-content {
                width: 100%;

                text-shadow: 1px 1px 3px #0004;
            }

            .contact-form {
                .form-group, .field-group, input, textarea {
                    width: 100%;
                }

                .field-group {
                    margin: 10px 0;
                }

                .form-group {
                    margin: 10px 0;
                }
            }
        }
    }
}
</style>