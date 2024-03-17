<script setup>
import { inject, watchEffect, defineProps } from 'vue';

//let resultsList = inject("resultsList");

const props = defineProps({
  resultsList: Object,
});

const resultsList = props.resultsList;

function onOpenLink(url) {
  shell.openExternal(url);
}


</script>

<template>
  <div v-for="i in resultsList" class="card result-card" :key="i.key">
    <div class="card-body">
      <h4 class="card-title">{{ i.name }}</h4>
      <h6 class="text-muted card-subtitle mb-2">{{ i.author + " - " + i.time }}</h6>
      <p class="card-text">{{ i.desc }}</p>
      
      <p class="feature" v-if="parseInt(i.images) > 0" style="color: red">Есть изображения: {{ i.images }} шт.</p>
      <p class="feature" v-if="parseInt(i.videos) > 0" style="color: red">Есть видео: {{ i.videos }} шт.</p>
      <p class="feature" v-if="parseInt(i.emails) > 0" style="color: red">Есть электронные почты</p>
      <p class="feature" v-if="parseInt(i.links) > 0" style="color: red">Есть ссылки</p>


      <a class="card-link" v-bind:href="i.url" v-on:click.prevent="onOpenLink(i.url)">{{ i.url + " " }}</a>
    </div>
  </div>
</template>

<style scoped>
.result-card {
  margin-top: 1em;
  width: 50%;
  left: 25%;
}
.result-card:last-of-type {
  margin-bottom: 1em;
}

.feature {
  margin-bottom: 0 !important;
}

.feature:last-of-type {
  margin-bottom: 0.8em !important;
}


</style>
