console.clear();

interface JsonToken {
  type: "color" | "number";
  value: string | number | any;
}

interface Collection {
  [key: string]: Mode;
}

interface Mode {
  [key: string]: JsonToken | JsonTokenGroup;
}

interface JsonTokenGroup {
  [key: string]: JsonToken;
}

interface File {
  fileName: string;
  body: Record<string, Collection>;
}


function isVariableAlias(value: VariableValue): value is VariableAlias {
  return (value as VariableAlias).type === "VARIABLE_ALIAS";
}

function processCollection(collection: VariableCollection): Collection {
  const variableIds = collection.variableIds;
  const modes = collection.modes;

  let obj = {} as Collection;

  modes.forEach((mode) => {
    let modeName = mode.name.toLowerCase().replace(/\s/g, "_");

    obj[modeName] = {} as Mode;
    let modeObj = obj[modeName];
    
    variableIds.forEach((variableId) => {

      const variable: Variable|null = figma.variables.getVariableById(variableId);

      if (!variable) return;

      const resolvedType = variable.resolvedType === "COLOR" ? "COLOR" : "FLOAT";
      const value = variable.valuesByMode[mode.modeId];

      if(value === undefined) return;

      // Create the object structure based on the variable name path
      let obj : any = modeObj;
      variable.name.split("/").forEach((groupName) => {
        let name = groupName.toLowerCase().replace(/\s/g, "_");;
        obj[name] = obj[name] || {};
        obj = obj[name];
      });
      
      // Add the token to the object
      let token = obj as JsonToken;
      token.type = resolvedType === "COLOR" ? "color" : "number";
      if(isVariableAlias(value)) {
        token.value = `{${figma.variables.getVariableById(value.id)?.name.replace(/\//g, ".")}}`;
      } else {
        token.value = resolvedType === "COLOR" ? rgbToHex(value) : value;
      }
    });  
  });

  return obj;
}


function rgbToHex(value: VariableValue) {
  let r: number = 0;
  let g: number = 0;
  let b: number = 0;
  let a: number = 1;

  if(value as RGBA !== undefined) {
    r = (value as RGBA).r;
    g = (value as RGBA).g;
    b = (value as RGBA).b;
    a = (value as RGBA).a;
  }
  if(value as RGB !== undefined) {
    r = (value as RGB).r;
    g = (value as RGB).g;
    b = (value as RGB).b;
  }

  if (a !== 1) {
    return `rgba(${[r, g, b]
      .map((n) => Math.round(n * 255))
      .join(", ")}, ${a.toFixed(4)})`;
  }
  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const hex = [toHex(r), toHex(g), toHex(b)].join("");
  return `#${hex}`;
}

function exportToJSON() {
  const collections = figma.variables.getLocalVariableCollections();
  const files : Array<File> = [];

  const file ={ 
    fileName: `tokens.json`, 
    body: {} 
  } as File;

  collections.forEach((collection) => {
    file.body[collection.name.toLowerCase()] = processCollection(collection);
  });

  files.push(file);
  
  figma.ui.postMessage({ type: "EXPORT_RESULT", files });
}


figma.ui.onmessage = (e) => {
  console.log("code received message", e);
  if (e.type === "EXPORT") {
    exportToJSON();
  }
};

  figma.showUI(__uiFiles__["export"], {
    width: 500,
    height: 500,
    themeColors: true,
  });

