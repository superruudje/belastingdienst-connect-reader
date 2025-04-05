<template>
    <BldcButton
        ref="boldElement"
        v-bind="bldcInputProperties"
        @click="handleClick">
    </BldcButton>
</template>

<script lang="ts" setup>
import { BldcButton } from "@belastingdienst/bldc-components-vue3";
import type {Element, ExtraProps} from "../types/inputElement.ts";
import {computed} from "vue";
import type {Components} from "@belastingdienst/bldc-components/dist/types/components";

const emit = defineEmits(['validate'])
const props = defineProps<{
    element: Element
}>();


const bldcInputProperties = computed(() => {
    return props.element.properties as (Components.BldcButton & ExtraProps);
})

function handleClick() {
    emit("validate", props.element.properties.clickAction);
}

</script>

<style lang="scss" scoped></style>