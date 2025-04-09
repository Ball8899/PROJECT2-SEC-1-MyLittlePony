<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getHotels } from "../../utils/fetchUtil.js";
import DestinationDialog from "../DestinationDialog.vue"


const hotels = ref([]);
const filteredProvinces = ref("");
const filteredPrice = ref("");
const storefilteredHotels = ref([]);
const numberCapacity = ref(0);
const router = useRouter();

defineEmits(['update'])


defineProps({
  showToggle: Boolean,
});

const storeValue = ref({
  showProvinces: false,
  showFilterPrice: false,
  showFilterCapacity: false,

});



const closeToggle = () => {
  if (storeValue.value.showProvinces === true) {
    storeValue.value.showProvinces = false;
    return;
  }
  if (storeValue.value.showFilterPrice === true) {
    storeValue.value.showFilterPrice = false;
    return;
  }
  if (storeValue.value.showFilterCapacity === true) {
    storeValue.value.showFilterCapacity = false;
    return;
  } else {
    return;
  }
};

onMounted(async () => {
  try {
    const data = await getHotels(`${import.meta.env.VITE_APP_URL}/hotels`);
    hotels.value = data;
    storefilteredHotels.value = hotels.value;
  } catch (error) {
    console.error("Error fetching hotels:", error);
  }
});


const handleDestination = (data) => {
  if (data.type === "going") {
    filteredProvinces.value = data.value
  }
  return true
}

watch([filteredProvinces, filteredPrice, numberCapacity], () => {
  applyFilters();
});

const applyFilters = () => {
  let filtered = hotels.value;

  if (filteredProvinces.value) {
    filtered = filtered.filter(
      (hotel) => hotel.provinces === filteredProvinces.value.toUpperCase()
    );
  }

  if (filteredPrice.value) {
    const priceRangeStr = filteredPrice.value.split("-");
    const priceRange = [
      parseInt(priceRangeStr[0].replace(/,/g, "")),
      parseInt(priceRangeStr[1].replace(/,/g, "")),
    ];

    if (priceRange.length === 2) {
      filtered = filtered.filter(
        (hotel) => hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
      );
    }
  }

  if (numberCapacity.value > 0) {
    filtered = filtered.filter((hotel) =>
      hotel.rooms.some((room) => room.capacity >= numberCapacity.value)
    );
  }

  storefilteredHotels.value = filtered;
};

const mapPrice = (price) => {
  filteredPrice.value = price;
  storeValue.value.showFilterPrice = false;
};

const toggle = (nameDialog) => {
  Object.keys(storeValue.value).forEach((key) => {
    if (key !== nameDialog) {
      storeValue.value[key] = false;
    }
    
  });

  storeValue.value[nameDialog] = !storeValue.value[nameDialog];
};

const increaseOrDecreaseCapacity = (value) => {
  if (value === "increase") {
    numberCapacity.value++;
  } else if (value === "decrease" && numberCapacity.value > 0) {
    numberCapacity.value--;
  }
};

const searchHotel = () => {
  if (
    !filteredProvinces.value &&
    !filteredPrice.value &&
    numberCapacity.value === 0
  ) {
    return;
  }

  const hotelIds = storefilteredHotels.value.map((hotel) => hotel.id);
  router.push({
    path: "/pageHotelList",
    query: {
      provinces: filteredProvinces.value,
      price: filteredPrice.value,
      capacity: numberCapacity.value,
      ids: hotelIds.join(","),
    },
  });
};
</script>

