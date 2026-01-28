const THEME_STORAGE_KEY = "themeStorageKey";

async function main() {
    const form = document.getElementsByTagName("form")[0];
    const themeSelector = document.getElementsByTagName("select")[0];
    const storageValue = await chrome.storage.local.get<{
        [THEME_STORAGE_KEY]: string;
    }>([THEME_STORAGE_KEY]);
    if (storageValue) {
        const theme = storageValue[THEME_STORAGE_KEY];
        themeSelector.value = theme;
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        // get value and save to
        const themeName =
            themeSelector.options[themeSelector.selectedIndex].textContent;
        const themeFileName = themeSelector.value;
        await chrome.storage.local.set({ [THEME_STORAGE_KEY]: themeFileName });
        await chrome.notifications.create({
            type: "basic",
            title: "Medium Rare",
            message: `Selected theme: ${themeName}`,
            iconUrl: "./placeholder.png",
        });
        window.close();
    });
}

document.addEventListener("DOMContentLoaded", main);
