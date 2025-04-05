<template>
    <fieldset style="width: 100%">
        <template v-for="element in visibleElements">
            <BldcInputWrapperCe
                v-if="element.type === 'BldcInput'"
                :key="element.id"
                ref="inputWrappers" :element="element"/>
            <BldcButtonWrapperCe
                v-if="element.type === 'BldcButton'"
                :element="element"
                @validate="validateFieldset"
            />
        </template>
    </fieldset>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import {evaluateVisibility} from "@/helpers/evaluateVisibility";
import BldcInputWrapperCe from "./BldcInputWrapper.ce.vue";
import BldcButtonWrapperCe from "./BldcButtonWrapper.ce.vue";
import type {Element} from "@/types/inputElement";
import {evaluateClickHandler} from "@/helpers/evaluateClickHandler";
import {useVariablesStore} from "@/stores/variables";

const props = defineProps<{
    fieldset: Element
}>();

const store = useVariablesStore();
const inputWrappers = ref<(typeof BldcInputWrapperCe)[]>([])

const visibleElements = computed(() => {
    return props.fieldset.elements ? props.fieldset.elements.filter(element => {
        return evaluateVisibility(element.properties.visible); // Show the element if visible is true or truthy
    }) : [];
})

async function validateFieldset(clickAction: string) {
    store.variables['formValid'].value = true;

    for (let i = 0; i < inputWrappers.value.length; i++) {
        await inputWrappers.value[i].validate();
    }

    if (store.variables['formValid'].value)
        evaluateClickHandler(clickAction)
    else
        console.error("[BelastingdienstConnectReader] Error: Form invalid.")
}

async function validate(saveValues = false) {
    for (let i = 0; i < inputWrappers.value.length; i++) {
        await inputWrappers.value[i].validate(saveValues)
    }
}

defineExpose({validate})
</script>

<style lang="css" scoped>
fieldset {
    all: unset;
}
</style>