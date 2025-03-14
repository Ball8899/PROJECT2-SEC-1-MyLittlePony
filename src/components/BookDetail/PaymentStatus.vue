<script setup>

</script>

<template>
  <div class="bg-white p-7 shadow-md w-full max-w-3xl mt-4 mx-auto sm:ml-24">
    <h2 class="text-xl font-bold"><slot name="status">Canceled</slot></h2>
    <p class="text-gray-600 text-sm mt-2">
      <slot name="reason">
        Reason for cancellation: Booking canceled by user</slot
      >
    </p>
    <p class="text-gray-600 text-sm mt-1">
      Booking No. <slot name="bookingNo"></slot> 
    </p>
    <p v-if="$slots.pin" class="text-blue-600 text-sm mt-1">
        PIN <slot name="pin"></slot>
    </p>
    <div class="mt-4 flex justify-end">
      <slot name="action"></slot>
    </div>
  </div>
</template>
