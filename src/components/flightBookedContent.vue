<script setup>
import filterFlightBooked from "./components/filterFlightBooked.vue";
import flight from "../data/flight.json";
import flightBookedSideBar from "./components/flightBookedSideBar.vue";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div>
    <Navbar />
  </div>
  <div class="flex flex-row"> <flightBookedSideBar class="w-1/4 mr-6" /> <div class="flex flex-col bg-gray-100 p-6 rounded-lg shadow-md">
   
   <filterFlightBooked :items="flight" v-slot="{ booked }">
     <div class="bg-white p-6 rounded-lg shadow-lg w-full mb-5 justify-center ">
       <div class="flex justify-between items-center border-b pb-4 mb-4">
         <div>
           <span class="text-gray-600">หมายเลขการจอง:</span>
           <a href="#" class="text-blue-500">{{ booked.booking_id }}</a>
         </div>
         <span class="text-gray-600">วันที่จอง: 14 มีนาคม 2025</span>
       </div>
       <div class="flex items-center">
         <img
           :src="booked.image"
           alt="flight image"
           class="w-32 h-20 rounded-lg mr-4"
         />
         <div>
           <p class="text-lg font-semibold">
             {{ booked.flights[0].from }} (DMK) → {{ booked.flights[0].to }} (CEI)
           </p>
           <p class="text-gray-500">
             {{ booked.flights[0].departure_time }} - {{ booked.flights[0].arrival_time }}
             <span class="ml-2 text-red-500">{{ booked.flights[0].airline }}</span>
           </p>
           <p class="text-gray-500">เที่ยวบิน: {{ booked.flights[0].flight_number }}</p>
         </div>
       </div>
       <div class="mt-4">
         <span class="text-gray-600">ผู้โดยสาร:</span>
         <span class="font-semibold">{{ booked.passenger.name }}</span>
         <span class="text-gray-500">({{ booked.passenger.number_of_passengers }} คน)</span>
       </div>
       <div class="flex justify-between items-center mt-6">
         <span class="text-xl font-bold text-gray-700">฿{{ booked.total_price }}</span>
         <button class="ml-4 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600">
           ชำระ
         </button>
       </div>
     </div>
   </filterFlightBooked>
 </div></div>
  
</template>

<style scoped></style>