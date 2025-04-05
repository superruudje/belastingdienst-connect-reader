<template>
    <div>
        <BldcTaskStepWrapperCe
            ref="taskStepper"
            style="margin-bottom: 1rem"
            v-if="formSteps > 1"
            :steps="steps"/>
        <BldcFormWrapperCe
            ref="formWrappers"
            v-for="form in visibleForms"
            :key="form.id"
            :form="form"/>
        <BldcButtonBarWrapperCe
            v-if="formSteps > 1"
            :steps="formSteps"
            @next-click="next"
            @prev-click="previous"
            @reset="reset"/>
    </div>
</template>

<script lang="ts" setup>
import BldcTaskStepWrapperCe from "@/components/BldcTaskStepWrapper.ce.vue";
import BldcFormWrapperCe from "@/components/BldcFormWrapper.ce.vue";
import BldcButtonBarWrapperCe from "@/components/BldcButtonBarWrapper.ce.vue";
import {CheckerConfig} from "@/types/checkerConfig";
import {useVariablesStore} from "@/stores/variables";
import {computed, ref} from "vue";
import {evaluateVisibility} from "@/helpers/evaluateVisibility";

const props = defineProps<{
    checkerConfig: CheckerConfig
}>();

const store = useVariablesStore();
const formWrappers = ref<(typeof BldcFormWrapperCe)[]>([])
const taskStepper = ref<(typeof BldcTaskStepWrapperCe | null)>(null)

const visibleForms = computed(() => {
    return props.checkerConfig.forms.filter(form => {
        return evaluateVisibility(form.visible); // Show the element if visible is true or truthy
    }) || [];
})

const formSteps = computed(() => {
    return props.checkerConfig.forms.length;
})

const steps = computed(() => {
    return props.checkerConfig.forms.map(form => {
        return { icon: form.icon || '', label: form.title, completed: false };
    });
})

/**
 * Validate current form and navigate to next if successful.
 */
async function next() {
    store.variables['formValid'].value = true;

    await validate(true);

    if (store.variables['formValid'].value !== false)
        store.variables['currentPage'].value++
}

/**
 * Navigate to previous form.
 */
function previous() {
    store.variables['currentPage'].value--
}

function reset() {
    taskStepper.value?.reset();
}

/**
 * Validate all current visible forms.
 * @param saveValues
 */
async function validate(saveValues = false) {
    for (let i = 0; i < formWrappers.value.length; i++) {
        await formWrappers.value[i].validate(saveValues);
    }
}

</script>

<style scoped></style>