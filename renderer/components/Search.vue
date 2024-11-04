<script setup>
import { defineProps, reactive, toRef } from "vue";

const props = defineProps({
    startSearchHandler: Object,
    isEnabled: Boolean
});

const startSearchHandler = props.startSearchHandler;
const isEnabled = toRef(props, "isEnabled");

const state = reactive({
    inputValue: "",
    isSortNeeded: true,
    paramNameForSort: "time",
    sortDirectionString: "bToA"
});


</script>

<template>
    <div class="input-cont d-flex align-items-center flex-column">
        <div class="d-flex align-items-start flex-column">
            <div class="input-group">
                <input v-bind:disabled="isEnabled" type="text" v-model="state.inputValue" class="form-control"
                    placeholder="Запрос">

                <div class="input-group-append">
                    <button v-bind:disabled="isEnabled" v-on:click="startSearchHandler(state.inputValue, state.isSortNeeded, state.paramNameForSort, state.sortDirectionString)"
                        class="btn btn-secondary" type="button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-search" width="24"
                            height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none"
                            stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0" />
                            <path d="M21 21l-6 -6" />
                        </svg>
                    </button>
                </div>
            </div>
            <div class="form-check" style="user-select: none;">
                <label for="sortCheckbox" class="form-check-label">Сортировка результатов</label>
                <input id="sortCheckbox" type="checkbox" v-bind:disabled="isEnabled" v-model="state.isSortNeeded"
                    class="form-check-input" />
            </div>
            <p v-if="state.isSortNeeded">Свойство для сортировки:</p>
            <select v-if="state.isSortNeeded" v-bind:disabled="isEnabled" class="form-select" v-model="state.paramNameForSort">
                <option value="time">Дата</option>
                <option value="size">Размер текста</option>
                <option value="images">Количество изображений</option>
                <option value="videos">Количество видео</option>
            </select>
            <p v-if="state.isSortNeeded">Порядок:</p>
            <select v-if="state.isSortNeeded" v-bind:disabled="isEnabled" class="form-select" v-model="state.sortDirectionString">
                <option value="bToA">По уменьшению</option>
                <option value="aToB">По возрастанию</option>
            </select>
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

/*
.input-cont>div {
    width: 60vw !important;
}
*/
.input-cont>div>* {
    width: 60vw !important;
    margin-bottom: 0.2em !important;
}

/*
.input-cont>div>*>* {
    width: 60vw !important;
}
*/
</style>