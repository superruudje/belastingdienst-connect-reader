<template>
    <div>
        <BldcTaskStepIndicator
            :key="stepIndicatorKey"
            :current="currentPage"
            :steps="mappedSteps">
        </BldcTaskStepIndicator>
    </div>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import {BldcTaskStepIndicator} from "@belastingdienst/bldc-components-vue3";
import {useVariablesStore} from "@/stores/variables";

const store = useVariablesStore();
const props = defineProps<{
    steps: { icon: string, label: string, completed: boolean }[]
}>();

const mappedSteps = ref([...props.steps]);

const stepIndicatorKey = ref(0);

const currentPage = computed(() => {
    return store.getVariableValue('currentPage');
});

/**
 * Reset the step indicator.
 */
function reset() {
    mappedSteps.value = props.steps.map((step) => {
        step.completed = false
        return step;
    })
    stepIndicatorKey.value++;
}

defineExpose({reset})

</script>

<style lang="scss" scoped></style>