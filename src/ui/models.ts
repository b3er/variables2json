
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

export interface ModeValue {
    modeName: string;
    value: any;
}

export interface VariableToken {
    collection: string;
    name: string;
    type: TokenType,
    values: Array<ModeValue>;
}

export interface VariableGroup {
    type: TokenType,
    tokens: Array<VariableToken> | undefined;
  }
  

export interface AppState {
    version: string;
    loaded: boolean;
    variables: Array<VariableToken>;
}

export interface VariableValue {
    name: string;
    type: TokenType
    value: any;
  }
  
export  interface CollectionMode {
  name: string;
  variables: Array<VariableValue>;
}

export interface Collection {
  name: string;
  modes: Array<CollectionMode>;
}
  
