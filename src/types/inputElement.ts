import type { Components } from '@belastingdienst/bldc-components/dist/types/components';

type ComponentMap = {
    BldcInput: Components.BldcInput;
    BldcButton: Components.BldcButton;
    BldcSpinner: Components.BldcSpinner;
    BldcFieldset: Components.BldcFieldset;
    // ... add all other components manually or generate this map
};

type Formula = string;

export interface ExtraProps {
    model?: string;
    helpText?: string;
    elementLabel?: string;
    visible: boolean | Formula;
    clickAction?: Formula;
}

type ExtendedComponentMap = {
    [K in keyof ComponentMap]: ComponentMap[K] & ExtraProps;
};

export type Element =
    {
        [K in keyof ExtendedComponentMap]: {
        type: K;
        id: string;
        elements?: Element[];
        properties: ExtendedComponentMap[K];
    }
    }[keyof ExtendedComponentMap];
