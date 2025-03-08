<script setup>
import { ref } from 'vue'
const destination = ref({})
fetch('http://localhost:5173/api/continents/')
    .then(response => {
        if (!response.ok) {
            console.error(response.body)
        }
        return response.json()
    })
    .then(data => {
        destination.value = data
        console.log(data)
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error)
    })
</script>

<template>
  <div class="bg-white max-h-[700px] text-gray-500 w-[90%] overflow-auto">
    <div class="text-lg p-5 mb-1.5" v-for="(continent, index) in destination" :key="continent.id">
      {{ continent.continentName }}

      <div class="grid grid-cols-3 gap-2">
        <div v-for="(country, index) in continent.countries" :key="country.id" class="text-black text-lg font-normal m-1 p-2">
          {{ country.countryName }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

@media (min-width: 1024px) {
}
</style>
