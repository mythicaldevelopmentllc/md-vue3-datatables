<script setup lang="ts">
import { computed } from "vue";

const props = withDefaults(defineProps<{
  active?: boolean,
  disabled?: boolean,
}>(), {
  active: false,
  disabled: false,
});

const linkClasses = computed(() => {
  if (props.active) {
    return 'bg-gray-200 border-gray-300 text-gray-800 hover:bg-gray-200';
  }
  if (props.disabled) {
    return 'cursor-not-allowed text-gray-400';
  }
  return 'border-gray-300 bg-white text-gray-500 hover:bg-gray-50';
});
</script>

<template>
    <button type="button"
       class="
        relative inline-flex items-center
        border border-gray-300
        bg-white
        py-2 text-sm font-medium text-gray-500
        hover:bg-gray-50 focus:z-20
       "
       :class="linkClasses"
       v-bind="$attrs"
       >
        <slot />
    </button>
</template>
