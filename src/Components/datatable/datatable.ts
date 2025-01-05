import {
  computed,
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
import { Pagination } from "../pagination/pagination";
import { PaginationData, TableQuery } from "../../types/datatables";

export const DataTable = defineComponent({
  name: 'DataTable',
  emits: ['loadData'],
  props: {
    rows: { type: [Object], required: true },
    showFilter: { type: Boolean, optional: true, default: false },
    showPageSize: { type: Boolean, optional: true, default: false },
    pageOptions: { type: Array as PropType<number[]>, required: false, default: DEFAULT_PAGE_OPTIONS },
    topPagination: { type: Boolean, optional: true, default: true },
    bottomPagination: { type: Boolean, optional: true, default: false },
    pagination: { type: [Object, Object] as PropType<PaginationData | null>, optional: true, default: null },
  },
  setup(props, { emit }) {

    const tableQuery: Ref<TableQuery> = ref({
      page: props.pagination?.page || 1,
      search: props.pagination?.search || '',
      perPage: props.pagination?.perPage || DEFAULT_PER_PAGE,
      sort: props.pagination?.sort || ''
    });

    const totalRows = computed(() => props.pagination?.total || props.rows.length);
    const currentPage = computed(() => props.pagination?.page || 1);

    const fireLoadData = () => {
      emit('loadData', tableQuery.value);
    }

    onMounted(() => {
      fireLoadData();

      watch(
        () => tableQuery.value,
        () => {
          console.log('datatables.watch', tableQuery.value)
          fireLoadData();
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

      if (props.topPagination) {
        children.push(h(Pagination, {
          'total': totalRows.value,
          perPage: tableQuery.value.perPage,
          currentPage: currentPage.value,
          'onGoToPage': (page: number) => {
            tableQuery.value.page = page;
          }
        }));
      }

      // TODO: IMPLEMENT THE ACTUAL TABLE!!!
      if (props.bottomPagination) {
        children.push(h(Pagination, {
          'total': totalRows.value,
          perPage: tableQuery.value.perPage,
          currentPage: currentPage.value,
          'onGoToPage': (page: number) => {
            tableQuery.value.page = page;
          }
        }));
      }

      return h('div', {
        'class': `${CSS_NAMESPACE}__wrapper`
      }, children);
    }
  },
});