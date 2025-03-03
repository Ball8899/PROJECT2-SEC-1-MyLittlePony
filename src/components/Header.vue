<script setup>
import { ref } from 'vue'
import Booking from './Booking.vue' 
const showBooking = ref(true)


const toggleBooking = () => {
    showBooking.value = !showBooking.value
}

</script>

<template>
 <div class="flex justify-center items-center h-[600px] bg-black/40 w-screen">
   <div class="relative h-[300px]">
       <div class="z-20 text-white text-center relative"> 
           <h1 class="text-shadow-xl text-5xl font-bold">Your Trip Your Happiness</h1>
           <div class="text-lg flex py-5 flex-row gap-10 justify-center">
               <p>🏖️ Garantee your trip here</p>
               <p>🚀 Support 24/7 HRs</p>
           </div>
           <div class="mt-10 flex flex-row items-center justify-center rounded-4xl font-bold text-2xl bg-black/80 backdrop-blur text-white">
               <p class="px-8 py-4 hover:bg-white hover:rounded-xl hover:text-black">🏨 Hotels & Homes</p>
               <p @click="toggleBooking" class="px-8 py-4 hover:bg-white hover:rounded-xl hover:text-black">✈️ Flights</p>
               <p class="px-8 py-4 hover:bg-white hover:rounded-xl hover:text-black">🚘 Cars</p>
               <p class="px-8 py-4 hover:bg-white hover:rounded-xl hover:text-black">🗺️ Attractions & Tours</p>
           </div>
       </div>
       <Booking class=" rounded-xl w-[1400px] -mt-7.5 z-10 absolute left-1/2 transform -translate-x-1/2" v-if="showBooking"/> <!-- แก้ z-10 เป็น z-20 -->
   </div>
 </div>
</template>


<style scoped>
body {
 font-family: "Raleway";
}
@media (min-width: 1024px) {
}
</style>