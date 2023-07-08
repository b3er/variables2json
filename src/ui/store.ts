import { createStore, Store } from "vuex";
import { SettingsData, AppState, ColorFormatType } from "./models";

export function pluginStore(): Store<AppState> {
  return createStore({
    state() {
      return {
        version: "0.0.1",
        loaded: false,
        variables: [],
        settings: {
          excludePrivate: false,
          colorFormat: "hex",
        } as SettingsData,
      } as AppState;
    },
    mutations: {
      update(state: AppState, data: AppState) {
        state.version = data.version;
        state.loaded = data.loaded;
        state.variables = data.variables;
        state.settings = data.settings;
      },
      settingsTogglePrivate(state: AppState, newValue: boolean) {
        state.settings = {
          ...state.settings,
          excludePrivate: newValue,
        };
      },
      settingsSetColorFormat(state: AppState, newValue: ColorFormatType) {
        state.settings = {
          ...state.settings,
          colorFormat: newValue,
        };
      },
    },
  });
}
