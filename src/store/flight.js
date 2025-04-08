import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useFlight = defineStore("myFlight", () => {
  const flights = ref([]);

  const getFlights = () => {
    return flights.value;
  };

  const setFlights = (flight) => {
    flights.value = flight;
  };

  const setStatus = (id) => {
    const flightIndex = flights.value.findIndex((flight) => flight.id === id);

    if (flightIndex !== -1) {
      const flight = flights.value[flightIndex];
      flight.available = flight.available === "true" ? "false" : "true";
    }
  };

  return {
    flights,
    getFlights,
    setFlights,
    setStatus,
  };
}, {
  persist: true, 
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFlight, import.meta.hot));
}