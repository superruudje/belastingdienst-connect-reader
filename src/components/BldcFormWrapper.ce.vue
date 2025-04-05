<template>
    <div>
        <BldcForm>
            <BldcHeading
                v-if="form.title"
                :level="2">
                {{ form.title }}
            </BldcHeading>
            <BldcFieldsetWrapperCe
                v-for="fieldset in visibleElements"
                ref="fieldsetWrappers"
                :fieldset="fieldset">
            </BldcFieldsetWrapperCe>
        </BldcForm>
    </div>
</template>

<script lang="ts" setup>
import {computed, ref} from "vue";
import BldcFieldsetWrapperCe from "./BldcFieldsetWrapper.ce.vue";
import type {Form} from "@/types/checkerConfig";
import {BldcForm, BldcHeading} from "@belastingdienst/bldc-components-vue3"
import {evaluateVisibility} from "@/helpers/evaluateVisibility";

const props = defineProps<{
    form: Form
}>();

const fieldsetWrappers = ref<(typeof BldcFieldsetWrapperCe)[]>([])

const visibleElements = computed(() => {
    return props.form.fieldsets.filter(fieldset => {
        return evaluateVisibility(fieldset.properties.visible); // Show the element if visible is true or truthy
    }) || [];
})

/**
 * Validate all current visible fieldset containers.
 * @param saveValues
 */
async function validate(saveValues = false) {
    for (let i = 0; i < fieldsetWrappers.value.length; i++) {
        await fieldsetWrappers.value[i].validate(saveValues)
    }
}

defineExpose({validate})

</script>

<style lang="scss" scoped></style>