<script setup>
import { ref, computed } from 'vue';
import { useFlight } from '../../store/flight.js';
import ListModel from '../listModel.vue';

const flightStore = useFlight();
const { setFlights, getFlights } = flightStore;

const searchQuery = ref('');
const filterType = ref('All'); 
const sortField = ref('departure.date');
const sortOrder = ref('asc');

const filteredFlights = computed(() => {
  let flights = [...getFlights()];

  if (searchQuery.value) {
    flights = flights.filter(flight => 
      flight.flightDetails.airline.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      flight.flightDetails.flightNumber.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      flight.departure.airport.code.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      flight.arrival.airport.code.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  if (filterType.value !== 'All') {
    flights = flights.filter(flight => flight.flightDetails.type === filterType.value);
  }

  flights.sort((a, b) => {
    const field = sortField.value.split('.');
    let valueA = field.reduce((obj, key) => obj[key], a);
    let valueB = field.reduce((obj, key) => obj[key], b);

    if (sortField.value === 'pricing.basePrice') {
      valueA = Number(valueA);
      valueB = Number(valueB);
    }

    if (sortOrder.value === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });

  return flights;
});

const editFlight = (flight) => {
  console.log('Edit flight:', flight.id);
};

const deleteFlight = (id) => {
  console.log('Delete flight:', id);
};

const toggleSort = (field) => {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortField.value = field;
    sortOrder.value = 'asc';
  }
};
</script>

<template>
  <div class="w-full px-4 md:px-20">
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Flight Tickets</h1>
      <p class="text-sm text-gray-500">Manage your available flight tickets</p>
    </div>

    <div class="mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div class="w-full md:w-1/3">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search by airline, flight number, or airport..." 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div class="w-full md:w-1/4">
        <select 
          v-model="filterType" 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="All">All Types</option>
          <option value="One Way">One Way</option>
          <option value="Round Trip">Round Trip</option>
        </select>
      </div>
      
      <div class="w-full md:w-1/4">
        <select 
          v-model="sortField" 
          @change="sortOrder = 'asc'" 
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="departure.date">Sort by Date</option>
          <option value="pricing.basePrice">Sort by Price</option>
          <option value="flightDetails.airline">Sort by Airline</option>
        </select>
      </div>

      <!-- Sort Order Toggle -->
      <button 
        @click="toggleSort(sortField)" 
        class="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center gap-2"
      >
        <span>{{ sortOrder === 'asc' ? 'Ascending' : 'Descending' }}</span>
        <svg v-if="sortOrder === 'asc'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>

    <!-- Desktop Table View -->
    <div class="hidden md:block overflow-x-auto bg-white shadow rounded-lg">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flight</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="flight in filteredFlights" :key="flight.id" class="hover:bg-gray-50">
            <td class="px-6 py-4">
              <div>
                <div class="text-sm font-medium text-gray-900">{{ flight.flightDetails.airline }}</div>
                <div class="text-sm text-gray-500">{{ flight.flightDetails.flightNumber }}</div>
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-900">
                {{ flight.departure.airport.code }} → {{ flight.arrival.airport.code }}
              </div>
              <div class="text-sm text-gray-500" v-if="flight.flightDetails.type === 'Round Trip'">
                {{ flight.returnDeparture?.airport.code }} → {{ flight.returnArrival?.airport.code }}
              </div>
            </td>
            <td class="px-6 py-4">
              <div class="text-sm text-gray-900">{{ flight.departure.date }}</div>
              <div class="text-sm text-gray-500">{{ flight.departure.time }} - {{ flight.arrival.time }}</div>
            </td>
            <td class="px-6 py-4">
              <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                :class="flight.flightDetails.type === 'Round Trip' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'">
                {{ flight.flightDetails.type }}
              </span>
            </td>
            <td class="px-6 py-4 text-sm text-gray-900">
              {{ flight.pricing.basePrice.toLocaleString() }} {{ flight.pricing.currency }}
            </td>
            <td class="px-6 py-4 text-center">
              <div class="flex justify-center space-x-3">
                <button @click="editFlight(flight)" class="text-indigo-600 hover:text-indigo-900">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button @click="deleteFlight(flight.id)" class="text-red-600 hover:text-red-900">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile Card View -->
    <div class="md:hidden space-y-4">
      <div v-for="flight in filteredFlights" :key="flight.id" class="bg-white rounded-lg shadow p-4">
        <div class="flex justify-between items-start mb-2">
          <div>
            <div class="text-lg font-medium text-gray-900">{{ flight.flightDetails.airline }}</div>
            <div class="text-sm text-gray-500">{{ flight.flightDetails.flightNumber }}</div>
          </div>
          <span class="px-2 py-1 text-xs font-semibold rounded-full"
            :class="flight.flightDetails.type === 'Round Trip' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'">
            {{ flight.flightDetails.type }}
          </span>
        </div>

        <div class="mb-3">
          <div class="flex justify-between items-center mb-1">
            <div class="text-sm font-medium">{{ flight.departure.airport.code }}</div>
            <div class="flex-1 border-t border-dashed border-gray-300 mx-2"></div>
            <div class="text-sm font-medium">{{ flight.arrival.airport.code }}</div>
          </div>
          <div class="flex justify-between text-xs text-gray-500">
            <div>{{ flight.departure.time }}</div>
            <div>{{ flight.flightDetails.duration }}</div>
            <div>{{ flight.arrival.time }}</div>
          </div>
        </div>

        <div v-if="flight.flightDetails.type === 'Round Trip'" class="mb-3">
          <div class="flex justify-between items-center mb-1">
            <div class="text-sm font-medium">{{ flight.returnDeparture?.airport.code }}</div>
            <div class="flex-1 border-t border-dashed border-gray-300 mx-2"></div>
            <div class="text-sm font-medium">{{ flight.returnArrival?.airport.code }}</div>
          </div>
        </div>

        <div class="flex justify-between items-center mb-3">
          <div class="text-sm">
            <span class="font-medium">Date:</span> {{ flight.departure.date }}
          </div>
          <div class="text-sm font-medium text-gray-900">
            {{ flight.pricing.basePrice.toLocaleString() }} {{ flight.pricing.currency }}
          </div>
        </div>

        <div class="flex justify-end space-x-2 pt-2 border-t border-gray-100">
          <button @click="editFlight(flight)" class="p-2 text-indigo-600 hover:text-indigo-900 rounded-full hover:bg-indigo-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button @click="deleteFlight(flight.id)" class="p-2 text-red-600 hover:text-red-900 rounded-full hover:bg-red-50">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
}

th {
  font-weight: 500;
  text-align: left;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
}

td {
  vertical-align: middle;
  padding: 16px;
  border-bottom: 1px solid #e5e7eb;
}

tr:hover {
  background-color: #f9fafb;
}
</style>