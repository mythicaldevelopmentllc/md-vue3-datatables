import { computed, defineComponent, h } from "vue";
import { CSS_NAMESPACE } from "../../constants";

export const PaginationPreviousNext = defineComponent({
  name: 'PreviousNext',
  emits: ['goToPreviousPage', 'goToNextPage'],
  setup(_, { emit }) {
    return () => {
      return h('div', {
        'class': `${CSS_NAMESPACE}__paginationPrevNextWrapper`,
      }, [
        h('button', {
          'class': `${CSS_NAMESPACE}__paginationPrevNextButton`,
          'onClick': () => emit('goToPreviousPage'),
        }, 'Previous'),
        h('button', {
          'class': `${CSS_NAMESPACE}__paginationPrevNextButton`,
          'style': 'margin-left: 0.75rem;',
          'onClick': () => emit('goToNextPage'),
        }, 'Next'),
      ])
    }
  }
});