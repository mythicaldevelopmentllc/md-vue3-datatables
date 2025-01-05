<script setup lang="ts">
const emit = defineEmits(['onSelectPageSize']);
defineProps<{
  value: number | string,
  options: number[],
}>();

const handleOnSelectPageSize = (size: number) => {
  emit('onSelectPageSize', size);
}
</script>

<template>
    <div class="flex w-full justify-start sm:w-auto">
        <div>
            <select
                :value="value"
                name="per_page"
                class="form-select appearance-none block w-full h-full pr-10 pl-3.5 py-1.5 text-base
                                    font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat
                                    border border-solid border-gray-300 rounded transition ease-in-out m-0
                                    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                @input="handleOnSelectPageSize"
            >
                <option v-for="size in options"
                        :key="`per_page_${size}`"
                        :value="size"
                        :selected="size === value"
                >{{ size }}</option>
            </select>
        </div>
    </div>
</template>
