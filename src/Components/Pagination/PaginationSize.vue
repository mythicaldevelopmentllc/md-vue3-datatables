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
                        :key="`per_page${size}`"
                        :value="size"
                        :selected="size === value"
                        v-text="size" />
            </select>
        </div>
    </div>
</template>

<script setup>
const emit = defineEmits(['onSelectPageSize']);
const props = defineProps({
    value: {
        type: [Number, String],
        required: true,
    },
    options: {
        type: Array,
        required: true,
    }
});

const handleOnSelectPageSize = (size) => {
    emit('onSelectPageSize', size);
}
</script>
