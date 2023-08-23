<template>
  <button>test before</button>
  <VueTable :fields="fields" :items="items">
    <template #cell(website)="{ item }">
      <a :href="item.website">{{ item.firstname }} {{ item.surname }}</a>
    </template>
    <template #cell(optionalLink)="{ item }">
      <a v-if="item.optionalLink" :href="item.optionalLink">Optional</a>
      <!-- <a v-if="item.optionalLink" :href="item.optionalLink">Optional 2</a> -->
    </template>
  </VueTable>
  <button>test after</button>
</template>

<script setup lang="ts">
import VueTable from "./components/VueTable.vue";

const items = [
  {
    firstname: "Steve",
    surname: "Job",
    website: "https://www.apple.com/",
  },
  {
    firstname: "Michael",
    surname: "Smith",
    website: "https://www.apple.com/",
    optionalLink: "https://www.apple.com/",
  },
];
const fields = [
  {
    key: "firstname",
    value: "First name",
  },
  {
    key: "surname",
    value: "Last name",
  },
  {
    key: "website",
    value: "Website",
  },
  {
    key: "optionalLink",
    value: "Optional",
  },
];
</script>

<style></style>
