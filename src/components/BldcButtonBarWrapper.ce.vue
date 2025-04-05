<template>
    <BldcButtonbar
        :disable-padding="true">
        <BldcButton
            v-if="currentPage > 1"
            slot="right"
            elem-title="Vorige"
            type="secondary"
            @click="emit('prevClick')"
        ></BldcButton>
        <BldcButton
            v-if="currentPage < steps"
            slot="right"
            elem-title="Volgende"
            type="primary"
            @click="emit('nextClick')"
        ></BldcButton>
        <BldcButton
            v-if="currentPage === steps"
            slot="right"
            elem-title="Opnieuw starten"
            type="primary"
            @click="startOver"
        ></BldcButton>
    </BldcButtonbar>
</template>

<script lang="ts" setup>
import {BldcButton, BldcButtonbar} from "@belastingdienst/bldc-components-vue3"
import {computed} from "vue";
import {useVariablesStore} from "@/stores/variables";

const emit = defineEmits(['nextClick', 'prevClick', 'reset'])
defineProps<{
    steps: number;
}>()

const store = useVariablesStore();

const currentPage = computed(() => {
    return store.getVariableValue("currentPage");
});

function startOver() {
    store.resetVariables();
    emit("reset");
}

</script>

<style lang="scss" scoped></style>