<template>
  <div @click="closeToggle" class="bg-white text-black h-auto pt-10 pb-5 rounded-lg">
    <div class="flex flex-row px-10 mt-2 gap-2 justify-between">
      <div class="relative">
        <button
          :class="{ 'rounded-sm': filteredProvinces }"
          @click.stop="toggle('showProvinces')"
          class="w-72 text-left h-13 text-gray-800 text-sm font-bold border border-gray-300 p-4 rounded-md flex justify-between items-center"
        >
          <span
            class="text-gray-300 absolute"
            :class="{
              'text-gray-800 w-68 rounded-sm right-2 h-10 p-1 pl-2 bg-blue-100/80':
                filteredProvinces,
            }"
          >
            {{ filteredProvinces || "Provinces" }}
          </span>
        </button>

       
        <DestinationDialog
          @destination-selected="handleDestination"
          :type="'going'"
          class="w-[550px] absolute -mt-14 z-100"
          v-if="storeValue.showProvinces"
        ></DestinationDialog>
      </div>

      <div class="relative">
        <button
          @click.stop="toggle('showFilterPrice')"
          class="w-72 text-left text-gray-800 text-sm font-bold border border-gray-300 h-13 rounded-md flex justify-between items-center"
        >
          <span
            class="text-gray-300 pl-4"
            :class="{
              'text-gray-800 w-69 text-base rounded-sm h-10 p-1 ml-1 bg-blue-100/80':
                filteredPrice,
            }"
          >
            {{ filteredPrice || "Price Range" }}
          </span>
        </button>

        <div
          v-if="storeValue.showFilterPrice"
          class="bg-white p-4 w-72 rounded-md absolute mt-1 shadow-lg z-10"
        >
          <h3 class="text-lg mb-3 font-semibold">Price Range</h3>
          <div class="bg-gray-50 p-3 rounded-lg">
            <ul class="space-y-1.5">
              <li
                v-for="range in [
                  '500-1,000',
                  '1,000-3,000',
                  '3,000-6,000',
                  '6,000-8,000',
                  '10,000-20,000',
                  '20,000-50,000',
                ]"
                :key="range"
                @click="mapPrice(range)"
                class="cursor-pointer hover:bg-blue-50 hover:text-blue-600 p-2.5 rounded-md transition-all flex items-center justify-between"
                :class="{
                  'bg-blue-100 text-blue-700 font-medium shadow-sm': filteredPrice === range,
                }"
              >
                <div class="flex items-center">
                  <span class="text-blue-500 mr-2">฿</span>
                  <span>{{ range }}</span>
                </div>
                <svg
                  v-if="filteredPrice === range"
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="relative">
        <div
          @click.stop="toggle('showFilterCapacity')"
          class="w-72 text-left text-gray-800 font-medium border border-gray-300 p-4 rounded-md flex justify-between items-center cursor-pointer hover:border-blue-400 transition-colors"
        >
          <div class="flex flex-col">
            <p class="text-sm text-gray-500">Capacity</p>
            <p class="font-semibold text-sm mt-1">
              {{ numberCapacity }}
              {{ numberCapacity === 1 ? "Person" : "People" }}
            </p>
          </div>
        </div>

        <div
          v-if="storeValue.showFilterCapacity"
          class="absolute top-full left-0 mt-2 w-full bg-white shadow-xl rounded-lg py-4 px-6 border border-gray-100 z-10 transition-all duration-200 ease-in-out"
        >
          <div class="flex items-center justify-between">
            <span class="text-gray-700 font-medium">People</span>
            <div class="flex items-center space-x-3">
              <button
                @click="increaseOrDecreaseCapacity('decrease')"
                class="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors duration-200"
                :class="{ 'opacity-50 cursor-not-allowed': numberCapacity <= 0 }"
                :disabled="numberCapacity <= 0"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" />
                </svg>
              </button>
              <span class="w-8 text-center font-bold text-lg">{{ numberCapacity }}</span>
              <button
                @click="increaseOrDecreaseCapacity('increase')"
                class="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-row gap-2 justify-end mt-5 px-5">
      <button
        @click="searchHotel"
        class="border-2 border-blue-600 bg-blue-600 rounded-lg text-xl font-light px-5 py-3 text-white"
      >
        <i class="fa-solid fa-magnifying-glass mr-3"></i>Search
      </button>
    </div>
  </div>

  <div v-if="router.path === '/pageHotelList'">
    <router-view></router-view>
  </div>
</template>
