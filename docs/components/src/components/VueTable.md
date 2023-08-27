# VueTable

## Props

| Prop name | Description                                                             | Type  | Values | Default |
| --------- | ----------------------------------------------------------------------- | ----- | ------ | ------- |
| fields    | Array of type Field <br/>{<br/> key: string;<br/> value: string;<br/> } | Array | -      |         |
| items     |                                                                         | Array | -      |         |

## Slots

| Name                     | Description                    | Bindings                                                                                |
| ------------------------ | ------------------------------ | --------------------------------------------------------------------------------------- |
| `header(${heading.key})` | header(cellname)               | <br/>**data** `object` - whole header item<br/>**header** `string` - key for the header |
| `cell(${heading.key})`   | cell(cellname)                 | <br/>**data** `object` - Key value<br/>**item** `string` - Whole data item              |
| tfooter                  | Use this slot for table footer |                                                                                         |

---
