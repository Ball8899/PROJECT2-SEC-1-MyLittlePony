<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { getHotelById } from "../../utils/fetchUtil";
const route = useRoute();
const hotelsData = ref([]);

const hotelId = ref([])


onMounted(async () => {
  if(route.query.ids){
    hotelId.value = route.query.ids.split(',').map(Number);
  }
  try {
    if (hotelId.value.length === 0) {
      console.log("not found room ID or not found Hotel ID");
      return
    }
    const apiUrl = `${import.meta.env.VITE_APP_URL}/hotels`;
    hotelsData.value = await getHotelById(apiUrl, hotelId.value);
  } catch (error) {
    console.error("Error fetching hotels:", error);
  }
});

 const safeHotelsData = computed(() => Array.isArray(hotelsData.value) ? hotelsData.value : []);



</script>

<template>
  <div v-for="(hotel,index) in safeHotelsData" :key="index" class="absolute top-32  flex bg-white  shadow-lg ml-65  h-72 rounded-xl overflow-hidden max-w-4xl">
    <div class="w-1/3 relative">
      <img src="../../assets//hotels/hotel2.jpg" alt="Hotel Image" class="w-full h-full object-cover" />
      <div class="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
        <span class="w-2 h-2 bg-gray-300 rounded-full"></span>
      </div>
    </div>
    
    <div class="w-2/3 p-5">
      <h2 class="text-xl font-bold text-gray-900 flex items-center">
        {{ hotel.name }}
      </h2>
      <div class="flex items-center mt-2">
        <span class="bg-blue-600 text-white px-2 py-1 rounded-md text-sm font-semibold">{{hotel.rating}}/5</span>
        <span class="text-blue-700 font-semibold ml-2">Very Good</span>
        <span class="text-gray-500 ml-2">{{hotel.reviews}}reviews</span>
      </div>
     
    
      <div class="bg-gray-100 p-3 rounded-lg mt-3">
        <p class="font-semibold">Garden View Room </p>
        <p class="text-gray-500 text-sm">Last booked lastBooked mins ago</p>
      </div>
      
      <div class="flex justify-between items-center mt-4">
        <div>
          <p class="text-2xl font-bold">{{ hotel.price }}</p>
          <p class="text-gray-500 text-sm">Total (incl. taxes & fees): ฿ price</p>
        </div>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
          Check Availability 
        </button>
      </div>
    </div>
  </div>
</template>