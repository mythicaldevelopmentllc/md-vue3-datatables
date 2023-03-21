<template>
  <th scope="col"
      class="
          sticky top-0 z-10
          border-b border-gray-300
          bg-gray-50 bg-opacity-75
          py-3.5
          text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter
         "
      :class="{
        'pl-4 pr-3': first,
        'pr-4 pl-3': last,
        'px-3': !first && !last,
      }"
  >
    <slot />
  </th>
</template>

<script setup>
  const props = defineProps({
    first: {
      type: Boolean,
      default: false,
      required: false
    },
    last: {
      type: Boolean,
      default: false,
      required: false
    }
  });
</script>