<script setup>
import { provide, reactive } from "vue";
import Result from "./components/Result.vue"
import { useTelegraphScanner } from "./util/telegraphScanner.js"
import Search from "./components/Search.vue";

let state = reactive({
  isLoading: false
});

const { scanResults, scanTelegraph } = useTelegraphScanner();

//provide("resultsList", scanResults);

async function startScanning(text, isSortNeeded, paramNameForSort, sortDirectionString) {
  state.isLoading = true;
  await scanTelegraph(text, isSortNeeded, paramNameForSort, sortDirectionString);
  state.isLoading = false;
}

</script>
<template>
  <div id="window-head"></div>
  <div class="main">
    <Search id="search" v-bind:startSearchHandler="startScanning" v-bind:isEnabled="state.isLoading" />
    <div class="loading-message" v-if="state.isLoading">
      Идёт поиск...
    </div>
    <div id="result">
      <Result v-bind:resultsList="scanResults.list" />
    </div>
    <div class="loading-message" v-if="state.isLoading">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-loader" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 6l0 -3" /><path d="M16.25 7.75l2.15 -2.15" /><path d="M18 12l3 0" /><path d="M16.25 16.25l2.15 2.15" /><path d="M12 18l0 3" /><path d="M7.75 16.25l-2.15 2.15" /><path d="M6 12l-3 0" /><path d="M7.75 7.75l-2.15 -2.15" /></svg>
    </div>
  </div>
</template>

<style scoped>
button {
  border-radius: unset;
}

.main {
  width: 50%;
  margin-top: 2em;
  position: fixed;
  width: 100vw;
  height: calc(100vh - 2em);
  bottom: 0;
  left: 0;
  overflow: auto;
}

#result {
  width: 100%;
}

#search {
  width: 100%;
  padding-bottom: 2em;
  padding-top: 2em;
  border-bottom: 0.1em rgb(209, 209, 209) solid;
}

.loading-message {
  width: 50%;
  transform: translateX(50%);
  margin: 0.5em;
  font-size: medium;
}

#window-head {
  -webkit-app-region: drag;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 2em;
  border-bottom: 0.1em rgb(209, 209, 209) solid;
}


</style>