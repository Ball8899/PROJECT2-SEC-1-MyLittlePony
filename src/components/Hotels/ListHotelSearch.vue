<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";
import { getHotelById } from "../../utils/fetchUtil";
const route = useRoute();
const hotelsData = ref([]);
const router = useRouter();

const queryParams = ref({
  provinces: "",
  price: "",
  capacity: 0,
  ids: [],
});

onMounted(async () => {
  queryParams.value.provinces = route.query.provinces || "";
  queryParams.value.price = route.query.price || "";
  queryParams.value.capacity = route.query.capacity
    ? parseInt(route.query.capacity)
    : 0;

  if (route.query.ids) {
    queryParams.value.ids = route.query.ids.split(",");
  } else {
    queryParams.value.ids = [];
  }

  await fetchHotels();
});

const fetchHotels = async () => {
  try {
    if (queryParams.value.ids.length === 0) {
      console.log("No hotel IDs found in query parameters");
      loading.value = false;
      return;
    }

    const apiUrl = `${import.meta.env.VITE_APP_URL}/hotels`;
    const data = await getHotelById(apiUrl, queryParams.value.ids);

    if (!data || data.length === 0) {
      const allHotels = await getHotels(apiUrl);
      const filteredHotels = allHotels.filter((hotel) =>
        queryParams.value.ids.includes(hotel.id)
      );
      hotelsData.value = filteredHotels;
    } else {
      hotelsData.value = data;
    }
  } catch (error) {
    error.value = "Failed to fetch hotel data. Please try again.";
  }
};

const safeHotelsData = computed(() =>
  Array.isArray(hotelsData.value) ? hotelsData.value : []
);

const routerToHotelDetail = (id) => {
  router.push({ name: "hotelDetail", params: { hotelId: id } });
};
</script>

<template>
  <div class="container mx-auto px-48 py-8 mt-20">
    <div
      class="space-y-8 rounded-xl py-5 bg-blue-100"
      :class="{ 'bg-white': safeHotelsData.length == 0 }"
    >
      <div
        v-for="(hotel, index) in safeHotelsData"
        :key="hotel.id"
        class="flex bg-white shadow-lg rounded-xl overflow-hidden max-w-3xl mx-auto"
      >
        <div class="flex">
          <div class="w-1/3 relative">
            <img
              src="../../assets//hotels/hotel2.jpg"
              alt="Hotel Image"
              class="w-full h-full object-cover"
            />
            <div
              class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1"
            >
              <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
            </div>
          </div>

          <div class="w-2/3 h-60 p-5">
            <h2 class="text-xl font-bold text-gray-900 flex items-center">
              {{ hotel.name }}
            </h2>
            <div class="flex items-center mt-2">
              <span
                class="bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-semibold"
                >{{ hotel.rating }}/5</span
              >
              <span class="text-blue-700 font-semibold ml-2">Very Good</span>
              <span class="text-gray-500 ml-2"
                >{{ hotel.reviews }} reviews</span
              >
            </div>

            <div class="p-2 rounded-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide absolute text-gray-500 lucide-map-pin"
              >
                <path
                  d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"
                />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <p class="text-gray-500 ml-6 pt-1 text-sm">{{ hotel.address }}</p>
            </div>

            <div class="flex justify-between items-center mt-4">
              <div>
                <p class="text-xl font-bold">฿ {{ hotel.price }}</p>
              </div>
              <button
                @click="routerToHotelDetail(hotel.id)"
                class="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
              >
                Check Availability
              </button>
            </div>
          </div>
        </div>
      </div>



      <div class="border border-yellow-500" v-if="safeHotelsData.length === 0">
        <div class="bg-white rounded-md shadow-lg  flex px-8 py-10">
          <div class="text-center min-w-64 py-10">
            <div class="mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-16 top-65 w-16 mx-auto absolute text-yellow-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <h1  @click="router.go(-1)" class="text-4xl ml-23 top-75  hover:text-blue-500 cursor-pointer   font-semibold text-gray-700 mb-2">Please search again.</h1>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
