
export enum IconType {
    Expand = `expand`,
    Collapse = `collapse`,
    Json = `json`,
    List = `list`,
    CaretRight = `caret-right`,
    CaretDown = `caret-down`,
}

export enum TokenType {
    Color = `color`,
    Number = `number`,
    String = `string`,
    Boolean = `boolean`,
    Typography = `typography`,
    Effect = `effect`,
}

export interface ModeValue {
    modeName: string;
    value: string;
}

export interface VariableToken {
    collection: string;
    name: string;
    type: TokenType,
    values: Array<ModeValue>;
}

export interface VariableGroup {
    name: string;
    collapsed: boolean;
    comingSoon: boolean;
    tokens: Array<VariableToken> | undefined;
  }
  