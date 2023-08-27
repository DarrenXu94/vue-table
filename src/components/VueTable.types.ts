export interface Field {
  key: string;
  value: string;
}

export interface VueTableProps<T> {
  /**
   * Array of type Field 
   * {
      key: string;
      value: string;
    }
   */
  fields: Field[];
  items: T[];
}

export interface FocusableCell {
  row: number;
  column: number;
  element: HTMLElement;
}
