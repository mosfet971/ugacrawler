<script setup>
import { defineProps, reactive, toRef } from "vue";

const props = defineProps({
    startSearchHandler: Object,
    isEnabled: Boolean
});

const startSearchHandler = props.startSearchHandler;
const isEnabled = toRef(props, "isEnabled");

const state = reactive({
    inputValue: ""
});


</script>

<template>
    <div>
    <div class="input-group">
        <input v-bind:disabled="isEnabled" type="text" v-model="state.inputValue" class="form-control"
            placeholder="Запрос">
        <div class="input-group-append">
            <button v-bind:disabled="isEnabled" v-on:click="startSearchHandler(state.inputValue)" class="btn btn-secondary" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" /><path d="M21 21l-6 -6" /></svg>
            </button>
        </div>
    </div>
</div>
</template>

<style scoped>
.has-search .form-control {
  padding-left: 2.375rem;
}

button {
    border-radius: unset !important;
}

.input-group {
    width: 50%;
    transform: translateX(50%);
}

</style>