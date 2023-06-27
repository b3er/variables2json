import { AppState, Collection, VariableValue } from "./models";


export function jsonFromState(state: AppState): string {
    let output = new Array<Collection>();
    let variables = state.variables;

    for (let variable of variables) {
        let collection = output.find(c => c.name == variable.collection);

        if (collection == undefined) {
            collection = {
                name: variable.collection,
                modes: []
            } as Collection;

            output.push(collection);
        }

        for (let value of variable.values) {
            let mode = collection?.modes.find(m => m.name == value.modeName);

            let tokenValue = {
                name: variable.name,
                type: variable.type,
                isAlias: value.isAlias,
                value: value.value,
            } as VariableValue;

            if (mode != undefined) {
                mode.variables.push(tokenValue);
            } else {
                collection?.modes.push({
                    name: value.modeName,
                    variables: [tokenValue]
                });
            }
        }
    }

    return JSON.stringify({
        version: state.version,
        metadata: {},
        collections: output
    }, null, 2);
}