<template>
  <table ref="vueTableRef">
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
import { FocusableCell, VueTableProps } from "./VueTable.types";
import {
  create2dArrayOfFocusableElements,
  getAllFocusableElements,
  removeTabIndexFromFocusableElements,
  getFirstNonNullValue,
} from "../utilities/helpers";

const { fields, items } = defineProps<VueTableProps<T>>();

const vueTableRef = ref();

const focusableElements = ref<FocusableCell[][]>([]);

const currentSelection = ref<FocusableCell | null>(null);

onMounted(() => {
  initRovingTabIndex();
});

const removeAllTabIndex = () => {
  const table = vueTableRef.value;

  const focusableElementsFlat = getAllFocusableElements(table);

  // Remove tabindex from all
  removeTabIndexFromFocusableElements(focusableElementsFlat);

  // Remove keydown handler
  focusableElementsFlat.forEach((element) => {
    element.removeEventListener("keydown", applyEventHandler);
  });
};

const initRovingTabIndex = () => {
  const table = vueTableRef.value;

  // Get all focusable elements
  // Save in 2d array
  focusableElements.value = create2dArrayOfFocusableElements(table);
  console.log({ focusableElements });

  // const focusableElementsFlat = getAllFocusableElements(table);
  removeAllTabIndex();
  // // Remove tabindex from all
  // removeTabIndexFromFocusableElements(focusableElementsFlat);

  // Apply tabindex to first element
  // Add keyhandler to first element
  if (focusableElements.value.length) {
    currentSelection.value = getFirstNonNullValue(focusableElements.value);
    keyHandler(currentSelection.value as FocusableCell);
  }
};

const applyEventHandler = (event: KeyboardEvent) => {
  if (!currentSelection.value) {
    return; // No cell selected
  }
  const ArrowKeys = {
    Left: "ArrowLeft",
    Right: "ArrowRight",
    Up: "ArrowUp",
    Down: "ArrowDown",
  };

  const { row, column } = currentSelection.value;

  let newRow = row;
  let newColumn = column;
  switch (event.key) {
    case ArrowKeys.Left:
      newColumn -= 1;
      break;
    case ArrowKeys.Right:
      newColumn += 1;
      break;
    case ArrowKeys.Up:
      newRow -= 1;
      break;
    case ArrowKeys.Down:
      newRow += 1;
      break;
    default:
      return; // Not an arrow key
  }

  if (newRow >= 0 && newRow < focusableElements.value.length) {
    const newCell = focusableElements.value[newRow].find((el) => {
      return el.column == newColumn;
    });
    if (newCell) {
      currentSelection.value = newCell;
      keyHandler(newCell);
    }
  }
};

const keyHandler = (cell: FocusableCell) => {
  removeAllTabIndex();

  cell.element.setAttribute("tabindex", "0");
  cell.element.focus();
  cell.element.addEventListener("keydown", applyEventHandler);
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
