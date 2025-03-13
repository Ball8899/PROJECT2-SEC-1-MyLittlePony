<script setup>
import {ref} from 'vue';
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
  return props.items.filter(item => item.status === filterValue.value);
});
</script>

<template>
  <div>
    <button @click="getFilterValue('All')">All Booked</button>
    <button @click="getFilterValue('Waiting')">Waiting For Payment</button>
    <button @click="getFilterValue('Review')">Waiting For Review</button>
  </div>
  <ul>
      <li v-for="(item, index) in filteredItems" :key="index">
        <slot name="Booked" :Item="item"> Booked </slot>
      </li>
    </ul>
</template>
