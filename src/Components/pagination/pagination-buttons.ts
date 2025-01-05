import { computed, defineComponent, h } from "vue";
import { CSS_NAMESPACE } from "../../constants";

export const PaginationButtons = defineComponent({
  name: 'PaginationButtons',
  setup(_, { slots }) {
    return () => {
      return h('nav', {
        'class': `${CSS_NAMESPACE}__paginationButtons`,
        'aria-label': 'Pagination',
      },
        {
          default: () => slots
        }
      );
    }
  }
});