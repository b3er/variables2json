import { createStore, useStore as baseUseStore } from "vuex";
import { Store } from "vuex/types/index.js";
import { SettingsData, AppState, ColorFormatType } from "./models";
import { InjectionKey } from "vue";

export const key: InjectionKey<Store<AppState>> = Symbol();

export function useStore(): Store<AppState> {
  return baseUseStore(key) as Store<AppState>;
}

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
        servers: [],
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
