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

    // notiy user of new theme
    const notif: chrome.notifications.NotificationCreateOptions = {
      type: "basic",
      title: "Medium Rare",
      message: `Selected theme: ${themeName}`,
      iconUrl: "./placeholder.png",
    };
    await chrome.notifications.create(notif);

    // send message to all tabs' content script to reload
    const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
    const activeTab = tabs[0];
    const message: { action: string } = { action: "themeChange" };
    await chrome.tabs.sendMessage(activeTab.id, message);
    window.close();
  });
}

document.addEventListener("DOMContentLoaded", main);
