import { computed, defineComponent, h } from "vue";
import { CSS_NAMESPACE } from "../../constants";

export const TBodyCell = defineComponent({
  name: 'TBodyCell',
  props: {
    first: { type: Boolean, optional: true, default: false }
  },
  setup(props, { slots }) {

    const bodyCellClass = computed(() => {
      if (props.first) {
        return `${CSS_NAMESPACE}__tableBodyCellFirst`;
      }
      return '';
    })

    return () => {
      return h('td', {
        'class': `${CSS_NAMESPACE}__tableBodyCell ${bodyCellClass.value}`
      }, {
        default: () => slots
      });
    }
  }
});
