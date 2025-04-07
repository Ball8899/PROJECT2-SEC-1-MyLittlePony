<script setup>
import { useRouter } from "vue-router";
const router = useRouter()

const routerToHotel = () => {
  router.push({ name: "HotelBookedContent"});
};
const rounterToflight = () =>{
  router.push({name:"flightBookedContent"})
}
</script>

<template>
  <div class="text-lg w-[290px] text-gray-600 border-r-1 border-gray-200"> 
    <div class="py-5">
        <p class="px-8 py-7 flex flex-row gap-6 items-center font-bold">My Bookings</p>
        <button class="cursor-pointer w-[100%] hover:py-7 hover:bg-gray-100 duration-300 px-8 py-5 flex flex-row gap-6 items-center hover:text-blue-600"><a href="">All</a></button>
        <button class="cursor-pointer w-[100%] hover:py-7 hover:bg-gray-100 duration-300 px-8 py-5 flex flex-row gap-6 items-center hover:text-blue-600"><a href="" @click="rounterToflight">Flight</a></button>
        <button class="cursor-pointer w-[100%] hover:py-7 hover:bg-gray-100 duration-300 px-8 py-5 flex flex-row gap-6 items-center hover:text-blue-600"><a href="" @click="routerToHotel">Hotel</a></button>
        <button class="cursor-pointer w-[100%] hover:py-7 hover:bg-gray-100 duration-300 px-8 py-5 flex flex-row gap-6 items-center hover:text-blue-600"><a href="">Trains</a></button>
        <button class="cursor-pointer w-[100%] hover:py-7 hover:bg-gray-100 duration-300 px-8 py-5 flex flex-row gap-6 items-center hover:text-blue-600"><a href="">Cars</a></button>
        <button class="cursor-pointer w-[100%] hover:py-7 hover:bg-gray-100 duration-300 px-8 py-5 flex flex-row gap-6 items-center hover:text-blue-600"><a href="">Package</a></button>
        <button class="cursor-pointer w-[100%] hover:py-7 hover:bg-gray-100 duration-300 px-8 py-5 flex flex-row gap-6 items-center hover:text-blue-600"><a href="">Insurance</a></button>
    </div>
    
  </div>
</template>

<style scoped>


</style>
