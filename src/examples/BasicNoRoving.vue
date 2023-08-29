<template>
  <table>
    <tr>
      <th v-for="heading of headings">
        {{ heading.value }}
      </th>
    </tr>
    <tr v-for="item of items">
      <td v-for="heading of headings">
        <a v-if="heading.key === 'email'" :href="`mailto:${item[heading.key]}`">
          {{ item[heading.key] }}
        </a>
        <a
          v-else-if="heading.key === 'exampleEmail'"
          :href="`mailto:${item[heading.key]}`"
        >
          {{ item[heading.key] }}
        </a>
        <a v-else-if="heading.key === 'url'" :href="`${item[heading.key]}`">
          {{ item[heading.key] }}
        </a>

        <img
          v-else-if="heading.key === 'avatar'"
          :src="item[heading.key]"
          width="100"
        />
        <p v-else>
          {{ item[heading.key] }}
        </p>
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
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

<style lang="scss" scoped></style>
