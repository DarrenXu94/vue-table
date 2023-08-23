export interface Field {
  key: string;
  value: string;
}

export interface VueTableProps<T> {
  fields: Field[];
  items: T[];
}

export interface FocusableCell {
  row: number;
  column: number;
  element: HTMLElement;
}
