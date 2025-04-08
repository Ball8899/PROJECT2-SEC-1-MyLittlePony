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

      <div
        class="border border-blue-500 rounded-lg overflow-hidden shadow-lg"
        v-if="safeHotelsData.length === 0"
      >
        <div class="bg-gradient-to-r from-blue-50 to-white p-8">
          <div
            class="flex flex-col items-center justify-center py-10 text-center"
          >
            <div class="relative mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-20 w-20 text-blue-500 mb-2"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"
                ></path>
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-8 w-8 text-blue-300 absolute -top-2 -right-4 transform rotate-45"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path
                  d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
                ></path>
              </svg>
            </div>

            <div class="space-y-4">
              <h1
                @click="router.go(-1)"
                class="text-3xl font-bold text-blue-700 hover:text-blue-500 transition-colors duration-300 cursor-pointer"
              >
                No flights found
              </h1>

              <p class="text-blue-600 max-w-md">
                We couldn't find any flights matching your search criteria.
                Please try different dates or destinations.
              </p>

              <button
                @click="router.go(-1)"
                class="mt-4 inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors duration-300 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7"></path>
                </svg>
                Search again
              </button>
            </div>

            <div class="w-full mt-8 flex items-center justify-center">
              <div class="h-0.5 w-16 bg-blue-200 rounded-full"></div>
              <div class="h-3 w-3 mx-1 rounded-full bg-blue-400"></div>
              <div class="h-0.5 w-16 bg-blue-200 rounded-full"></div>
              <div class="h-3 w-3 mx-1 rounded-full bg-blue-400"></div>
              <div class="h-0.5 w-16 bg-blue-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
