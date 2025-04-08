<script setup>
import { ref, onMounted, computed } from "vue";
import ListModel from "../ListModel.vue";
import { getAirlineLogo } from "../../utils/toolUtil.js";
import { getItems } from "@/utils/fetchUtil";

const flightFound = ref([]);
const expandedFlights = ref(new Set());
const visibleCount = ref(6); 

const toggleFlight = (id) => {
  if (expandedFlights.value.has(id)) {
    expandedFlights.value.delete(id);
  } else {
    expandedFlights.value.add(id);
  }
};

const showMore = () => {
  visibleCount.value += 6;
};

const showLess = () => {
  visibleCount.value = 6;
};

const visibleFlights = computed(() => {
  return flightFound.value.slice(0, visibleCount.value);
});

onMounted(async () => {
  try {
    const flights = await getItems(`${import.meta.env.VITE_APP_URL}/flights`);
    flightFound.value = flights; 
  } catch (error) {
    console.error("Error fetching flights:", error);
  }
});
</script>

<template>
  <div class="bg-gray-200/30">
    <h1 class="text-3xl font-medium mb-5 text-gray-700">Fly With Our Partner Airlines</h1>
    <ListModel :items="visibleFlights.filter(flight => flight.available === 'true')" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
      <template #listItems="{Item: flight}">
        <div class="bg-white p-4 rounded-lg hover:shadow-sm hover:shadow-gray-300 transition-shadow duration-300">
          <div class="flex justify-between items-start mb-3">
            <div class="flex items-center gap-2">
              <img
                :src="getAirlineLogo(flight.flightDetails.airline)"
                alt="Airline Logo"
                class="rounded-full h-8 w-8 object-contain"
              />
              <span class="text-xs font-light">
                {{ flight.flightDetails.airline }}
              </span>
            </div>
            <button
              @click="toggleFlight(flight.id)"
              class="text-blue-600 font-light text-sm"
            >
              {{ expandedFlights.has(flight.id) ? 'Hide' : 'More >' }}
            </button>
          </div>

          <div class="space-y-1">
            <div class="font-medium text-base text-gray-800">
              {{ flight.departure.airport.city }} ↔ {{ flight.arrival.airport.city }}
            </div>
            <div class="text-sm text-gray-500">
              {{ flight.departure.date }} - {{ flight.arrival.date}}
            </div>
            <div class="text-sm text-gray-500">
              {{ flight.flightDetails.class }}
            </div>
          </div>

          <div class="flex justify-end items-center mt-2">
            <span class="text-sm font-light text-gray-700 mr-1">From ฿</span>
            <span class="text-xl font-semibold text-gray-700">
              {{ flight.pricing.basePrice }}
            </span>
          </div>

          <transition name="fade-slide">
            <div
              v-show="expandedFlights.has(flight.id)"
              class="bg-gray-50 p-3 rounded-lg mt-3 border border-gray-200"
            >
              <h3 class="font-semibold text-gray-800 text-sm mb-1">Flight Details</h3>
              <p class="text-xs text-gray-600">Airline: {{ flight.flightDetails.airline }}</p>
              <p class="text-xs text-gray-600">Type: {{ flight.flightDetails.type }}</p>
              <p class="text-xs text-gray-600">Class: {{ flight.flightDetails.class }}</p>
            </div>
          </transition>
        </div>
      </template>
    </ListModel>

    <div class="flex justify-center mt-6 gap-4">
      <button 
        v-if="visibleCount < flightFound.length" 
        @click="showMore"
        class="px-4 py- text-blue-700 rounded-m font-semibold transition-colors"
      >
        Show More 
      </button>
      <button 
        v-if="visibleCount > 6" 
        @click="showLess"
        class="px-4 py- text-gray-700 rounded-m font-semibold transition-colors"
      >
        Show Less
      </button>
    </div>
  </div>
</template>

<style scoped>
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>