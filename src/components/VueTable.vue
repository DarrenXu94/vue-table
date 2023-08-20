<template>
  <table>
    <tr>
      <th v-for="heading of fields">
        {{ heading.value }}
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
  </table>
</template>

<script setup lang="ts" generic="T extends Record<string, any>">
import { ref } from "vue";
import { VueTableProps } from "./VueTable.types";

const { fields, items } = defineProps<VueTableProps<T>>();
</script>

<style scoped></style>
