import {useVariablesStore} from "@/stores/variables";

export function evaluateClickHandler(clickAction: string): void {
    const store = useVariablesStore()
    const expression = clickAction

    if (typeof expression === 'string') {
        try {
            new Function('store', `with(store.variables) { ${expression} }`)(store)
        } catch (err) {
            console.error('Error executing clickAction function:', err)
        }
    }
}