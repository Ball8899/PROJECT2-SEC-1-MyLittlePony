<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { getHotels } from "../../utils/fetchUtil.js";
const hotels = ref([]);
const filteredProvinces = ref("");
const filteredPrice = ref("");
const storefilteredHotels = ref([]);
const numberCapacity = ref(0);
const router = useRouter();
const route = useRoute()

const storeValue = ref({
  showProvinces: false,
  showFilterPrice: false,
  showFilterCapacity: false,
});



onMounted(async () => {
  try {
    const data = await getHotels(`${import.meta.env.VITE_APP_URL}/hotels`);
    hotels.value = data;
    storefilteredHotels.value = hotels.value;
  } catch (error) {
    console.error("Error fetching hotels:", error);
  }
});

watch([filteredProvinces, filteredPrice, numberCapacity], () => {
  applyFilters(); 
});

const applyFilters = () => {
  let filtered = hotels.value;

  if (filteredProvinces.value) {
    filtered = filtered.filter(
      (hotel) => hotel.provinces === filteredProvinces.value
    );
  }

  if (filteredPrice.value) {
    const priceRangeStr = filteredPrice.value.split("-");

    const priceRange = [
      parseInt(priceRangeStr[0].replace(/,/g, '')), 
      parseInt(priceRangeStr[1].replace(/,/g, ''))
    ];
    
    if (priceRange.length === 2) {
      filtered = filtered.filter(
        (hotel) => hotel.price >= priceRange[0] && hotel.price <= priceRange[1]
      );
    }
  }

  if (numberCapacity.value > 0) {
    filtered = filtered.filter(
      (hotel) => hotel.rooms.some(room => room.capacity >= numberCapacity.value)
    );
  }

  storefilteredHotels.value = filtered;
};

const filterProvinces = (name) => {
  filteredProvinces.value = name;
  storeValue.value.showProvinces = false; 
};

const mapPrice = (price) => {
  filteredPrice.value = price;
  storeValue.value.showFilterPrice = false; 
};

const toggle = (nameDialog) => {
  Object.keys(storeValue.value).forEach(key => {
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
  if (!filteredProvinces.value && !filteredPrice.value && numberCapacity.value === 0) {
    return; 
  }
  const hotelIds = storefilteredHotels.value.map(hotel => hotel.id);
  router.push({
    path: '/pageHotelList',
    query: {
      provinces: filteredProvinces.value,
      price: filteredPrice.value,
      capacity: numberCapacity.value,
      ids: hotelIds.join(',')
    }
  });
};
</script>


<template>
  <div  class="bg-white text-black h-auto pt-10 pb-5 rounded-lg">
    <div class="flex flex-row px-10 mt-2 gap-2 justify-between">
      <div class="relative">
        <div>
          <button
            @click.stop="toggle('showProvinces')"
            class="w-[240px] text-left text-gray-800 text-sm font-bold border border-gray-300 p-4 rounded-md flex justify-between items-center"
          >
            <span>{{ filteredProvinces || 'Provinces' }}</span>
            <span>▼</span>
          </button>
        </div>

        <div
          v-if="storeValue.showProvinces"
          class="bg-white p-4 w-[280px] rounded-md absolute mt-1 shadow-lg z-10"
        >
          <div class="font-semibold">
            <h3 class="text-lg mb-2">Thailand</h3>
            <div class="font-light pt-2 text-sm space-y-2">
              <div class="grid grid-cols-2 gap-2">
                <div 
                  v-for="province in ['BANGKOK', 'CHIANG MAI', 'PHUKET', 'SURAT THANI', 'AYUTTHAYA', 'PRACHUAP KHIRI KHAN']" 
                  :key="province"
                  @click="filterProvinces(province)"
                  class="cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
                  :class="{'bg-blue-100': filteredProvinces === province}"
                >
                  {{ province }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="relative">
        <button
          @click.stop="toggle('showFilterPrice')"
          class="w-[240px] text-left text-gray-800 text-sm font-bold border border-gray-300 p-4 rounded-md flex justify-between items-center"
        >
          <span>{{ filteredPrice || 'Price Range' }}</span>
          <span>▼</span>
        </button>

        <div 
          v-if="storeValue.showFilterPrice"
          class="bg-white p-4 w-[240px] rounded-md absolute mt-1 shadow-lg z-10"
        >
          <div class="font-medium text-sm">
            <ul class="space-y-2">
              <li
                v-for="range in ['500-1,000', '1,000-3,000', '3,000-6,000', '6,000-8,000', '10,000-20,000', '20,000-50,000']"
                :key="range"
                @click="mapPrice(range)"
                class="cursor-pointer hover:bg-gray-100 p-2 rounded-md transition-colors"
                :class="{'bg-blue-100': filteredPrice === range}"
              >
                ฿{{ range }}
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="relative">
        <div
          class="w-[240px] text-left text-gray-800 text-sm font-bold border border-gray-300 p-4 rounded-md flex justify-between items-center"
        >
          <p>Adults</p>
          <div class="flex items-center space-x-3">
            <button
              @click="increaseOrDecreaseCapacity('decrease')"
              class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-blue-600 hover:text-white"
              :disabled="numberCapacity <= 0"
            >
              -
            </button>
            <span class="w-5 text-center">{{ numberCapacity }}</span>
            <button
              @click="increaseOrDecreaseCapacity('increase')"
              class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-blue-600 hover:text-white"
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-row gap-2 justify-end mt-5 px-5">
      <div>
        <button
          @click="searchHotel"
          class="border-2 border-blue-600 bg-blue-600 rounded-lg text-xl font-light px-5 py-3 text-white"
        >
          <i class="fa-solid fa-magnifying-glass mr-3"></i>Search
        </button>
      </div>
    </div>
    
    <div class="mt-4 px-10 text-gray-600">
      
    </div>
  </div>

  <div v-if="router.path === '/pageHotelList'">
    <router-view></router-view>
  </div>
</template>