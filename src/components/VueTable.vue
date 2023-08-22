<template>
  <table>
    <tr>
      <th v-for="heading of fields">
        <slot
          :name="`header(${heading.key})`"
          v-bind:data="heading"
          v-bind:header="heading.key"
        >
          {{ heading.value }}
        </slot>
      </th>
    </tr>
    <tr v-for="item of items">
      <td v-for="heading of fields">
        <slot
          :name="`cell(${heading.key})`"
          v-bind:data="item[heading.key]"
          v-bind:item="item"
        >
          {{ item[heading.key] }}
        </slot>
      </td>
    </tr>
    <slot name="tfooter"> </slot>
  </table>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { onMounted, ref } from "vue";
import { VueTableProps } from "./VueTable.types";

const { fields, items } = defineProps<VueTableProps<T>>();

onMounted(() => {
  initRovingTabIndex();
});

const initRovingTabIndex = () => {
  // Get all focusable elements
  // Save in 2d array
  // Remove tabindex from all
  // Apply tabindex to first element
  // Add keyhandler to first element
};

const keyHandler = () => {
  // Handle up down left right arrow keys
  // Check key
  // Check if first or last of row or column
  // Remove keyhandler from current element
  // Apply keyhandler to new element
};
</script>

<style scoped>
/* Apply some basic styling to the entire table */
table {
  --highlight-background: #f2f2f2;
  --border-color: #ccc;
  font-family: Arial, sans-serif;

  border-collapse: collapse;
  width: 100%;
  border: 1px solid var(--border-color);
}

/* Style the table header */
th {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid var(--border-color);
}

/* Style the table rows */
tr:nth-child(even) {
  background-color: var(--highlight-background);
}

/* Style table cell content */
td {
  padding: 8px;
  border-bottom: 1px solid var(--border-color);
}
</style>
