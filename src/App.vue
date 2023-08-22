<template>
  <VueTable :fields="fields" :items="items">
    <template #cell(website)="{ item }">
      <a :href="item.website">{{ item.firstname }} {{ item.surname }}</a>
    </template>
  </VueTable>
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
];
</script>

<style></style>
