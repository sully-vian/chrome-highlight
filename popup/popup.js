const THEME_STORAGE_KEY = "themeStorageKey";

async function main() {
    const form = document.getElementById("themeForm");
    const themeSelector = document.getElementById("themeSelector");
    const storageValue = await chrome.storage.local.get([THEME_STORAGE_KEY]);
    if (storageValue) {
        const theme = storageValue[THEME_STORAGE_KEY];
        themeSelector.value = theme;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        // get value and save to
        const selectedTheme = themeSelector.value;
        await chrome.storage.local.set({ [THEME_STORAGE_KEY]: selectedTheme });
        window.close();
    });
}

document.addEventListener("DOMContentLoaded", main);
