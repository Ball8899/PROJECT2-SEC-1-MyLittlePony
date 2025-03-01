<script setup>

</script>


<template>
 <div class="bg-amber-300/70">
   <div
     class="flex text-black py-5 items-center px-10 justify-between"
   >
     <h1 class="text-4xl font-bold">🐶 Just Goo</h1>
     <div class="relative">
       <input
         type="text"
         placeholder="Destination"
         class="ml-5 pl-10 pr-4 py-2 bg-white rounded-sm focus:outline-none w-64"
       />
       <svg
         class="absolute left-8 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
         xmlns="http://www.w3.org/2000/svg"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
       >
         <path
           stroke-linecap="round"
           stroke-linejoin="round"
           stroke-width="2"
           d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010 17.5a7.5 7.5 0 006.65-3.85z"
         />
       </svg>
     </div>
     <div class="flex text-lg gap-3 ml-auto">
       <p class="py-1.5 px-3 rounded-sm">Customer Support</p>
       <p class="py-1.5 px-3 rounded-sm">EN</p>
       <p class="py-1.5 px-3 rounded-sm">THB</p>
       <p class="py-1.5 px-3 rounded-sm bg-white/80">Search Bookings</p>
       <p class="bg-white py-1.5 px-3 rounded-sm">Sign in / Register</p>
     </div>
   </div>
   <div class="pb-4 px-10">
     <div
       class="flex gap-8 text-xl font-light text-black"
     >
       <p class="hover:text-black hover:bg-white px-1.5 cursor-pointer">Hotels & Homes</p>
       <p class="hover:text-black hover:bg-white px-1.5 cursor-pointer">Flights</p>
       <p class="hover:text-black hover:bg-white px-1.5 cursor-pointer">Cars</p>
       <p class="hover:text-black hover:bg-white px-1.5 cursor-pointer">Attractions & Tours</p>
       <p class="hover:text-black hover:bg-white px-1.5 cursor-pointer">Flight + Hotel</p>
       <p class="hover:text-black hover:bg-white px-1.5 cursor-pointer">Destinations</p>
     </div>
   </div>
 </div>
</template>


<style scoped>
body {
 font-family: "Raleway";
}
</style>