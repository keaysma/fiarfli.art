<script setup lang="ts">
import Linktree from '/src/components/Linktree.vue'
import { faBluesky, faInstagram, faLinkedin, faLinkedinIn, faTumblr, faTumblrSquare, faTwitch, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faCoffee, faTree } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { ref, toRef } from 'vue';

const props = defineProps<{
    contact: string,
    contactFormEnabled: boolean
}>();

const formEnabled = toRef(props, 'contactFormEnabled');

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
        name: name.value,
        email: email.value,
        subject: subject.value,
        body: body.value
    }

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

<template>
    <div id="contact-me" class="page">
        <h2>Contact Me</h2>
        <p>
            <span>{{ contact }}</span>
            <br>
            <br>
            <span class="social-links">
                <a href="https://ko-fi.com/fiarfli" target="_blank">
                    <label>Kofi</label>
                    <FontAwesomeIcon :icon="faCoffee" />
                </a>
                <a href="https://www.instagram.com/fiarfli" target="_blank">
                    <label>Insta</label>
                    <FontAwesomeIcon :icon="faInstagram" />
                </a>
                <a href="https://fiarfliart.tumblr.com/" target="_blank">
                    <label>'blur</label>
                    <FontAwesomeIcon :icon="faTumblr" />
                </a>
                <a href="https://www.linkedin.com/in/raquel-bumgarner-27b6a315b/" target="_blank">
                    <label>LinkedIn</label>
                    <FontAwesomeIcon :icon="faLinkedinIn" />
                </a>
                <a href="https://www.twitch.tv/fiarfli" target="_blank">
                    <label>Twitch!</label>
                    <FontAwesomeIcon :icon="faTwitch" />
                </a>
                <a href="https://bsky.app/profile/fiarfli.art" target="_blank">
                    <label>bsky</label>
                    <FontAwesomeIcon :icon="faBluesky" />
                </a>
                <a href="https://linktr.ee/fiarfli" target="_blank">
                    <label>linky</label>
                    <Linktree width="28px" height="28px" class="svg-inline--fa" />
                </a>
            </span>
        </p>
        <div v-if="formEnabled" class="contact-form">
            <form action="javascript:void(0);" @submit="submitMessage()">
                <div class="form-group">
                    <div class="field-group">
                        <label for="name">Name</label>
                        <input type="text" name="name" v-model="name" required />
                    </div>

                    <div class="field-group">
                        <label for="email">Email</label>
                        <input type="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" name="email"
                            v-model="email" required />
                    </div>

                    <div class="field-group">
                        <label for="subject">Subject</label>
                        <input type="text" name="subject" autocomplete="off" v-model="subject" required />
                    </div>

                    <div class="field-group">
                        <label for="body">Message</label>
                        <textarea name="body" v-model="body" required></textarea>
                    </div>
                </div>

                <div class="form-group">
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

<style lang="scss">
#contact-me.page {
    display: inline;

    >p {
        display: inline-block;
        vertical-align: top;
        width: 50%;
        margin-right: 1em;

        line-height: 1em;

        svg {
            max-width: 36px;
        }
    }

    .contact-form {
        display: inline-block;
        width: 40%;
        max-width: 24em;
    }

    .social-links {
        display: inline;
        white-space: pre;

        &>* {
            margin-inline-start: 0.5em;

            &:first-child {
                margin-left: 0;
            }
        }

        >a {
            position: relative;
            width: 36px;
            color: #c4c0ff;
            fill: #c4c0ff;
            text-decoration: none;

            &:hover {
                color: #edc0ff;
                fill: #edc0ff;

                >label {
                    display: initial;
                }
            }

            >label {
                display: none;
                position: absolute;
                top: -1.5em;
                left: -0.825em;

                width: 2.5em;
                text-align: center;

                color: #534957;
                background-color: #caade6;

                border-radius: 0.25em;
                border: 1px solid #534957;

                padding: 0.1em;
            }
        }
    }

    h2,
    p {
        white-space: break-spaces;
    }

    .contact-form {
        .submit-button {
            font-family: "Nanum Pen Script";
            display: block;
            float: right;

            font-size: 1em;
            line-height: 0.5em;

            width: 150px;
            height: 50px;

            padding: 10px;
            margin-right: -0.3em;

            color: slateblue;
            background: transparent;

            border: 2px solid slateblue;
            border-radius: 8px;

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

        .submitted-text {
            background: -webkit-linear-gradient(135deg, blue, pink);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }

        .success-text {
            background: -webkit-linear-gradient(275deg, blue, pink);
            background-clip: text;
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
            display: block;
            margin: 0.5em 0;

            label {
                display: block;

                margin: 0;
                padding: 0;
                line-height: 0.5em;

                color: slateblue;

                transition: all 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);

                //transform: translate(5px, 10px);
            }

            input {
                height: 30px;
            }

            textarea {
                height: 150px;
            }

            input,
            textarea {
                padding: 3px;
                border-width: 2px;
                border-style: solid;
                border-color: slateblue;
                border-radius: 5px;

                background: transparent;

                width: 100%;

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

    @media only screen and (max-width: 768px) {
        width: auto;
        min-height: unset;

        margin: 0.5em;
        padding: 1em;

        font-size: smaller;
        // word-wrap: break-word;
        // white-space: pre-wrap;

        p {
            display: block;
            position: relative;
            width: 100%;
            height: min-content;
            float: unset;
        }

        .contact-form {
            width: 100%;

            margin-top: unset;
            float: unset;
        }
    }
}
</style>
