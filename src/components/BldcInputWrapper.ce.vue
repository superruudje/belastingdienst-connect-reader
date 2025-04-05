<template>
    <BldcInput
        ref="boldElement"
        v-bind="bldcInputProperties"
        :bldc-value="modelValue">
            <span v-if="bldcInputProperties.helpButton" slot="help-text">
                <BldcParagraph
                    :disable-margin="true"
                    :size="'s'">
                    {{ bldcInputProperties.helpText }}
                </BldcParagraph>
            </span>
        <span slot="label">{{ interpolatedLabel }}</span>
    </BldcInput>
</template>

<script lang="ts" setup>
import {type ComponentPublicInstance, computed, onMounted, onUnmounted, ref} from "vue";
import {BldcInput, BldcParagraph} from "@belastingdienst/bldc-components-vue3/dist/components";
import type {Element, ExtraProps} from "@/types/inputElement";
import type {Components} from "@belastingdienst/bldc-components/dist/types/components";
import {type MaybeRefOrGetter, useEventListener} from "@vueuse/core";
import {interpolateProperties} from "@/helpers/interpoleProperties";
import {useVariablesStore} from "@/stores/variables";

const props = defineProps<{
    element: Element
}>();

const store = useVariablesStore();
const boldElement = ref<ComponentPublicInstance | null>(null);

// Get the store variable that corresponds to the model reference
const modelValue = computed({
    get() {
        const model = props.element.properties.model;
        return model && store.variables[model] ? store.variables[model].value : null;
    },
    set(value: any) {
        const model = props.element.properties.model;
        if (model && store.variables[model]) {
            // Update store variable value if model exists
            store.variables[model].value = value;
        }
    }
});

const bldcInputProperties = computed(() => {
    return props.element.properties as (Components.BldcInput & ExtraProps);
})

const interpolatedLabel = computed(() => {
    const rawLabel = props.element.properties.elementLabel || '';
    return interpolateProperties(rawLabel, store.variables);
});

/**************************** Event listeners ********************************/

useEventListener(boldElement as MaybeRefOrGetter, 'bldcValueChange', (e: { detail: any }) => {
    const model = props.element.properties.model;
    const newValue = e.detail.bldcValue ? e.detail.bldcValue : e.detail;
    if (model && store.variables[model]) {
        store.variables[model].value = newValue;
    }
})

useEventListener(boldElement as MaybeRefOrGetter, 'bldcValidate', (e: {detail: any}) => {
    if (e.detail.valid === false) {
        store.variables['formValid'].value = false
    }
})

/**************************** Validation ********************************/

/**
 * Force validation of the input element.
 * @param lock
 */
function validate(lock = false) {
    const nativeElement = boldElement.value?.$el as HTMLBldcInputElement;
    nativeElement?.doValidate?.();
    if (lock) lockValue();
}

/**
 * Lock the variable value in the store. This makes it possible the use
 * the value in other forms.
 */
function lockValue() {
    const model = props.element.properties.model;
    if (model && store.variables[model]) {
        store.variables[model].locked = true;
    }
}

defineExpose({
    validate
})

/**************************** Mounting ********************************/

onMounted(() => {
    const model = props.element.properties.model;
    if (model && store.variables[model]) {
        store.variables[model].unmounted = false;
    }
});

onUnmounted(() => {
    const model = props.element.properties.model;
    if (model && store.variables[model]) {
        store.variables[model].unmounted = true;
    }
})

</script>

<style lang="scss" scoped></style>