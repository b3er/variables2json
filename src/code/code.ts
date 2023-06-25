
import { AppState } from "../ui/models";
import { getVariables } from "./modules/variables";

figma.showUI(__html__, { themeColors: true, width: 320, height: 500 });

function getState(): AppState {
  return {
    version: "1.0.1",
    loaded: true,
    variables: getVariables(),
  } as AppState;
}

figma.ui.postMessage({type: 'updateState', data: getState()});

figma.on("documentchange", () => {
  figma.ui.postMessage({type: 'updateState', data: getState()});
});

figma.ui.onmessage = (msg) => {
  
  if (msg === "notify-downloaded") {
    figma.notify('Variables downloaded!');
  }
  
  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};