import { computed, defineComponent, h } from "vue";
import { CSS_NAMESPACE } from "../../constants";
import { PaginationShowing } from "./PaginationShowing";
import { PaginationLink } from "./pagination-link";
import { ChevronDoubleLeftIcon } from "../../icons/chevron-double-left-icon";
import { ChevronLeftIcon } from "../../icons/chevron-left-icon";
import { ChevronRightIcon } from "../../icons/chevron-right-icon";
import { ChevronDoubleRightIcon } from "../../icons/chevron-double-right-icon";

const LEFT = "left";
const RIGHT = 'right';

export const PaginationContainer = defineComponent({
  name: 'PaginationContainer',
  emits: ['goToPage'],
  props: {
    total: { type: Number, required: true },
    perPage: { type: Number, required: true },
    currentPage: { type: Number, optional: true, default: 1 },
    maxVisibleButtons: { type: Number, optional: true, default: 5 },
  },
  setup(props, { emit }) {
    const currentStart = computed(() => {
      return (props.currentPage - 1) * props.perPage + 1
    });
    const currentEnd = computed(() => {
      return props.total > props.currentPage * props.perPage ?
        props.currentPage * props.perPage :
        props.total;
    })
    const totalPages = computed(() => Math.ceil(props.total / props.perPage));
    const isInFirstPage = computed(() => props.currentPage === 1);
    const isInLastPage = computed(() => props.currentPage === totalPages.value);

    const startPage = computed(() => {
      if (props.currentPage === 1) {
        return 1;
      }
      if (props.currentPage === totalPages.value) {
        return totalPages.value - props.maxVisibleButtons + 1;
      }
      return  props.currentPage - 1;
    })
    const endPage = computed(() => Math.min(startPage.value + props.maxVisibleButtons - 1, totalPages.value));

    const pages = computed(() => {
      let range = [];
      for (let i = startPage.value; i <= endPage.value; i += 1) {
        if (i > 0) {
          range.push(i);
        }
      }
      return range;
    });

    const showDots = (position: string = LEFT) => {
      const number = position === LEFT ? 1 : totalPages.value;
      const nextNumber = position === LEFT ? 2 : totalPages.value - 1;
      return !pages.value.includes(number) || !pages.value.includes(nextNumber);
    }

    const goToPage = (page: number) => {
      emit('goToPage', page)
    }

    const goToFirstPage = () => goToPage(1);
    const goToLastPage = () => goToPage(totalPages.value);
    const goToNextPage = () => {
      const page = props.currentPage >= totalPages.value ?
        totalPages.value :
        props.currentPage + 1;
      goToPage(page);
    }
    const goToPreviousPage = () => {
      const page = props.currentPage <= 1 ?
        1 :
        props.currentPage - 1;
      goToPage(page);
    }

    return () => {

      // Build array of buttons
      let buttons: any = [];
      if (totalPages.value > 1) {

        // Go To First Page Button
        buttons.push(h(PaginationLink, {
            disabled: isInFirstPage.value,
            'style': 'padding-left: 0.5rem; padding-right: 0.5rem; border-top-left-radius: 0.375rem; border-bottom-left-radius: 0.375rem;',
            'onClick': goToFirstPage,
          }, () => [
            h('span', {
              'class': `${CSS_NAMESPACE}__srOnly`
            }, 'Go to first'),
            h(ChevronDoubleLeftIcon),
          ])
        );

        // Previous Button
        buttons.push(h(PaginationLink, {
          disabled: isInFirstPage.value,
          'style': 'padding-left: 0.5rem; padding-right: 0.5rem;',
          'onClick': goToPreviousPage,
        }, () => [
          h('span', {
            'class': `${CSS_NAMESPACE}__srOnly`
          }, 'Previous'),
          h(ChevronLeftIcon),
        ]));

        // Show 1st page and left dots if needed
        if (showDots(LEFT)) {
          buttons.push(h(PaginationLink, {
            disabled: isInFirstPage.value,
            active: isInFirstPage.value,
            'style': 'padding-left: 0.5rem; padding-right: 0.5rem;',
            'onClick': goToFirstPage,
          }, () => [
            h('span', {
              'class': `${CSS_NAMESPACE}__srOnly`
            }, 'Go to first'),
            h('div', { 'style': 'width: 100%;'}, '1')
          ]));
          buttons.push(h(PaginationLink, {
            disabled: true,
          }, () => h('div', { 'style': 'width: 100%;'}, '...')));
        }

        // LOOP THROUGH AND ADD ALL THE PAGES!!!
        pages.value.forEach((page: number) => {
          buttons.push(h(PaginationLink, {
            active: page === props.currentPage,
            disabled: page === props.currentPage,
            'style': 'padding-left: 0.5rem; padding-right: 0.5rem;',
            'onClick': () => goToPage(page),
          }, () => h('div', { 'style': 'width: 100%;'}, `${page}`)));
        });

        // Show last page and right dots if needed
        if (showDots(RIGHT)) {
          buttons.push(h(PaginationLink, {
            disabled: true,
          }, () => h('div', { 'style': 'width: 100%;'}, '...')));
          buttons.push(h(PaginationLink, {
            disabled: isInLastPage.value,
            active: isInLastPage.value,
            'style': 'padding-left: 0.5rem; padding-right: 0.5rem;',
            'onClick': goToLastPage,
          }, () => [
            h('span', {
              'class': `${CSS_NAMESPACE}__srOnly`
            }, 'Go to last'),
            h('div', { 'style': 'width: 100%;'}, `${totalPages.value}`)
          ]));
        }

        // Next Button
        buttons.push(h(PaginationLink, {
          disabled: isInLastPage.value,
          'style': 'padding-left: 0.5rem; padding-right: 0.5rem;',
          'onClick': goToNextPage,
        }, () => [
          h('span', {
            'class': `${CSS_NAMESPACE}__srOnly`
          }, 'Next'),
          h(ChevronRightIcon),
        ]));

        // Go To Last Page Button
        buttons.push(h(PaginationLink, {
            disabled: isInLastPage.value,
            'style': 'padding-left: 0.5rem; padding-right: 0.5rem; border-top-right-radius: 0.375rem; border-bottom-right-radius: 0.375rem;',
            'onClick': goToLastPage,
          }, () => [
            h('span', {
              'class': `${CSS_NAMESPACE}__srOnly`
            }, 'Go to last'),
            h(ChevronDoubleRightIcon),
          ])
        );

      }

      return h('div', {
        'class': `${CSS_NAMESPACE}__paginationContainer`
      }, [
        h(PaginationShowing, {
          start: currentStart.value,
          end: currentEnd.value,
          total: props.total
        }),
        h('div', { 'style': 'display: flex;' }, buttons),
      ]);
    }
  }
});