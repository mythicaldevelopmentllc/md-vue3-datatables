import {computed, defineComponent, h, PropType, ref} from "vue";
import { CSS_NAMESPACE } from "../../constants";

export const TRow = defineComponent({
  name: 'TRow',
  props: {
    rowIndex: { type: [Number, String] as PropType<number | string>, optional: true, default: 0 },
    totalRecords: { type: Number, optional: true, default: 0 }
  },
  setup(props, { slots }) {
    const formattedRowIndex = ref(parseInt(`${props.rowIndex}`));
    const rowClass = computed(() => {
      if (formattedRowIndex.value % 2 === 0) {
        return `${CSS_NAMESPACE}__tableRowEven`;
      } else {
        return `${CSS_NAMESPACE}__tableRowOdd`;
      }
    });

    return () => {
      return h('tr', {
        'class': `${CSS_NAMESPACE}__tableRow ${rowClass.value}`,
      }, {
        default: () => slots
      })
    }
  }
});