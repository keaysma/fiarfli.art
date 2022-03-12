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
                <form>
                    <div class="form-group">
                        <div class="field-group">
                            <label for="name">Name</label>
                            <input type="text" name="name" />
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="field-group">
                            <label for="subject">Subject</label>
                            <input type="text" name="subject" />
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="field-group">
                            <label for="message">Message</label>
                            <textarea name="message" />
                        </div>
                    </div>

                    <div class="form-group">
                        <button class="submit-button">swoosh</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import state from '../state'
import { contact, contactFormEnabled } from '../content.json'
export default {
    data: () => ({ contactFormEnabled }),
    setup () {
        if(!state.contact)
            state.contact = contact
    },
    computed: {
        contact () { return state?.contact }
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
                flex: 0.45;
            }

            .contact-form {
                flex: 0.45;

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
            .form-group {
                display: flex;
                flex-direction: row;
            }

            .field-group {
                display: flex;
                flex-direction: column;

                label {
                    
                }

                input {
                    height: 30px;
                }

                input, textarea {
                    border: 2px solid slateblue;
                    border-radius: 5px;
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