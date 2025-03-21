<script setup></script>
<template>
 <a href="HotelDetailPage.vue">
  <div
    class="z-20 bg-white rounded-2xl shadow-lg transition-transform 
    duration-300 hover:-translate-y-2 w-64 h-84 flex flex-col"
  >
    <slot name="image">
      <img alt="Hotel Image" class="w-full   h-32 object-cover" />
    </slot>

    <div class="p-4 py-1">
      <div class="flex items-center space-x-2 mb-2">
        <span
          class="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-lg"
        >
          <slot name="hotelRating">rating</slot>
        </span>

        <span class="text-gray-500 text-xs ">
          <slot name="hotelReviews">reviews</slot>
        </span>
      </div>

      <p class="font-semibold text-lg mb-1 " >
        <slot name="hotelName">Name</slot>
      </p>

      <p class="font-normal text-gray-500 text-xs mb-2">
        <slot name="hoteladdress">address</slot>
      </p>

      <div class="flex items-center justify-end ">
        <span class="text-xl font-bold">฿</span>
        <span class="font-bold text-lg ml-1">
          <slot name="hotelPrice">Price</slot>
        </span>
      </div>
    </div>
  </div>
 </a>
</template>
