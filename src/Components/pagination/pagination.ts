import { computed, defineComponent, h } from "vue";
import { CSS_NAMESPACE } from "../../constants";
import { PaginationPreviousNext } from "./pagination-previous-next";
import { PaginationContainer } from "./pagination-container";

export const Pagination = defineComponent({
  name: 'Pagination',
  emits: ['goToPage'],
  props: {
    total: { type: Number, required: true },
    perPage: { type: Number, required: true },
    currentPage: { type: Number, optional: true, default: 1 },
    maxVisibleButtons: { type: Number, optional: true, default: 5 },
  },
  setup(props, { emit }) {

    const totalPages = computed(() => Math.ceil(props.total / props.perPage));

    return () => {

      return h('div', {
        'class': `${CSS_NAMESPACE}__paginationWrapper`,
      }, [
        h(PaginationPreviousNext, {
          'onGoToNextPage': () => {
            const page = props.currentPage >= totalPages.value ?
              totalPages.value :
              props.currentPage + 1;
            emit('goToPage', page)
          },
          'onGoToPreviousPage': () => {
            const page = props.currentPage <= 1 ?
              1 :
              props.currentPage - 1;
            emit('goToPage', page)
          },
        }),
        h(PaginationContainer, {
          total: props.total,
          perPage: props.perPage,
          currentPage: props.currentPage,
          maxVisibleButtons: props.maxVisibleButtons,
          'onGoToPage': (page: number) => {
            emit('goToPage', page);
          }
        }),
      ]);
    }
  }
});