import {
  defineComponent,
  h,
  PropType,
} from "vue";
import { CSS_NAMESPACE } from "../../constants";

export const PageSize = defineComponent({
  name: 'PageSize',
  emits: { 'perPageUpdated': (_value: number) => true },
  props: {
    options: { type: Array as PropType<number[]>, required: true },
    perPage: { type: Number, required: true }
  },
  setup(props, { emit }) {

    return () => {

      return h('div', {
        'class': `${CSS_NAMESPACE}__pageSize_container`
      }, [
        h('select', {
            modelValue: props.perPage,
            'class': `${CSS_NAMESPACE}__pageSizeSelect`,
            'onChange': (value: any) => {
              emit('perPageUpdated', parseInt(value.target.value));
            },
          },
          props.options.map((option) => {
            return h('option', {
              key: `per_page_${option}`,
              value: option,
              selected: option === props.perPage
            }, option);
          })
        )
      ]);

    };
  }
});