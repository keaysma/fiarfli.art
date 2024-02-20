import MarkdownIt from "markdown-it";

/*
[
    [
        "og:site_name",
        "Ko-fi"
    ],
    [
        "og:locale",
        "en_US"
    ],
    [
        "og:image:height",
        "628"
    ],
    [
        "og:image:width",
        "1200"
    ],
    [
        "og:title",
        "Fiarfli's Ko-fi Commissions"
    ],
    [
        "og:description",
        "Ko-fi Commissions Open! Click to see Fiarfli's commission menu."
    ],
    [
        "og:type",
        "profile"
    ],
    [
        "og:url",
        "https://ko-fi.com/fiarfli/commissions"
    ],
    [
        "og:image",
        "https://storage.ko-fi.com/cdn/generated/vgn13eols/rest-e8d639ff0aded1bbd334afb37c4eec90-m0astuv1.jpg"
    ],
    [
        "og:image:alt",
        "Ko-fi Commissions Open! Click to see Fiarfli's commission menu."
    ]
]
*/

type MetaProps = Partial<{
    "og:site_name": string;
    "og:locale": string;
    "og:image:height": string;
    "og:image:width": string;
    "og:title": string;
    "og:description": string;
    "og:type": string;
    "og:url": string;
    "og:image": string;
    "og:image:alt": string;
}>

export const markdownCardPlugin = (token: string) => function (md: MarkdownIt) {
    /*
    !!(https://ko-fi.com/fiarfli/commissions) -> <div> <img src="https://ko-fi.com/fiarfli/comissions/picture"/> </div>
    */
    md.inline.ruler.push(
        'card',
        function (state, silent) {
            const start = state.pos;
            if (state.src.charCodeAt(start) !== 0x21/* ! */) return false;

            const match = state.src.slice(start).match(/!!\(([^)]+)\)/);
            if (!match) return false;

            const cardId = `md-card-${new Date().getTime()}`
            const d = state.push('card_open', 'a', 1);
            d.attrSet("id", cardId);

            state.push('bold_open', 'b', 1);
            const t = state.push('text', '', 0); t.content = '...';
            state.push('bold_close', 'b', -1)

            state.push('card_close', 'a', -1);

            state.pos += match[0].length;

            fetch(`${import.meta.env.PUBLIC_BACKEND}/api/forger?url=${encodeURIComponent(match[1])}`, {
                headers: {
                    'X-Git-Token': token,
                }
            })
                .then(async (response) => {
                    const text = await response.text();
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(text, 'text/html');

                    const metaTags = [...doc.head.querySelectorAll('meta')].filter(m => m.attributes['property']?.value?.startsWith?.("og:"))
                    const meta: MetaProps = Object.fromEntries(metaTags.map(m => [m.attributes['property']?.value, m.attributes['content']?.value]))

                    const card = document.getElementById(cardId);
                    if (!card) return;

                    card.setAttribute("href", meta["og:url"]);
                    card.classList.add("md-card");

                    // width="${meta["og:image:width"]}" height="${meta["og:image:height"]}"
                    card.innerHTML = `
                        <img src="${meta["og:image"]}" alt="${meta["og:image:alt"]}" />
                        <h3>${meta["og:title"]}</h3>
                        <p>${meta["og:description"]}</p>
                    `
                })
                .catch(() => {
                    console.error("Failed to fetch", match[1])
                    const card = document.getElementById(cardId);
                    if (!card) return;

                    card.remove();
                });

            return true;
        }
    )
}