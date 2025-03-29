import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useBooking = defineStore("myBooking", () => {
  const flightsBookings = ref([]);

  const getBooking = (flight, bookingData) => {
    flightsBookings.value.push({
      ...bookingData,
      flight: flight,
    });
  };

  return {
    flightsBookings,
    getBooking,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBooking, import.meta.hot));
}
