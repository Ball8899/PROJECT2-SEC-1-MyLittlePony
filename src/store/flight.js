import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useFlight = defineStore("myFlight", () => {
    const flights = ref([]);
    
    const getFlights = () => {
        return flights.value;
    }

    const setFlights = (flight) => {
        flights.value = flight;
    }

    return {
        flights,
        getFlights,
        setFlights
    };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFlight, import.meta.hot));
}