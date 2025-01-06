import { computed, defineComponent, h, PropType } from "vue";
import { CSS_NAMESPACE } from "../../constants";
import { THead } from "./datatable-thead";
import { THeadCell } from "./datatable-thead-cell";
import { TBody } from "./datatable-tbody";
import { TRow } from "./datatable-trow";
import { formatString } from "../utils/helpers";
import { TBodyCell } from "./datatable-tbody-cell";

export const DatatableContainer = defineComponent({
  name: 'DatatableContainer',
  props: {
    rows: { type: Array as PropType<object[]>, required: true },
    columns: { type: [[String], Object] as PropType<string[]|null>, optional: true, default: null }
  },
  setup(props, { slots }) {

    const uniqueId = () => Math.floor(Math.random()) * 100;
    const tableColumns = computed(() => {
      if (props.columns) {
        return props.columns;
      }
      if (props.rows.length === 0) {
        return [];
      }
      return Object.keys(props.rows[0]).map((item: string) => formatString(item));
    })

    const rowKeys = computed(() => {
      return Object.keys(props.rows[0]);
    })

    const tableRows = computed(() => props.rows);

    return () => {
      let headers: any[] = [];
      if (slots.thead === undefined) {
        headers =
          tableColumns.value.map((label, key) => {
            return h(THeadCell, {
              first: key === 0,
              last: key === tableColumns.value.length,
              key: `datatable-thead-th-${key}`
            }, () => label);
          });
      }

      let rows = tableRows.value.map((row, index) => {
        let bodyCell: any[]|null = null;
        if (slots.tbody === undefined) {
          // Create the table cell to display
          bodyCell = rowKeys.value.map((key, idx) => {
            return h(TBodyCell, {
              'key': `datatable-tbody-td-${uniqueId()}-${idx}`,
              'first': idx === 0
            }, () => row[key as keyof object]);
          })
        }
        return h(TRow, {
          'key': `datatable-row-td-${uniqueId()}-${index}`,
          'rowIndex': index,
          'totalRecords': tableRows.value.length
        }, {
          default: () => slots.tbody === undefined ? bodyCell : slots.tbody({ index, row })
        })
      })

      return h('div', {
        'class': `${CSS_NAMESPACE}__container`
      }, h('table', {
        'class': `${CSS_NAMESPACE}__table`
      }, [
        h(THead, null,
        {
            default: () => slots.thead === undefined ? headers : slots.thead!()
          }
        ),
        h(TBody, null, {
          default: () => rows
        }),
      ]));
    }
  }
});
