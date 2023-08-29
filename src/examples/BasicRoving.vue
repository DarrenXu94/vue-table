<template>
  <VueTable :fields="headings" :items="items">
    <template #cell(email)="{ data }">
      <a :href="`mailto:${data}`">{{ data }}</a>
    </template>
    <template #cell(url)="{ data }">
      <a :href="`${data}`">{{ data }}</a>
    </template>
    <template #cell(exampleEmail)="{ data }">
      <a :href="`mailto:${data}`">{{ data }}</a>
    </template>
    <template #cell(avatar)="{ data }">
      <img :src="data" width="100" />
    </template>
  </VueTable>
</template>

<script setup lang="ts">
import VueTable from "../components/VueTable.vue";
import { computed } from "vue";
import { USERS, fields, USERS_ADVANCED, fieldsAdvanced } from "./data";

const { advanced } = defineProps({
  advanced: Boolean,
});
const headings = computed(() => {
  if (advanced) return fieldsAdvanced;
  return fields;
});

const items = computed(() => {
  if (advanced) return USERS_ADVANCED;
  return USERS;
});
</script>

<style scoped></style>
