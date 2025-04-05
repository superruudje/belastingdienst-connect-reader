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

<script lang="ts">
import {defineComponent, onBeforeMount, ref, ShallowRef} from "vue";
import FormCheckerCe from "@/components/FormChecker.ce.vue";
import {useVariablesStore} from "@/stores/variables";
import {CheckerConfig} from "@/types/checkerConfig";

export default defineComponent({
    components: {FormChecker: FormCheckerCe},
    props: {
        checkerUrl: {type: String},
        checkerJson: {type: String}
    },
    setup(props) {
        const checkerUrlVal = props.checkerUrl;

        const store = useVariablesStore();
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

        return {
            checkerConfig,
            store,
        }
    }
})
</script>

<style scoped></style>