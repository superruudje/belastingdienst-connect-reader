<template>
    <div
        :class="{'d-inline-block' : checkerConfig?.type === 'text'}"
        class="bdc-wrapper d-inline-block w-100">
        <FormChecker
            v-if="checkerConfig?.type === 'form'"
            :checker-config="checkerConfig"/>

        <pre><code>{{ store.variables }}</code></pre>
    </div>
</template>

<script setup lang="ts">
import {onBeforeMount, ref, inject, type ShallowRef} from "vue";
import type { CheckerConfig } from "@/types/checkerConfig";
import {useStore} from "../stores/store.ts";
import FormChecker from "./FormChecker.vue";

const props = defineProps<{
    checkerUrl?: string
    checkerJson?: string
}>();

const checkerUrlInject = inject("checkerUrl") as string;
const checkerUrlVal = checkerUrlInject ?? props.checkerUrl;

const store = useStore();
const checkerConfig: ShallowRef<CheckerConfig | null> = ref(null);

/**
 * Prepare the configuration for the checker to be rendered.
 * Called before component is mounted.
 */
function prepareChecker() {
    if (checkerUrlVal) fetchCheckerFromUrl(checkerUrlVal);
    else if (props.checkerJson) parseCheckerFromJsonString(props.checkerJson);
    else {
        console.error("[BelastingdienstConnectReader] Error preparing checker: No checker defined.");
    }
}

/**
 * Fetch the configuration file from the internet.
 * @param url The url to the configuration file
 */
async function fetchCheckerFromUrl(url: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        checkerConfig.value = await response.json() as CheckerConfig;
        console.log(checkerConfig.value);
        store.loadVariables(checkerConfig.value?.store);
    } catch (error) {
        console.error("[BelastingdienstConnectReader]  Error fetching JSON: ", error);
        checkerConfig.value = null;
    }
}

/**
 * Parse the jsonString to an JSON object.
 * @param jsonString String representing a checker configuration object.
 */
function parseCheckerFromJsonString(jsonString: string) {
    try {
        checkerConfig.value = JSON.parse(jsonString) as CheckerConfig;
        store.loadVariables(checkerConfig.value?.store);
    } catch (error) {
        console.error(`[BelastingdienstConnectReader] Error: ${error}`);
    }
}

onBeforeMount(() => prepareChecker());
</script>

<style scoped lang="scss"></style>