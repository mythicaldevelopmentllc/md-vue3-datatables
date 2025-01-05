import {
  defineComponent,
  h,
  PropType,
} from "vue";
import { PageSize } from "./pagesize";
import { CSS_NAMESPACE } from "../../constants";
import { Filter } from "./filter";

export const PageSizeFilter = defineComponent({
  name: 'PageSizeFilter',
  emits: ['perPageUpdated', 'searchTermUpdated'],
  props: {
    showPageSize: { type: Boolean, required: true },
    showFilter: { type: Boolean, required: true },
    pageOptions: { type: Array as PropType<number[]>, required: true },
    perPage: { type: Number, required: true },
    search: { type: String, required: true }
  },
  setup(props, { emit }) {

    return () => {
      let children = [];
      // Check if we need to include the page size dropdown
      if (props.showPageSize) {
        const pageSize = h(PageSize, {
          perPage: props.perPage,
          options: props.pageOptions,
          'onPerPageUpdated': (value: number) => {
            emit('perPageUpdated', value);
          },
        });
        children.push(h('div', {
          'class': `${CSS_NAMESPACE}__pageSize_wrapper`,
        }, [pageSize]));
      }

      // Check if we need to include the filter
      if (props.showFilter) {
        const filter = h(Filter, {
          search: props.search,
          'onSearchTermUpdated': (value: string) => {
            emit('searchTermUpdated', value);
          },
        });
        children.push(h('div', {
          'class': `${CSS_NAMESPACE}__filter_wrapper`,
        }, [filter]));
      }

      return h('div', {
        'class': `${CSS_NAMESPACE}__pageSize_filter_wrapper`,
      }, children);
    }
  }
});