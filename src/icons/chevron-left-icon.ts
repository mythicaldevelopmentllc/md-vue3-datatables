import { defineComponent, h } from "vue";

export const ChevronLeftIcon = defineComponent({
  name: 'ChevronLeftIcon',
  setup() {
    return () => {
      return h('svg', {
        'xmlns': 'http://www.w3.org/2000/svg',
        'fill': 'none',
        'viewBox': '0 0 24 24',
        'stroke-width': '1.5',
        'stroke': 'currentColor',
        'style': 'width: 1.25rem; height: 1.25rem',
        'aria-hidden': 'true'
      }, h('path', {
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        'd': 'M15.75 19.5 8.25 12l7.5-7.5'
      }));
    }
  }
});
