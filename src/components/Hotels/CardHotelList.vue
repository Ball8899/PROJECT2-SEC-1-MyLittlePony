<script setup>
import { getHotels } from "../../utils/fetchUtil";
import { useRoute } from "vue-router";
import { computed, ref,onMounted, defineEmits } from "vue";
defineEmits(["sendRoomId"]);
const hotels = ref([]);
const receivedRoomId = ref(null);
const route = useRoute();
onMounted(async () => {
  try {
    hotels.value = await getHotels(`${import.meta.env.VITE_APP_URL}/hotels`);
  } catch (error) {
    console.log(error);
  }
});

const validateRoomId = (roomId) => {
  receivedRoomId.value = roomId;
};


const selectFilterValue = ref("");



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
  if (selectFilterValue.value == "ALL") {
    return hotels.value;
  } else if (!selectFilterValue.value) {
    return hotels.value;
  }
  return hotels.value.filter(
    (hotel) => hotel.provinces === selectFilterValue.value
  );
});

</script>

<template>
  <div
    v-if="['', '/'].includes(route.path) && !receivedRoomId"
    @sendRoomId="validateRoomId"
    class=""
  >
    <div class="relative sm:px-23 md:px-60 lg:px-15 xl:px-45">
      <h1 class="text-3xl font-semibold text-blue-600 py-8">
        Featured Properties
      </h1>
      <div class="text-lg text-center gap-4 flex">
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
            @click="setFilterValue('CHIANG MAI')"
            class="bg-white shadow-lg px-4 max-w-38 cursor-pointer hover:text-white hover:bg-blue-600 py-1 rounded-sm"
          >
            CHIANG MAI
          </h1>
          <h1
            @click="setFilterValue('PHUKET')"
            class="bg-white shadow-lg px-4 max-w-32 cursor-pointer hover:text-white hover:bg-blue-600 py-1 rounded-sm"
          >
            PHUKET
          </h1>
          <h1
            @click="setFilterValue('SURAT THANI')"
            class="bg-white shadow-lg px-4 max-w-38 cursor-pointer hover:text-white hover:bg-blue-600 py-1 rounded-sm"
          >
            SURAT THANI
          </h1>
          <h1
            @click="setFilterValue('AYUTTHAYA')"
            class="bg-white shadow-lg px-4 max-w-32 cursor-pointer hover:text-white hover:bg-blue-600 py-1 rounded-sm"
          >
            AYUTTHAYA
          </h1>
      </div>
      <button
        @click="scrollLeft"
        class="absolute sm:left-18 md:left-56 lg:left-11 xl:left-39 -translate-y-1/2 left-38 hover:bg-blue-600 top-80 bg-white rounded-full p-2 shadow z-10 group"
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
        class="absolute sm:right-18 md:right-56 lg:right-11 xl:right-39 -translate-y-1/2 right-40 top-80 hover:bg-blue-600 bg-white rounded-full p-2 shadow z-10 group"
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
          :key="item.id"
          class="flex-shrink-0 w-64"
        >
          <router-link
            :to="{ name: 'hotelDetail', params: { hotelId: item.id } }"
          >
            <div
              class="z-20 bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-md border border-gray-100 transition-all duration-300 mb-4 sm:mb-6 md:mb-8 lg:mb-10 hover:-translate-y-1 w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col h-88 overflow-hidden sm:h-88 md:h-88 lg:h-88 xl:h-88"
            >
              <div class="relative">
                <img
                  src="../../assets/hotels/hotel2.jpg"
                  alt="Hotel Image"
                  class="w-full h-40 object-cover"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"
                ></div>
              </div>

              <div class="p-5 py-3 flex-1 flex flex-col">
                <div class="flex items-center space-x-2 mb-2">
                  <span
                    class="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-lg"
                  >
                    {{ item.rating }}
                  </span>

                  <span class="text-gray-500 text-xs">
                    {{ item.reviews }}
                  </span>
                </div>

                <p class="font-semibold text-lg mb-1">
                  {{ item.name }}
                </p>

                <p
                  class="font-normal text-lg text-gray-500 text-xs mb-2 flex-grow"
                >
                  {{ item.address }}
                </p>

                <div class="flex items-center justify-end mt-auto">
                  <span class="text-xl font-bold">฿</span>
                  <span class="font-bold text-lg ml-1">
                    {{ item.price }}
                  </span>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
