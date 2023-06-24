
import { getVariables } from "./modules/variables";

figma.showUI(__html__, { themeColors: true, width: 320, height: 500 });

let state = {
  version: "1.0.0",
  loaded: true,
  variables: getVariables(),
};

figma.ui.postMessage({type: 'init', data: state});

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = (msg) => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.
  // if (msg.type === "create-rectangles") {
  //   const nodes: SceneNode[] = [];
  //   for (let i = 0; i < msg.count; i++) {
  //     const rect = figma.createRectangle();
  //     rect.x = i * getSpacing();
  //     rect.fills = [{ type: "SOLID", color: { r: 1, g: 0.5, b: 0 } }];
  //     figma.currentPage.appendChild(rect);
  //     nodes.push(rect);
  //   }
  //   figma.currentPage.selection = nodes;
  //   figma.viewport.scrollAndZoomIntoView(nodes);
  // }

  // Make sure to close the plugin when you're done. Otherwise the plugin will
  // keep running, which shows the cancel button at the bottom of the screen.
  figma.closePlugin();
};