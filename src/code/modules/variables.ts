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

function parseColor(value: any) {
  if (isRGBA(value) || isRGB(value)) {
    let a = 1;
    if (isRGBA(value)) {
      a = Number(value.a.toFixed(2));
    }

    value = {
      r: Math.floor(value.r * 255),
      g: Math.floor(value.g * 255),
      b: Math.floor(value.b * 255),
      a: a,
    };
  }

  return value;
}

function parseValue(modeId: string, value: any) {

  if (isVariableAlias(value)) {
    let reference = figma.variables.getVariableById(value.id);
    if (reference != undefined) {
      value = reference.valuesByMode[modeId];
    }
  }

  if (isRGBA(value) || isRGB(value)) {
    return parseColor(value);
  }

  if(isGridStyle(value)) {
    return {
      layoutGrids: value.layoutGrids.map((grid) => {
        if (isRowsColsLayoutGrid(grid)) {
          return {
            pattern: grid.pattern,
            sectionSize: grid.sectionSize,
            color: parseColor(grid.color),
            alignment: grid.alignment,
            gutterSize: grid.gutterSize,
            offset: grid.offset,
            count: grid.count,
          };
        } else {
          return {
            pattern: grid.pattern,
            sectionSize: grid.sectionSize,
            color: parseColor(grid.color),
          };
        }
      }),
    }
  }
  
  if (isTextStyle(value)) {
    return {
      fontSize: value.fontSize,
      fontFamily: value.fontName.family,
      fontWeight: value.fontName.style,
      lineHeight: value.lineHeight.unit == "AUTO" ? 'auto' : value.lineHeight.value,
      lineHeightUnit: value.lineHeight.unit,
      letterSpacing: value.letterSpacing.value,
      letterSpacingUnit: value.letterSpacing.unit,
      textCase: value.textCase,
      textDecoration: value.textDecoration,
    }
  }

  if (isEffectStyle(value)) {
    return {
      effects: value.effects.map((effect) => {
        if (isDropShadowEffect(effect) || isInnerShadowEffect(effect)) {
          return {
            type: effect.type,
            color: parseColor(effect.color),
            offset: effect.offset,
            radius: effect.radius,
            spread: effect.spread,
          };
        } else {
          return {
            type: effect.type,
            radius: effect.radius,
          };
        }
      }),
    }
  }

  return value;
}

function isTextStyle(value: any): value is TextStyle {
  return (value as TextStyle).type === "TEXT";
}

function isEffectStyle(value: any): value is EffectStyle {
  return (value as EffectStyle).type === "EFFECT";
}

function isGridStyle(value: any): value is GridStyle {
  return (value as GridStyle).type === "GRID";
}

function isRowsColsLayoutGrid(value: LayoutGrid): value is RowsColsLayoutGrid {
  return (value as RowsColsLayoutGrid).pattern === "ROWS" || (value as RowsColsLayoutGrid).pattern === "COLUMNS";
}

function isDropShadowEffect(value: any): value is DropShadowEffect {
  return (value as DropShadowEffect).type === "DROP_SHADOW";
}

function isInnerShadowEffect(value: any): value is InnerShadowEffect {
  return (value as InnerShadowEffect).type === "INNER_SHADOW";
}


function processCollection(collection: VariableCollection): Array<VariableToken> {
  const variableIds = collection.variableIds;
  const modes = collection.modes;

  let tokens = [] as Array<VariableToken>;

  variableIds.forEach((variableId) => {

    const variable: Variable | null = figma.variables.getVariableById(variableId);

    if (!variable) return;

    let type: TokenType;
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

        return {
          modeName: mode.name,
          value: parseValue(mode.modeId, value),
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

  const textStyles = figma.getLocalTextStyles();
  textStyles.forEach((style) => {
    variables.push({
      collection: "Typography",
      name: style.name,
      type: TokenType.Typography,
      values: [{
        modeName: "Style",
        value: parseValue("Style", style)
      }],
    });
  });

  const effectStyles = figma.getLocalEffectStyles();
  effectStyles.forEach((style) => {
    variables.push({
      collection: "Effects",
      name: style.name,
      type: TokenType.Effect,
      values: [{
        modeName: "Style",
        value: parseValue("Style", style),
      }],
    });
  });

  const gridStyles  = figma.getLocalGridStyles();
  gridStyles.forEach((style) => {
    variables.push({
      collection: "Grids",
      name: style.name,
      type: TokenType.Grid,
      values: [{
        modeName: "Style",
        value: parseValue("Style", style),
      }],
    });
  });

  return variables;
}