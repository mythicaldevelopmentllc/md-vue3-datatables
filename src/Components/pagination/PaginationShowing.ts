import { computed, defineComponent, h } from "vue";
import { CSS_NAMESPACE } from "../../constants";

export const PaginationShowing = defineComponent({
  name: 'PaginationShowing',
  props: {
    start: { type: Number, required: true },
    end: { type: Number, required: true },
    total: { type: Number, required: true },
  },
  setup(props) {
    return () => {
      return h('div',
        h('p', {
          'class': `${CSS_NAMESPACE}__paginationShowing`
        }, [
          'Showing ',
          h('span', { 'style': 'font-weight: 500;' }, props.start),
          ' to ',
          h('span', { 'style': 'font-weight: 500;' }, props.end),
          ' of ',
          h('span', { 'style': 'font-weight: 500;' }, props.total),
          ' results'
        ]));
    }
  }
});