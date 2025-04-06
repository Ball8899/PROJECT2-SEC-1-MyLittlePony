<script setup>
import { defineProps } from "vue";

const props = defineProps({
  status: String,
  reason: String,
  bookingNo: String,
  pin: String,
});
</script>

<template>
  <div class="bg-white p-7 shadow-md w-full max-w-3xl mt-4 mx-auto sm:ml-24 rounded-xl rounded-xl">
    <h2 class="text-xl font-bold">
      <span v-if='status' class="text-2xl text-orange-600">{{ status }}</span>
      <span v-else class="text-2xl text-gray-800">Cancelled</span>
    </h2>
    <p v-if="reason" class="text-gray-600 text-sm mt-2">{{ reason }}</p>
    <p class="text-gray-600 text-sm mt-1">Booking No. {{ bookingNo }}</p>
    <p v-if="pin" class="text-blue-600 text-sm mt-1">PIN {{ pin }}</p>
    <div class="mt-4 flex justify-end">
      <slot name="action"></slot>
    </div>
  </div>
</template>


