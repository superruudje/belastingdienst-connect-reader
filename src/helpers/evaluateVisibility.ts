import {useVariablesStore} from "@/stores/variables";

export const evaluateVisibility = (visibleProperty: string | boolean): boolean => {
    const store = useVariablesStore();

    const visible = visibleProperty;
    let isVisible = true;

    if (typeof visible === 'boolean') {
        isVisible = visible;
    } else if (typeof visible === 'string') {
        try {
            isVisible = new Function('store', `with(store.variables) { return ${visible} }`)(store);
        } catch (error) {
            console.warn('Invalid visibility formula:', visible, error);
            isVisible = false;
        }
    }

    return isVisible;
};