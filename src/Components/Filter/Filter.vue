<template>
  <div class="flex sm:w-auto w-full justify-end">
    <input
      placeholder="Search"
      class="
        h-11
        block
        appearance-none
        border-0
        text-black
        pl-4 sm:pl-8
        pr-1
        py-1
        rounded-full
        bg-gray-100
        focus:outline-none
      "
      v-model="state.filter"
      @keydown="onKeyDown"
      @keyup="onKeyUp"
    />
  </div>
</template>

<script setup>
  import { reactive } from "vue";

  const emit = defineEmits(['handleSearch']);
  const props = defineProps({
    search: {
      type: String,
      required: true,
    }
  });

  const state = reactive({
    timer: 0,
    filter: props.search,
  });

  const onHandleSearch = () => {
    console.log(state.filter);
    emit('handleSearch', state.filter);
  }

  const onKeyDown = () => {
    clearTimeout(state.timer);
  }

  const onKeyUp = (event) => {
    clearTimeout(state.timer);
    state.timer = setTimeout(onHandleSearch, 400);
  }
</script>
