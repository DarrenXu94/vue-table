import { FocusableCell } from "src/components/VueTable.types";

export const create2dArrayOfFocusableElements = (table: HTMLTableElement) => {
  const focusableElements: FocusableCell[][] = [];

  // Loop through the rows of the table
  for (let rowIndex = 0; rowIndex < table.rows.length; rowIndex++) {
    const row = table.rows[rowIndex];
    const rowElements = [] as FocusableCell[];

    for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
      const cell = row.cells[cellIndex];

      // Find focusable elements within the cell using querySelectorAll
      const focusableEls = cell.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );

      // Convert NodeList to an array and add to the rowElements array
      focusableEls.forEach((element) => {
        rowElements.push({
          row: rowIndex,
          column: cellIndex,
          element: element as HTMLElement,
        });
      });
    }

    // Add the rowElements array to the focusableElements2D array
    focusableElements.push(rowElements);
  }
  return focusableElements;
};

export const removeTabIndexFromFocusableElements = (elements: Element[]) => {
  // const elements = getAllFocusableElements(table);
  for (const element of elements) {
    element.setAttribute("tabindex", "-1");
  }
};

export function getAllFocusableElements(container: Element): HTMLElement[] {
  const focusableElements = container.querySelectorAll(
    'a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );

  return Array.from(focusableElements) as HTMLElement[];
}

export function getFirstNonNullValue(array: any[]) {
  for (let row = 0; row < array.length; row++) {
    for (let col = 0; col < array[row].length; col++) {
      const value = array[row][col];
      if (value !== null && value !== "") {
        return value;
      }
    }
  }
  return null; // Return null if no valid value is found
}

export function flattenArray(arr: any) {
  let flattened: any[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      flattened = flattened.concat(flattenArray(arr[i])); // Recursively flatten sub-array
    } else {
      flattened.push(arr[i]);
    }
  }
  return flattened;
}
