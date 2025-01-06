import { defineComponent, h } from "vue";

export const TBody = defineComponent({
  name: 'TBody',
  setup(_, { slots }) {
    return () => {
      return h('tbody', {
        'style': 'background-color: rgb(255 255 255 / 1);'
      }, {
        default: () => slots
      });
    }
  }
});