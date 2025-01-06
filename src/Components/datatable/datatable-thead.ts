import { defineComponent, h } from "vue";

export const THead = defineComponent({
  name: 'THead',
  setup(_, { slots }) {
    return () => {
      return h('thead', {
        'style': 'background-color: rgb(249 250 251 / 1);'
      }, h('tr', null, {
        default: () => slots
      }));
    }
  }
});
