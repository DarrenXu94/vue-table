export interface Field {
  key: string;
  value: string;
}

export interface VueTableProps<T> {
  fields: Field[];
  items: T[];
}
