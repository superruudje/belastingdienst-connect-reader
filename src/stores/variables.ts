import {defineStore} from 'pinia';
import type {Store} from "@/types/checkerConfig";

export type State = {
    variables: Store;
};

export const useVariablesStore = defineStore('variables', {
    state: (): State => ({
        variables: {},
    }),

    getters: {
        getVariableValue: (state) => (key: string) => {
            return state.variables[key]?.value ?? null;
        },
    },

    actions: {
        // This will be used to load and create variables dynamically
        loadVariables(variables: Store) {
            const initializedVariables: Store = {};

            // Initialize variables with value as null or default value
            for (const key in variables) {
                const variable = variables[key];
                initializedVariables[key] = {
                    ...variable,
                    value: variable.default !== undefined ? variable.default : null,
                };
            }

            this.variables = initializedVariables;
        },

        resetVariables() {
            for (const key in this.variables) {
                this.variables[key].value = this.variables[key].default ?? null;
            }
        },
    },
});