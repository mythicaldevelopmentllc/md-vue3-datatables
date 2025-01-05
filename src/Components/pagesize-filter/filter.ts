import {
  defineComponent,
  h,
  ref,
  type Ref,
  toRef
} from "vue";
import { CSS_NAMESPACE } from "../../constants";

export const Filter = defineComponent({
  name: 'Filter',
  emits: ['searchTermUpdated'],
  props: {
    search: { type: String, required: true }
  },
  setup(props, { emit }) {

    const timer: Ref<number> = ref(0);
    const filter: Ref<string> = ref(props.search);

    const handleSearch = () => {
      emit('searchTermUpdated', filter.value);
    }

    const onKeyDown = () => {
      clearTimeout(timer.value);
    }

    const onKeyUp = (event: any) => {
      filter.value = event.target.value;
      clearTimeout(timer.value);
      timer.value = setTimeout(handleSearch, 400);
    }


    return () => {
      return h('div', {
        'class': `${CSS_NAMESPACE}__filterContainer`
      }, [
        h('input', {
          'modelValue': filter,
          'placeholder': 'Search',
          'class': `${CSS_NAMESPACE}__filterInput`,
          'onKeydown': onKeyDown,
          'onKeyup': onKeyUp,
        })
      ]);
    }
  }
});