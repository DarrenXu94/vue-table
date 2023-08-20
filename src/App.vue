<template>
  <VueTable :fields="fields" :items="items">
    <template #cell(surname)="{ data }"> {{ data }} is my surname </template>
  </VueTable>
</template>

<script setup lang="ts">
import VueTable from "./components/VueTable.vue";

const items = [
  {
    firstname: "Steve",
    surname: "Job",
  },
  {
    firstname: "Michael",
    surname: "Smith",
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
];
</script>

<style></style>
