<script setup>
import { ref } from 'vue'
import Calendar from './Calender.vue'
const current = new Date().toLocaleDateString()

const showCalendar = ref(false)
const toggleCalendar = () => {
    showCalendar.value = !showCalendar.value
}
    
</script>

<template>
  <div class="bg-white text-black h-[200px] py-15 px-10">
    <div class="flex flex-row gap-5">
      <div class="hover:bg-gray-100 px-3 py-1 transition-all duration-300"> 
        <input class="" type="radio" name="type" id="round-trip" value="Round Trip" />
        <label class="ml-2 text-bold text-xl" for="round-trip">Round Trip</label>
      </div>
      <div class="hover:bg-gray-100 px-3 py-1 transition-all duration-300">
        <input type="radio" name="type" id="one-way" value="One Way" />
        <label class="ml-2 text-bold text-xl" for="one-way">One way</label>
      </div>
    </div>
    <div class="flex flex-row mt-2 gap-2">
        <div>
            <button class="w-[300px] text-left text-gray-500 text-lg font-bold border-2 border-gray-300 p-4 rounded-md" >Leaving</button>
            <button class="w-[300px] text-left text-gray-500 ml-2 text-lg font-bold border-2 border-gray-300 p-4 rounded-md">Going to</button>
        </div>
        <div>
            <button @click="toggleCalendar" class="w-[300px] text-left text-gray-500 text-lg font-bold border-2 border-gray-300 p-4 rounded-md" >{{current}}</button>
            <Calendar v-if="showCalendar"></Calendar>
        </div>
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
