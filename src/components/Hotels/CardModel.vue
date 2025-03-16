<script setup>



</script>

<template>

    <div 
      class="z-20 bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-md border border-gray-100 
           transition-all duration-300 mb-4 sm:mb-6 md:mb-8 lg:mb-10 hover:-translate-y-1 
           w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col h-88 
           overflow-hidden sm:h-88 md:h-88 lg:h-88 xl:h-88"
    >
      <div class="relative">
        <slot name="image">
          <img alt="Hotel Image" class="w-full h-32 object-cover" />
        </slot>
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"
        ></div>
      </div>

      <div class="p-5 py-3 flex-1 flex flex-col">
        <div class="flex items-center space-x-2 mb-2">
          <span
            class="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-lg"
          >
            <slot name="hotelRating">rating</slot>
          </span>

          <span class="text-gray-500 text-xs">
            <slot name="hotelReviews">reviews</slot>
          </span>
        </div>

        <p class="font-semibold text-lg mb-1">
          <slot name="hotelName">Name</slot>
        </p>

        <p class="font-normal text-lg text-gray-500 text-xs mb-2 flex-grow">
          <slot name="hoteladdress">address</slot>
        </p>

        <div class="flex items-center justify-end mt-auto">
          <span class="text-xl font-bold">฿</span>
          <span class="font-bold text-lg ml-1">
            <slot name="hotelPrice">Price</slot>
          </span>
        </div>
      </div>
    </div>
</template>
