import {
  AppState,
  Collection,
  ColorFormatType,
  TokenType,
  VariableToken,
  VariableValue,
} from "./models";

function _convertedValue(
  format: ColorFormatType,
  type: TokenType,
  value: any
): any {
  if (type == TokenType.Color && format == ColorFormatType.Hex) {
    // convert r, g, b, a to hex
    console.log(value);

    let hex = (
      value.r.toString(16).padStart(2, "0") +
      value.g.toString(16).padStart(2, "0") +
      value.b.toString(16).padStart(2, "0")
    ).toUpperCase();

    let alpha = Math.round(value.a * 255)
      .toString(16)
      .padStart(2, "0")
      .toUpperCase();

    return "#" + hex + (alpha == "FF" ? "" : alpha);
  }

  return value;
}

export function jsonFromState(state: AppState): string {
  let skipPrivate = state.settings.excludePrivate;
  let colorFormat = state.settings.colorFormat;

  console.log(colorFormat);

  let output = new Array<Collection>();
  let variables = state.variables;

  for (let variableProxy of variables) {
    let variable = VariableToken.fromObject(variableProxy);
    let collection = output.find((c) => c.name == variable.collection);

    if (skipPrivate && variable.isPrivate()) continue;

    if (collection == undefined) {
      collection = {
        name: variable.collection,
        modes: [],
      } as Collection;

      output.push(collection);
    }

    for (let value of variable.values) {
      let mode = collection?.modes.find((m) => m.name == value.modeName);

      let tokenValue = {
        name: variable.name,
        type: variable.type,
        isAlias: value.isAlias,
        value: value.isAlias
          ? value.value
          : _convertedValue(colorFormat, variable.type, value.value),
      } as VariableValue;

      if (mode != undefined) {
        mode.variables.push(tokenValue);
      } else {
        collection?.modes.push({
          name: value.modeName,
          variables: [tokenValue],
        });
      }
    }
  }

  return JSON.stringify(
    {
      version: state.version,
      metadata: {},
      collections: output,
    },
    null,
    2
  );
}
