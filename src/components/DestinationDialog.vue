<script setup>
import { ref, watch, defineProps } from 'vue'

const destination = ref({})
const selected = ref(localStorage.getItem('selected') || '')

async function fetchContents() {
  try {
    const response = await fetch('http://localhost:9090/api/continents/')
    if (!response.ok) {
      console.error(response.body)
    }

    const data = await response.json()
     destination.value = data;
  } catch (error) {
    console.error(error)
  }
}

fetchContents()

// fetch('http://localhost:8080/api/continents/')
//     .then(response => {
//         if (!response.ok) {
//             console.error(response.body)
//         }
//         return response.json()
//     })
//     .then(data => {
//         destination.value = data
//         console.log(data)
//     })
//     .catch(error => {
//         console.error('There was a problem with the fetch operation:', error)
//     })

watch(selected, (newDestination) => {
    localStorage.setItem('selected', newDestination)
})
</script>

<template>
  <div @click.stop class="bg-white max-h-[700px] text-gray-500 w-[40%] overflow-auto">
    <div class="text-lg p-5 mt-2 bg-gray-300 w-fit ml-10"> {{ selected }}</div>
    <div class="text-lg p-5 mb-1.5" v-for="(continent, index) in destination" :key="continent.id">
      {{ continent.continentName }}

      <div class="grid grid-cols-3 gap-2">
        <button 
          v-for="(country, index) in continent.countries" 
           @click="selected = country.countryName"
          :key="country.id" 
          class="text-black text-lg font-normal m-1 p-2 hover:bg-gray-200 rounded-sm transition"
        >
          {{ country.countryName }}
        </button>
      </div>
    </div>
  </div>
</template>
