<script setup>

import router from '@/router';
const routerTo = () => {
  router.push({ name: "flightBookedContent"});
};

</script>

<template>
  <div class="flex flex-row px-5 py-1 justify-between">
    <div class="text-xl flex flex-row items-center">
      <button class="w-[100%] px-4.5 py-2.5 flex flex-row gap-6">
        <i class="fa-solid fa-bars"></i>
      </button>
      <div class="ml-3 flex flex-row">
       <a href="http://localhost:5173/" class="flex">
        <h1 class="text-blue-700 text-3xl font-bold">JET</h1>
        <h1 class="text-amber-400 font-bold text-2xl">.</h1>
        <h1 class="text-amber-400 font-bold text-2xl">GO</h1>
      </a>
      </div>
      <div class="pl-10 relative mx-auto text-gray-600">
        <input class="border-1 border-gray-300 bg-white h-10 px-5 pr-19 rounded-lg text-sm focus:outline-none"
          type="search"  name="search" placeholder="Destinations">
        <button type="submit" class="absolute right-0 top-0 mt-3 mr-4">
          <svg class="text-blue-600 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 56.966 56.966" style="enable-background:new 0 0 56.966 56.966;" xml:space="preserve"
            width="512px" height="512px">
            <path
              d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
          </svg>
        </button>
      </div>
    </div>

    <div class="text-sm flex flex-row justify-center items-center gap-5 text-md text-gray-600 mr-5">
      <button class="hover:bg-gray-100 px-4 py-2 rounded-lg">
        List Your Property
      </button>
      <button
        class="flex flex-row justify-center items-center hover:bg-gray-100 px-4 py-2 rounded-lg"
      >
        🌐
        <p
          class="px-1 text-sm text-gray-300 hover:bg-gray-100 p-2.5 rounded-lg"
        >
          |
        </p>
        <p>THB</p>
      </button>
      <button class="hover:bg-gray-100 px-4 py-2 rounded-lg">
        Customer Support
      </button>
      <button class="hover:bg-gray-100 px-4 py-2 rounded-lg" @click="routerTo">My Booking</button>
      <button class="hover:bg-amber-400 hover:text-black duration-500 px-4 py-2 rounded-lg bg-blue-600/90 text-white">
        Sign in / Register
      </button>
    </div>
  </div>
  <hr class="text-gray-200" />
</template>

<style scoped>
@media (min-width: 1024px) {
}
</style>
