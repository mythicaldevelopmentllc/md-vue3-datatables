import { computed, defineComponent, h } from "vue";
import { CSS_NAMESPACE } from "../../constants";

export const PaginationLink = defineComponent({
  name: 'PaginationLink',
  props: {
    active: { type: Boolean, optional: true, default: false },
    disabled: { type: Boolean, optional: true, default: false },
  },
  setup(props, { slots }) {
    const linkClass = computed(() => {
      if (props.active) {
        return `${CSS_NAMESPACE}__paginationLink_active`;
      } else if (props.disabled) {
        return `${CSS_NAMESPACE}__paginationLink_disabled`;
      } else {
        return `${CSS_NAMESPACE}__paginationLink_normal`;
      }
    });

    return () => {
      return h('button', {
        type: 'button',
        'class': `${CSS_NAMESPACE}__paginationLink ${linkClass.value}`,
      }, slots);
    }
  }
});
