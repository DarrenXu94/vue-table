<template>
  <table ref="vueTableRef">
    <tr>
      <th v-for="heading of fields">
        <!-- @slot header(cellname)
              @binding {object} data whole header item
              @binding {string} header key for the header
        -->
        <slot
          :name="`header(${heading.key})`"
          v-bind:data="heading"
          v-bind:header="heading.key"
        >
          {{ heading.value }}
        </slot>
      </th>
    </tr>
    <tr v-for="(item, index) of items">
      <td v-for="(heading, columnIndex) of fields">
        <!-- @slot cell(cellname)
              @binding {object} data Key value
              @binding {string} item Whole data item
        -->
        <slot
          :name="`cell(${heading.key})`"
          v-bind:data="item[heading.key]"
          v-bind:item="item"
          v-bind:row="index"
          v-bind:column="columnIndex"
        >
          {{ item[heading.key] }}
        </slot>
      </td>
    </tr>
    <!-- @slot Use this slot for table footer -->

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
  const focusableElementsFlat = getAllFocusableElements(table);

  if (!focusableElementsFlat.length) return;

  // Get all focusable elements
  // Save in 2d array
  focusableElements.value = create2dArrayOfFocusableElements(table);

  // Apply tabindex to first element
  // Add keyhandler to first element
  if (focusableElements.value.length) {
    currentSelection.value = getFirstNonNullValue(focusableElements.value);
    keyHandler(currentSelection.value as FocusableCell, true);
  }
};

const ArrowKeys = {
  Left: "ArrowLeft",
  Right: "ArrowRight",
  Up: "ArrowUp",
  Down: "ArrowDown",
};

const recursivelyFindNextCell = (
  row: number,
  column: number,
  event: KeyboardEvent
): FocusableCell | undefined => {
  let newRow = row;
  let newColumn = column;
  // console.log(row, column, event.key);
  if (event.key === ArrowKeys.Up || event.key === ArrowKeys.Down) {
    if (event.key === ArrowKeys.Up) {
      newRow -= 1;
    } else if (event.key === ArrowKeys.Down) {
      newRow += 1;
    }

    if (newRow >= 0 && newRow < focusableElements.value.length) {
      // See if cell exists directly under
      const newCell = focusableElements.value[newRow].find((el) => {
        return el.column == newColumn;
      });
      if (newCell) return newCell;
      // Find closest in row
      const closest = focusableElements.value[newRow].reduce(function (
        prev,
        curr
      ) {
        return Math.abs(curr.column - newColumn) <
          Math.abs(prev.column - newColumn)
          ? curr
          : prev;
      });
      if (closest) return closest;

      // If the row was empty check next row
      return recursivelyFindNextCell(newRow, newColumn, event);
    }
  } else if (event.key === ArrowKeys.Left || event.key === ArrowKeys.Right) {
    if (event.key === ArrowKeys.Left) {
      newColumn -= 1;
    } else if (event.key === ArrowKeys.Right) {
      newColumn += 1;
    }

    if (
      newColumn >= 0 &&
      newColumn <=
        focusableElements.value[newRow][
          focusableElements.value[newRow].length - 1
        ].column
    ) {
      const newCell = focusableElements.value[newRow].find((el) => {
        return el.column == newColumn;
      });
      if (newCell) return newCell;
      return recursivelyFindNextCell(newRow, newColumn, event);
    }
  }
};

const applyEventHandler = (event: KeyboardEvent) => {
  if (!currentSelection.value) {
    return; // No cell selected
  }
  const { row, column } = currentSelection.value;

  const newCell = recursivelyFindNextCell(row, column, event);
  if (newCell) {
    currentSelection.value = newCell;
    keyHandler(newCell);
  }
};

const keyHandler = (cell: FocusableCell, skipFocus = false) => {
  removeAllTabIndex();

  cell.element.setAttribute("tabindex", "0");
  if (!skipFocus) {
    cell.element.focus();
  }
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
