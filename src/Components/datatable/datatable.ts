import {
  defineComponent,
  h,
  onMounted,
  PropType,
  ref,
  type Ref,
  toRef,
  watch
} from "vue";
import { PageSizeFilter } from "../pagesize-filter/pagesize-filter";
import { CSS_NAMESPACE, DEFAULT_PAGE_OPTIONS, DEFAULT_PER_PAGE } from "../../constants";
import { TableQuery } from "../../types/datatables";

export const DataTable = defineComponent({
  name: 'DataTable',
  props: {
    rows: { type: [Object], required: true },
    showFilter: { type: Boolean, optional: true, default: false },
    showPageSize: { type: Boolean, optional: true, default: false },
    pageOptions: { type: Array as PropType<number[]>, required: false, default: DEFAULT_PAGE_OPTIONS },
    topPagination: { type: Boolean, optional: true, default: true }
  },
  setup(props) {

    const tableQuery: Ref<TableQuery> = ref({
      page: 1,
      search: '',
      perPage: DEFAULT_PER_PAGE,
      sort: ''
    });

    onMounted(() => {
      watch(
        () => tableQuery.value,
        () => {
          console.log('datatables.watch', tableQuery.value)
        },
        {
          deep: true,
        }
      );
    });

    return () => {
      let children = [];
      if (props.showFilter || props.showPageSize) {
        children.push(h(PageSizeFilter, {
            showPageSize: props.showPageSize,
            showFilter: props.showFilter,
            pageOptions: props.pageOptions,
            perPage: tableQuery.value.perPage,
            search: tableQuery.value.search,
            'onPerPageUpdated': (value: number) => {
              tableQuery.value.perPage = value;
            },
            'onSearchTermUpdated': (value: string) => {
              tableQuery.value.search = value;
            },
          }
        ));
      }

      return h('div', {
        'class': `${CSS_NAMESPACE}__wrapper`
      }, children);
    }
  },
});