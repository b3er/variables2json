import { AppState, ResizeOptions } from "../ui/models";
import { getVariables } from "./modules/variables";

figma.showUI(__html__, { themeColors: true, width: 320, height: 500 });

function getState(): AppState {
  return {
    version: "1.0.3",
    loaded: true,
    variables: getVariables(),
  } as AppState;
}

figma.ui.postMessage({ type: "updateState", data: getState() });

figma.on("documentchange", () => {
  figma.ui.postMessage({ type: "updateState", data: getState() });
});

figma.ui.onmessage = (msg) => {
  if (msg === "notify-downloaded") {
    figma.notify("Variables downloaded!");
  }

  if (msg.type === "resize") {
    _reposition(msg.data as ResizeOptions);
  }
};

// restore previous size
figma.clientStorage
  .getAsync("size")
  .then((options) => {
    console.log(options);
    if (options) _reposition(options as ResizeOptions);
  })
  .catch((err) => {});

function _reposition(options: ResizeOptions) {
  figma.ui.resize(options.w, options.h);
  figma.clientStorage.setAsync("size", options).catch((err) => {});
}
