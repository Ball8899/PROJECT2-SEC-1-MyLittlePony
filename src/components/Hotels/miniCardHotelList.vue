<script setup>
import CardModel from "./CardModel.vue";
import listModel from "../listModel.vue";
import hotels from "../../../data/Hotels.json";
import { ref, computed } from "vue";

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

// onMounted(async () => {
//   try {
//     hotel.value = await getHotels(`${import.meta.env.VITE_APP_URL}/hotels`);
//   } catch (error) {
//     console.error("Error fetching hotels:", error);
//   }
// });
</script>

<template>
  <div class=" absolute h-48">
    <div class="">
      <button
        @click="scrollLeft"
        class="absolute -translate-y-1/2 hover:bg-blue-600 top-40 bg-white rounded-full  p-2 shadow z-20 group"
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
        class="absolute -translate-y-1/2 hover:bg-blue-600 
        top-40 bg-white rounded-full p-2 shadow z-20 group -right-3
        sm:-right-5"
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
    </div>

    <div
      ref="scrollContainer"
      class="sm:w-135 md:w-165 lg:w-175   flex flex-nowrap w-175 left-3  gap-4 overflow-hidden py-4 relative scroll-smooth"
    >
      <div
        v-for="(item, index) in hotels"
        :key="index"
        class="flex-shrink-0 w-55"
      >
        <CardModel>
          <template #image>
            <img src="https://picsum.photos/300/200" alt="" />
          </template>
          <template #hotelRating>
            {{ item.rating }}
          </template>
          <template #hotelName>
            {{ item.name }}
          </template>
          <template #hoteladdress>
            {{ item.address }}
          </template>
          <template #hotelPrice>
            {{ item.price }}
          </template>
        </CardModel>
      </div>
    </div>
  </div>
</template>
