const THEME_STORAGE_KEY = "themeStorageKey";

(async () => {
    const preTag =
        document.querySelector("body > pre:only-child") ||
        document.querySelector("body > pre:has(+ div)"); // match pages with "pretty-print" banner
    if (!preTag) {
        return;
    }

    // get theme name
    const storageValuePair = await chrome.storage.local.get([THEME_STORAGE_KEY]);
    const theme = storageValuePair[THEME_STORAGE_KEY];
    const cssURL = `vendor/${theme}.min.css`;

    // create <link> elt
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = chrome.runtime.getURL(cssURL);

    // insert <link> elt in document
    const head = document.getElementsByTagName("head")[0];
    head.appendChild(link);

    hljs.highlightElement(preTag);

    // add background color
    const body = document.querySelector("body");
    body.classList.add("hljs"); // color background
})();
