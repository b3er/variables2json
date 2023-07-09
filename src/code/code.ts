import { AppState, ResizeOptions, SettingsData } from "../ui/models";
import { getVariables } from "./modules/variables";

figma.showUI(__html__, { themeColors: true, width: 320, height: 500 });

async function getStateAsync(): Promise<AppState> {
  let settings = await loadSettingsAsync();
  let variables = getVariables();

  return {
    version: "1.0.5",
    loaded: true,
    variables: variables,
    settings: settings
  } as AppState;
}

async function loadSettingsAsync(): Promise<SettingsData> {
  let settingsOrNull = await figma.clientStorage.getAsync("settings");

  if (settingsOrNull) {
    return settingsOrNull as SettingsData;
  } else {
    return {
      excludePrivate: false,
      colorFormat: "hex"
    } as SettingsData;
  }
}

function getStateAndPost() {
  getStateAsync().then((state) => {
    figma.ui.postMessage({ type: "updateState", data: state });
  });
}

getStateAndPost();
figma.on("documentchange", () => {
  getStateAndPost();
});

figma.ui.onmessage = (msg) => {
  if (msg === "notify-downloaded") {
    figma.notify("Variables downloaded!");
  }

  if (msg.type === "resize") {
    _reposition(msg.data as ResizeOptions);
  }

  if (msg.type === "updateSettings") {
    _updateSettings(msg.data as SettingsData);
  }
};

// restore previous size
figma.clientStorage
  .getAsync("size")
  .then((options) => {
    if (options) _reposition(options as ResizeOptions);
  })
  .catch((err) => {});

function _reposition(options: ResizeOptions) {
  figma.ui.resize(options.w, options.h);
  figma.clientStorage.setAsync("size", options).catch((err) => {});
}

function _updateSettings(settings: SettingsData) {
  console.log("Saving updated settings");
  figma.clientStorage.setAsync("settings", settings).catch((err) => {});
}
