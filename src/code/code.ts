import { AppState, ResizeOptions, Server, SettingsData, ProviderType } from "../ui/models";
import { getVariables } from "./modules/variables";

figma.showUI(__html__, { themeColors: true, width: 320, height: 500 });

async function getStateAsync(): Promise<AppState> {
  let settings = await loadSettingsAsync();
  let servers = await loadServersAsync();
  let variables = getVariables();

  return {
    version: "1.0.7",
    loaded: true,
    variables: variables,
    settings: settings,
    servers: servers,
  } as AppState;
}

async function loadSettingsAsync(): Promise<SettingsData> {
  let settingsOrNull = await figma.clientStorage.getAsync("settings");

  const defaults = {
    excludePrivate: false,
    colorFormat: "hex",
    provider: ProviderType.Github,
    githubToken: "",
    gitlabToken: "",
    repo: "",
    gitlabProject: "",
    defaultBranch: "main",
    filePath: "variables.json",
    commitMessage: "update variables.json",
    branchName: "update-design-variables",
  };

  if (settingsOrNull) {
    // Merge with defaults to ensure new fields exist
    return Object.assign({}, defaults, settingsOrNull) as SettingsData;
  } else {
    return defaults as SettingsData;
  }
}

async function loadServersAsync(): Promise<Array<Server>> {
  let serversOrNull = await figma.clientStorage.getAsync("servers");

  if (serversOrNull) {
    return serversOrNull as Array<Server>;
  } else {
    return [];
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
  .catch((err) => { });

function _reposition(options: ResizeOptions) {
  figma.ui.resize(options.w, options.h);
  figma.clientStorage.setAsync("size", options).catch((err) => { });
}

function _updateSettings(settings: SettingsData) {
  console.log("Saving updated settings");
  figma.clientStorage.setAsync("settings", settings).catch((err) => { });
}
