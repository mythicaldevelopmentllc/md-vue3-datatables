<template>
  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm"
      :class="{
          'font-medium text-gray-900': first,
          'text-gray-500': !first,
        }">
    <slot />
  </td>
</template>

<script setup>
  const props = defineProps({
    first: {
      type: Boolean,
      required: false,
      default: false
    }
  });
</script>