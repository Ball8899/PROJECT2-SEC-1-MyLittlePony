<script setup>
import {ref , computed} from 'vue';
const filterValue = ref('All')
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});
const getFilterValue = (booked) =>{
filterValue.value = booked;
}

const filteredItems = computed(() => {
  if (filterValue.value === 'All') {
    return props.items;
  }
  return props.items.filter(item => item.approve.toLowerCase() === filterValue.value.toLowerCase());
});

</script>

<template>
  <div class="flex bg-gray-50  py-5 px-50 rounded-2xl">
    <button 
        @click="getFilterValue('All')" 
        :class="['px-5 py-2 w-50 h-10 border-r-gray-300 border-r-1 rounded-l-xl', filterValue === 'All' ? 'bg-blue-900 text-white' : 'bg-white hover:text-blue-600']">
        All Booking
    </button>
    <button 
        @click="getFilterValue('Waiting')" 
        :class="['px-5 py-2 w-50 h-10 border-r-gray-300 border-r-1', filterValue === 'Waiting' ? 'bg-blue-900 text-white' : 'bg-white hover:text-blue-600']">
        Waiting Payment
    </button>

    <button 
        @click="getFilterValue('Cancelled')" 
        :class="['px-5 py-2 w-50 h-10  rounded-r-xl', filterValue === 'Cancelled' ? 'bg-blue-900 text-white' : 'bg-white hover:text-blue-600']">
        Cancelled
    </button>
</div>

  <ul class="max-h-134 overflow-y-auto py-5">
  <li v-for="(item, index) in filteredItems" :key="index">
    <slot :booked="item"> Booked </slot>
  </li>
</ul>
</template>