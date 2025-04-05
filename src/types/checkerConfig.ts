import type {Element} from "./inputElement.ts";

export interface CheckerConfig {
    type: string;
    store: Store;
    forms: Form[];
}

export type Variable = {
    type: string; // or more specific types depending on your use case, like 'number', 'string', etc.
    value: any,
    default?: any; // default value can be of any type
    decimals?: number; // optional property for decimals, typically a number
    rounding?: 'up' | 'down' | 'nearest'; // optional property for rounding method
    unmounted?: boolean; // set true when conditionally unmounted
    locked?: boolean; // set true when moving to the next step
};

export type Store = {
    [key: string]: Variable;
}

export type Form = {
    id: string;
    title: string;
    icon?: string;
    visible: boolean | string;
    fieldsets: Element[];
}