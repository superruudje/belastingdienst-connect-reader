import type {Store} from "@/types/checkerConfig";

export function interpolateProperties(input: string, storeData: Store): string {
    return input.replace(/\{store\.([\w\d_]+)\}/g, (_, varName) => {
        const variable = storeData[varName];
        return variable?.value != null ? String(variable.value) : '';
    });
}