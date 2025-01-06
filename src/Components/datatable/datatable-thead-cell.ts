import { computed, defineComponent, h } from "vue";
import { CSS_NAMESPACE } from "../../constants";

export const THeadCell = defineComponent({
  name: 'THeadCell',
  props: {
    first: { type: Boolean, optional: true, default: false },
    last: { type: Boolean, optional: true, default: false },
  },
  setup(props, { slots }) {

    const headerStyles = computed(() => {
      if (props.first) {
        return 'padding-left: 1rem; padding-right: 0.75rem;';
      } else if (props.last) {
        return 'padding-right: 1rem; padding-left: 0.75rem;';
      } else {
        return 'padding-left: 0.75rem; padding-right: 0.75rem;';
      }
    });

    return () => {
      return h('th', {
        'scope': 'col',
        'class': `${CSS_NAMESPACE}__tableHead`,
        'style': `${headerStyles.value}`
      }, {
        default: () => slots
      })
    }
  }
});