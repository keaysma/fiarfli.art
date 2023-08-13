<template>
    <div id="contact-me" class="page" v-bind:class="{ 'split-page': contactFormEnabled }">
        <div class="text-content">
            <h2>Contact Me</h2>
            <p>
                {{ contact }}
            </p>
        </div>
        <div v-if="contactFormEnabled" class="contact-form">
            <form action="javascript:void(0);" @submit="submitMessage()">
                <div class="form-group">
                    <div class="field-group">
                        <input type="text" name="name" v-model="name" required />
                        <label for="name">Name</label>
                    </div>
                </div>

                <div class="form-group">
                    <div class="field-group">
                        <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" name="email" v-model="email"
                            required />
                        <label for="email">Email</label>
                    </div>
                </div>

                <div class="form-group">
                    <div class="field-group">
                        <input type="text" name="subject" autocomplete="off" v-model="subject" required />
                        <label for="subject">Subject</label>
                    </div>
                </div>

                <div class="form-group">
                    <div class="field-group">
                        <textarea name="body" v-model="body" required></textarea>
                        <label for="body">Message</label>
                    </div>
                </div>

                <div class="form-group submit-group">
                    <button v-if="submitState === 'unsubmitted'" class="submit-button" type="submit">send it!
                        <!-- <FontAwesomeIcon :icon="faPaperPlane" /> -->
                    </button>
                    <span v-else-if="submitState === 'submitted'" class="submitted-text">sending...</span>
                    <span v-else-if="submitState === 'success'" class="success-text">sent 🕊️</span>
                    <span v-else-if="submitState === 'error'" class="error-text"><span>MEOW!!!</span> 🙀 (failed, try
                        again later)</span>
                    <span v-else class="">"MEOW." -- Raquel</span>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { contact, contactFormEnabled } from '../content.json'

defineProps<{
    contact: string,
    contactFormEnabled: boolean
}>();

const submitState = ref('unsubmitted')
const name = ref('')
const email = ref('')
const subject = ref('')
const body = ref('')

const clearForm = () => {
    name.value = ''
    email.value = ''
    subject.value = ''
    body.value = ''
}

const submitMessage = () => {
    if (submitState.value !== 'unsubmitted') return

    const payload = {
        name, email, subject, body
    }

    console.debug(`/api/mail`, { ...payload })

    submitState.value = "submitted"

    fetch(
        `${(import.meta as any).env.PUBLIC_BACKEND}/api/mail`,
        {
            method: `POST`,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        }
    )
        .then(res => {
            submitState.value = res.ok ? "success" : "error"
            clearForm()
        })
        .catch(err => {
            submitState.value = "error"
        })
        .finally(() => {
            if (submitState.value !== "success")
                setTimeout(() => submitState.value = "unsubmitted", 3000)
        })
}
</script>

<style lang="scss">
#contact-me.page {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    height: 90vh;

    padding: 0 4em;

    &.split-page {
        .text-content {
            flex: 0.4;

        }

        .contact-form {
            flex: 0.55;

            &,
            form,
            .form-group,
            .field-group {
                width: 100%;
            }
        }
    }

    .text-content {
        margin: 0;

        color: #534957;
        text-shadow: 1px 1px 1px #d389a7f4;

        h2,
        p {
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

            &:hover,
            &:focus {
                color: white;

                //background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
                //background-size: 400% 400%;
                //animation: gradient 2s infinite;

                animation: gradient2 3s infinite, pulse 1s infinite;
            }

            @keyframes gradient2 {
                0% {
                    background: linear-gradient(90deg, #adc1e6, #caade6);
                }

                15% {
                    background: linear-gradient(90deg, #c4c0ff, #edc0ff);
                }

                40% {
                    background: linear-gradient(90deg, #ffc0cb, #ffdec0);
                }

                65% {
                    background: linear-gradient(90deg, #ebe784, #ebe784);
                }

                100% {
                    background: linear-gradient(90deg, #adc1e6, #caade6);
                }
            }

            @keyframes gradient1 {
                0% {
                    background-color: #adc1e6;
                }

                15% {
                    background-color: #c4c0ff;
                }

                40% {
                    background-color: #ffc0cb;
                }

                65% {
                    background-color: #ebe784;
                }

                100% {
                    background-color: #adc1e6;
                }
            }

            @keyframes pulse {
                0% {
                    transform: scale(1);
                }

                50% {
                    transform: scale(1.25);
                }

                100% {
                    transform: scale(1);
                }
            }

            @keyframes gradient {
                0% {
                    background-position: 0% 0%;
                    transform: scale(1);
                }

                25% {
                    background-position: 100% 0%;
                    transform: scale(1.1) rotate(-10deg);
                }

                50% {
                    background-position: 100% 100%;
                    transform: scale(1.4) rotate(10deg);
                }

                75% {
                    background-position: 0% 100%;
                    transform: scale(1);
                }
            }
        }

        .form-group {
            display: flex;
            flex-direction: row;
        }

        .submit-group {
            justify-content: end;
        }

        .submitted-text {
            background: -webkit-linear-gradient(135deg, blue, pink);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .success-text {
            background: -webkit-linear-gradient(275deg, blue, pink);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .error-text {
            span {
                position: absolute;
                color: red;
                animation: shake 0.2s infinite;
            }

            @keyframes shake {
                0% {
                    transform: translate(-90px, 0) rotate(320deg);
                }

                25% {
                    transform: translate(-80px, 0) rotate(340deg);
                }

                50% {
                    transform: translate(-90px, 0) rotate(330deg);
                }

                75% {
                    transform: translate(-100px, 0) rotate(320deg);
                }

                100% {
                    transform: translate(-90px, 0) rotate(310deg);
                }
            }
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

            input,
            textarea {
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

@media only screen and (max-width: 768px) {
    #contact-me.page {
        width: 100%;

        margin: 0;

        .content-wrapper {
            display: flex;
            flex-direction: column;

            &.split-page {

                .text-content,
                .contact-form,
                form {
                    width: 100%;
                    max-width: 100%;
                }
            }

            .text-content {
                width: 100%;

                text-shadow: 1px 1px 3px #0004;
            }

            .contact-form {

                .form-group,
                .field-group,
                input,
                textarea {
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