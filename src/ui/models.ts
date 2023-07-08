export enum IconType {
  Expand = `expand`,
  Collapse = `collapse`,
  Json = `json`,
  List = `list`,
  CaretRight = `caret-right`,
  CaretDown = `caret-down`,
  Text = `text`,
  Check = `check`,
  Uncheck = `uncheck`,
  Download = `download`,
  Github = `github`,
  CornerResize = `corner-resize`,
  ArrowDown = `arrow-down`,
}

export enum TokenType {
  Color = `color`,
  Number = `number`,
  String = `string`,
  Boolean = `boolean`,
  Typography = `typography`,
  Effect = `effect`,
  Grid = `grid`,
}

export enum ColorFormatType {
  Hex = `hex`,
  Rgba = `rgba`,
}

export interface ModeValue {
  modeName: string;
  isAlias: boolean;
  value: any;
}

export class VariableToken {
  static fromObject(variableProxy: any): VariableToken {
    return new VariableToken(
      variableProxy.collection,
      variableProxy.name,
      variableProxy.type,
      variableProxy.values
    );
  }

  constructor(
    public collection: string,
    public name: string,
    public type: TokenType,
    public values: Array<ModeValue>
  ) {
    this.collection = collection;
    this.name = name;
    this.type = type;
    this.values = values;
  }

  isPrivate(): boolean {
    // Make array of values to check
    let values = [...this.name.split("/"), this.collection];

    // return true if any value starts with an underscore
    return values.some((value) => value.startsWith("_"));
  }
}

export interface VariableGroup {
  type: TokenType;
  tokens: Array<VariableToken> | undefined;
}

export interface AppState {
  version: string;
  loaded: boolean;
  variables: Array<VariableToken>;
  settings: SettingsData;
}

export interface VariableValue {
  name: string;
  type: TokenType;
  value: any;
}

export interface CollectionMode {
  name: string;
  variables: Array<VariableValue>;
}

export interface Collection {
  name: string;
  modes: Array<CollectionMode>;
}

export interface ResizeOptions {
  w: number;
  h: number;
}

export interface SettingsData {
  excludePrivate: boolean;
  colorFormat: ColorFormatType;
}
