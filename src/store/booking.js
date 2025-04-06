import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";

export const useBooking = defineStore("myBooking", () => {
  const flightsBookings = ref([]);
  const hotelBookings = ref([])

  const getBooking = (flight, bookingData) => {
    flightsBookings.value.push({
      ...bookingData,
      flight: flight,
    });
  };

  const getHotel = (id,hotel) =>{
    hotelBookings.value.push({
      id : id,
      hotel
    })

  }
  

  return {
    flightsBookings,
    getBooking,
    hotelBookings,
    getHotel,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useBooking, import.meta.hot));
}
