<script setup>
import { computed, ref } from "vue";

const selectFilterValue = ref("");

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const scrollContainer = ref(null);

const scrollLeft = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollLeft -= 300;
  }
};

const scrollRight = () => {
  if (scrollContainer.value) {
    scrollContainer.value.scrollLeft += 300;
  }
};

const setFilterValue = (filter) => {
  selectFilterValue.value = filter;
};

const filteredItems = computed(() => {
  if(selectFilterValue.value == 'ALL'){
    return props.items;
  }
  else if (!selectFilterValue.value) {
    return props.items;
  }
  return props.items.filter(
    (item) => item.provinces === selectFilterValue.value
  );
});

</script>

<template>
  <div class="px-45 left-15 relative">
    <h1 class="text-3xl py-8">
      <slot name="header">Name</slot>
    </h1>
    <div class="text-lg flex">
      <slot name="FilterButton">
        <h1
          @click="setFilterValue('ALL')"
          class="bg-white shadow-lg px-4 max-w-32 cursor-pointer hover:text-white hover:bg-blue-600 py-1 rounded-sm"
        >
          ALL
        </h1>
        <h1
          @click="setFilterValue('BANGKOK')"
          class="bg-white shadow-lg px-4 max-w-32 cursor-pointer hover:text-white hover:bg-blue-600 py-1 rounded-sm"
        >
          BANGKOK
        </h1>
        <h1
          @click="setFilterValue('Chonburi')"
          class="bg-white shadow-lg px-4 max-w-32 cursor-pointer mx-2 py-1 hover:text-white hover:bg-blue-600 rounded-sm"
        >
          Chonburi
        </h1>
        <h1
          @click="setFilterValue('Chachoengsao')"
          class="bg-white shadow-lg px-4 max-w-36 cursor-pointer py-1 hover:text-white hover:bg-blue-600 rounded-sm"
        >
          Chachoengsao
        </h1>
      </slot>
    </div>
    <button
      @click="scrollLeft"
      class="absolute -translate-y-1/2 left-38 hover:bg-blue-600 top-80 bg-white rounded-full p-2 shadow z-10 group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 fill-current text-gray-800 group-hover:text-white"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M12.293 4.293a1 1 0 010 1.414L8.414 9.586H18a1 1 0 110 2H8.414l3.879 3.879a1 1 0 01-1.414 1.414l-5.586-5.586a1 1 0 010-1.414l5.586-5.586a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <button
      @click="scrollRight"
      class="absolute -translate-y-1/2 right-40 top-80 hover:bg-blue-600 bg-white rounded-full p-2 shadow z-10 group"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5 rotate-180 fill-current text-gray-800 group-hover:text-white"
        viewBox="0 0 20 20"
      >
        <path
          fill-rule="evenodd"
          d="M12.293 4.293a1 1 0 010 1.414L8.414 9.586H18a1 1 0 110 2H8.414l3.879 3.879a1 1 0 01-1.414 1.414l-5.586-5.586a1 1 0 010-1.414l5.586-5.586a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <div
      ref="scrollContainer"
      class="flex flex-nowrap gap-4 overflow-hidden py-4 relative scroll-smooth"
    >
      <div
        v-for="(item, index) in filteredItems"
        :key="index"
        class="flex-shrink-0 w-64"
      >
        <slot name="List" :Item="item"> Enter your List </slot>
      </div>
    </div>
  </div>
</template>
