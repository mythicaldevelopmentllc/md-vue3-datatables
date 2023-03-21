<template>
  <div class="flex items-center justify-between bg-white my-3 px-4 py-3 sm:px-6">
    <div class="flex flex-1 justify-between sm:hidden">
      <a href="#"
         class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Previous</a>
      <a href="#"
         class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">Next</a>
    </div>
    <div class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
      <div>
        <p class="text-sm text-gray-700">
          Showing
          {{ " " }}
          <span class="font-medium">{{ currentStart }}</span>
          {{ " " }}
          to
          {{ " " }}
          <span class="font-medium">{{ currentEnd }}</span>
          {{ " " }}
          of
          {{ " " }}
          <span class="font-medium">{{ total }}</span>
          {{ " " }}
          results
        </p>
      </div>
      <div>
        <PaginationButtons v-if="totalPages > 1">
          <PaginationLink key="page_first" :disabled="isInFirstPage" class="px-2 rounded-l-md"
                          @click.prevent="goToFirstPage">
            <span class="sr-only">Go to first</span>
            <ChevronDoubleLeftIcon class="h-5 w-5" aria-hidden="true" />
          </PaginationLink>
          <PaginationLink key="page_previous" :disabled="isInFirstPage" class="px-2" @click.prevent="goToPreviousPage">
            <span class="sr-only">Previous</span>
            <ChevronLeftIcon class="h-5 w-5" aria-hidden="true" />
          </PaginationLink>

          <template v-if="showDots('left')">
            <PaginationLink key="page_1"
                            class="px-2 sm:hidden"
                            :disabled="isInFirstPage"
                            :active="isInFirstPage"
                            @click.prevent="goToFirstPage"
            >
              1
            </PaginationLink>
            <PaginationLink key="page_divider_left" class="sm:hidden">...</PaginationLink>
          </template>

          <PaginationLink v-for="page in pages"
                          :key="`pages_${page}`"
                          class="px-4"
                          :active="page === currentPage"
                          :disabled="page === currentPage"
                          @click.prevent="goToPageNumber(page)"
          >
            {{ page }}
          </PaginationLink>

          <template v-if="showDots('right')">
            <PaginationLink key="page_divider_right" class="sm:hidden">...</PaginationLink>
            <PaginationLink :key="`page_${totalPages}`"
                            class="px-2 sm:hidden"
                            :disabled="isInLastPage"
                            :active="isInLastPage"
                            @click.prevent="goToLastPage"
            >
              {{ totalPages }}
            </PaginationLink>
          </template>

          <PaginationLink key="page_next" :disabled="isInLastPage" class="px-2" @click.prevent="goToNextPage">
            <span class="sr-only">Next</span>
            <ChevronRightIcon class="h-5 w-5" aria-hidden="true" />
          </PaginationLink>

          <PaginationLink key="page_last" :disabled="isInLastPage" class="px-2 rounded-r-md"
                          @click.prevent="goToLastPage">
            <span class="sr-only">Go to last</span>
            <ChevronDoubleRightIcon class="h-5 w-5" aria-hidden="true" />
          </PaginationLink>
        </PaginationButtons>
      </div>
    </div>
  </div>
</template>

<script setup>

import { computed } from "vue";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon
} from "@heroicons/vue/20/solid";
import PaginationButtons from "./PaginationButtons.vue";
import PaginationLink from "./PaginationLink.vue";

const emit = defineEmits(["onPageSelection"]);
const props = defineProps({
  total: {
    type: Number,
    required: true
  },
  perPage: {
    type: Number,
    required: true
  },
  currentPage: {
    type: Number,
    required: false,
    default: 1
  },
  maxVisibleButtons: {
    type: Number,
    required: false,
    default: 5
  }
});

const LEFT = "left";

const currentStart = computed(() => (props.currentPage - 1) * props.perPage + 1);
const currentEnd = computed(() => {
  return props.total > (props.currentPage * props.perPage) ? (props.currentPage * props.perPage) : props.total;
});
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

  return props.currentPage - 1;
});
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

const showDots = (position = LEFT) => {
  const number = position === LEFT ? 1 : totalPages.value;
  const nextNumber = position === LEFT ? 2 : totalPages.value - 1;

  return !pages.value.includes(number) || !pages.value.includes(nextNumber);
};

const goToPageNumber = (page) => {
  emit("onPageSelection", page);
};

const goToFirstPage = () => goToPageNumber(1);
const goToLastPage = () => goToPageNumber(totalPages.value);
const goToNextPage = () => {
  const page = (props.currentPage >= totalPages.value) ? totalPages.value : (props.currentPage + 1);
  goToPageNumber(page);
};
const goToPreviousPage = () => goToPageNumber((props.currentPage <= 1) ? 1 : (props.currentPage - 1));

</script>