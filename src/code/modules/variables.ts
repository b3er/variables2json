import { ModeValue, TokenType, VariableToken } from "../../ui/models";

function isVariableAlias(value: VariableValue): value is VariableAlias {
  return (value as VariableAlias).type === "VARIABLE_ALIAS";
}

function isRGBA(value: VariableValue): value is RGBA {
  return (value as RGBA).a !== undefined;
}

function isRGB(value: VariableValue): value is RGB {
  return (value as RGB).r !== undefined;
}

function processCollection(collection: VariableCollection): Array<VariableToken> {
  const variableIds = collection.variableIds;
  const modes = collection.modes;

  let tokens = [] as Array<VariableToken>;

  variableIds.forEach((variableId) => {

    const variable: Variable|null = figma.variables.getVariableById(variableId);

    if (!variable) return;

    let type : TokenType;
    switch (variable.resolvedType) {
      case "COLOR":
        type = TokenType.Color;
        break;
      case "FLOAT":
        type = TokenType.Number;
        break;
      case "STRING":
        type = TokenType.String;
        break;
      case "BOOLEAN":
        type = TokenType.Boolean;
        break;
    }

    let token = {
      collection: collection.name,
      name: variable.name,
      type: type,
      values: modes.map((mode) => {
        
        let value = variable.valuesByMode[mode.modeId];
        if(isVariableAlias(value)) {
          let reference = figma.variables.getVariableById(value.id);
          if(reference != undefined) {
            value = reference.valuesByMode[mode.modeId];
          }
        }

        if(isRGBA(value)) {
          value = {
            r:  Math.floor(value.r * 255),
            g: Math.floor(value.g * 255),
            b: Math.floor(value.b * 255),
            a: value.a,
          };
        }

        return {
          modeName: mode.name,
          value: value,
        } as ModeValue;
      }),
    }

    tokens.push(token);
});

return tokens;
}

export function getVariables(): Array<VariableToken> {
  const collections = figma.variables.getLocalVariableCollections();
  const variables: Array<VariableToken> = [];

  collections.forEach((collection) => {
    variables.push(...processCollection(collection));
  });

  return variables;
}