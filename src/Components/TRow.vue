<template>
  <tr class="hover:bg-gray-100"
    :class="{
            'bg-white': formattedRowIndex % 2 === 0,
            'bg-gray-50': formattedRowIndex % 2,
        }"
  >
    <slot />
  </tr>
</template>

<script setup>
  import { ref } from "vue";

  const props = defineProps({
    rowIndex: {
      type: [Number, String],
      required: false,
      default: 0
    },
    totalRecords: {
      type: Number,
      required: false,
      default: 0
    }
  });

  const formattedRowIndex = ref(parseInt(props.rowIndex) || 0);
</script>